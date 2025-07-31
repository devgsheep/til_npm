# Kakao 로그인

- CRA로 리액트 프로젝트 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름
- Vite로 리액트 프로젝트 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름

## 1. 카카오 개발자 등록하기/로그인하기

- https://developers.kakao.com/
- https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 2. 새로운 애플리케이션 등록하기

- 상단의 주메뉴에서 `앱`을 클릭한다.
  <img width="1097" height="213" alt="Image" src="https://github.com/user-attachments/assets/d280ef5e-0dd7-4da8-8d81-fc00e11d43e3" />

- 내용 작성하기
  <img width="661" height="703" alt="Image" src="https://github.com/user-attachments/assets/093e5530-bd45-4fcd-8746-72ab2aa9ba7f" />
  <img width="1091" height="857" alt="Image" src="https://github.com/user-attachments/assets/6d3ff8c6-807e-4e87-a7da-12226f7071ed" />

- 목록 확인하기
  <img width="1097" height="530" alt="Image" src="https://github.com/user-attachments/assets/86821b05-582f-4e5b-886c-88529c01b730" />

- 비즈앱 등록하기
  <img width="1085" height="543" alt="Image" src="https://github.com/user-attachments/assets/32839971-a191-4965-bd57-366b69fb0e44" />
  <img width="1067" height="699" alt="Image" src="https://github.com/user-attachments/assets/41962db8-ae3d-4075-a4d7-0d72bde1853a" />
  <img width="1066" height="652" alt="Image" src="https://github.com/user-attachments/assets/6c0afaeb-addf-4978-8197-525f855dcdf0" />
  <img width="876" height="444" alt="Image" src="https://github.com/user-attachments/assets/f2cfc8ec-cd56-4881-b4e9-df5f250695c8" />
  <img width="590" height="289" alt="Image" src="https://github.com/user-attachments/assets/727034e1-e7d5-458c-908c-b0a74a2a872c" />

## 3. Rest API 키

- `외부노출 금지`
- / 폴더에 `.env` 파일 생성(Vite 와는 다름)
- `생성되는 파일 위치 절대 주의`
  <img width="298" height="268" alt="Image" src="https://github.com/user-attachments/assets/b949fdef-0f0d-4957-9c2c-a775eaa3e0f3" />

### 3.1. 접두어는 `REACT_APP`으로 `약속`됨

- 예) Next.js 에서는 `NEXT_APP_`으로 약속됨
- 예) Vite 프로젝트에서는 `VITE_`로 약속됨

```txt
REACT_APP_KKO_LOGIN_REST_API_KEY=e496ffd37dc9ed3089a9e82b4066e1ac
REACT_APP_KKO_LOGIN_JS_API_KEY=ca1d78c2e8637988288b2048eb7b1018
```

### 3.2 `.gitignore` 확인

- `.env` 내용으로 작성 확인
  <img width="903" height="493" alt="Image" src="https://github.com/user-attachments/assets/46fd07ac-6dff-4498-b672-21bf53d9dc17" />

## 4. 카카오 로그인 플랫폼 설정하기

<img width="1090" height="718" alt="Image" src="https://github.com/user-attachments/assets/b954b87e-627c-4d3b-b5dd-1dff879e57ab" />

### 4.1. 리다이렉트 URL 설정

- http://localhost:3000 : CRL 버전
- http://localhost:5173 : Vite 버전
- https://www.도메인.com : 개인 도메인
  <img width="527" height="395" alt="Image" src="https://github.com/user-attachments/assets/34a1797c-464a-4cb1-a044-09e359b436ac" />
  <img width="1072" height="224" alt="Image" src="https://github.com/user-attachments/assets/3d5e0f8c-6a8b-4999-95c4-e32c4e121050" />

## 5. 동의 항목 설정

<img width="1081" height="322" alt="Image" src="https://github.com/user-attachments/assets/f007a62a-0a3c-466d-ac2f-69ca169819d2" />
<img width="521" height="680" alt="Image" src="https://github.com/user-attachments/assets/931bd0c5-4a33-4a1a-83dd-e840a124c810" />

## 6. 카카오 로그인 구현

- /src/kko 폴더 생성
- /src/kko/kkoapi.js 생성

### 6.1. 1단계

```js
// git에 key값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";
// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2. 2단계 : Access Token 활용

- 정보 호출

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3. 전체 코드 (`추후 axios로 변경 권장`)

```js
// git에 key값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";
// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.4. 코드 반영

- /src/pages/LoginPage.jsx 생성
- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 파일 생성

#### 6.4.1. Router 셋팅

- /src/App.js

```js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./member/After";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route pass="/member/kko" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

- /src/pages/member/After.jsx

```js
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

## 7. Recoil 활용해 보기

- /src/atoms/kkoLoginAtom.js

```js
import { atom } from "recoil";

export const KKOLoginAtom = atom({
  key: "KKOLoginAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
```

## 8. 로그아웃 처리

```jsx
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";
import { useRecoilState } from "recoil";
import { KKOLoginAtom } from "../atoms/kkoLoginAtom";

function LoginPage() {
  const navigate = useNavigate();
  // Recoil State 로 전역 상태 활용하기
  const [userInfo, setUserInfo] = useRecoilState(KKOLoginAtom);
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  //   console.log(kkoLoginUrl);
  const logOut = () => {
    setUserInfo({
      id: "",
      nickname: "",
      email: "",
      thumbnail_image_url: "",
    });
    navigate("/");
  };
  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={logOut}>로그아웃</button>
      ) : (
        <Link to={kkoLoginUrl}>카카오로그인</Link>
      )}
    </div>
  );
}

export default LoginPage;
```

## 9. 로그인 없이 페이지 접근시 처리

- 강제로 navigate("/login")
- 조건문으로 안내메세지 및 버튼으로 이동권장
