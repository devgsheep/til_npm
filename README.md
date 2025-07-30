# Ant Design

- UI 라이브러리
- 각각의 컴포넌트 학습량이 필요합니다.
- https://ant.design/components/overview

## 1. 설치

```bash
npm install antd --save
```

## 2. 폴더 및 구조

- /src/components/form 폴더생성
  - JoinForm.jsx 생성

```jsx
import { Button, Form, Input } from "antd";
function JoinForm() {
  // jsx 자리
  // 1. 초기값
  const initialValue = {
    userId: "hong",
    userPass: "1234",
    nickName: "길동",
    email: "a@a.net",
  };
  // 2. 라벨넣기

  // 3. placeholder 넣기
  // 4. 필수값 표현하기
  // 5. 필수값 안내 메시지 표시히가
  // 6. 각 필드의 입력중인 값 알아내기
  const onFiledsChange = (field, allfiedls) => {
    console.log(field[0].value);
    // console.log(allfiedls);
  };
  // 7. 확인 버튼 클릭시 최종 입력값
  const onFinish = values => {
    console.log(values);
  };
  // jsx 자리
  return (
    <div>
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValue}
        onFieldsChange={(field, allfiedls) => onFiledsChange(field, allfiedls)}
        onFinish={values => onFinish(values)}
      >
        {/* required : 필수값 rules : 필수값의 형태 지정 */}
        <Form.Item
          label="아이디"
          name={"userId"}
          required={true}
          rules={[
            { required: true, message: "아이디는 필수항목 입니다." },
            { min: 4, message: "아이디는 4자 이상 입력해 주세요." },
            { mex: 8, message: "아이디는 최대 8자 입니다." },
          ]}
        >
          <Input placeholder="아이디를 입력하세요." />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name={"userPass"}
          required={true}
          rules={[
            { required: true, message: "비밀번호는 필수항목 입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자 이상이며, 대소문자, 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요." />
        </Form.Item>
        <Form.Item label="닉네임" name={"nickName"}>
          <Input placeholder="닉네임을 입력하세요." />
        </Form.Item>
        <Form.Item
          label="이메일"
          name={"email"}
          required={true}
          rules={[
            { required: true, message: "이메일은 필수항목 입니다." },
            { type: "email", message: "이메일 형식에 맞지 않습니다." },
          ]}
        >
          <Input placeholder="이메일을 입력하세요." />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default JoinForm;
```

- /src/pages/JoinPage.jsx

```jsx
import JoinForm from "../components/form/JoinForm";

function JoinPage() {
  const formWrap = {
    margin: "0 auto",
    width: "80%",
    background: "#fefefe",
  };
  return (
    <div style={formWrap}>
      <h1>회원가입</h1>
      <div>
        <JoinForm />
      </div>
    </div>
  );
}

export default JoinPage;
```

## 3. 비밀번호 비교 예제

- /src/components/PwForm.jsx 생성

```jsx
import { Button, Form, Input } from "antd";
import { useState } from "react";

function PwForm() {
  // js 자리
  // 1. 비밀번호 같은지 다른지 상태저장
  const [match, setMatch] = useState(false);
  // 2. Ant Design 에서 Form 요소를 저장해 두고 참조하기
  const [form] = Form.useForm();
  // 3. 비밀번호가 바뀔 때마다 체크함.
  const handleChangePassword = () => {
    // name이 password인 필드의 값, 즉 value 읽기
    const pw = form.getFieldValue("password");
    // name이 passwordConfirm인 필드의 값, 즉 value 읽기
    const pwConfirm = form.getFieldValue("passwordConfirm");
    if (pwConfirm) {
      setMatch(pw === pwConfirm);
    }
  };
  const onFinish = values => {
    console.log(values);
  };
  // jsx 자리
  return (
    <div>
      <h2>비밀번호 검증 예제</h2>
      <div>
        <Form
          form={form}
          name={"password-form"}
          style={{ width: 600, margin: "0 auto" }}
          onFinish={values => onFinish(values)}
        >
          <Form.Item
            name={"password"}
            label="비밀번호"
            required={true}
            rules={[
              { required: true, message: "비밀번호는 필수항목입니다." },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=+[\]{};:'",.<>/?\\|`~])[A-Za-z\d!@#$%^&*()\-=+[\]{};:'",.<>/?\\|`~]{8,}$/,
                message: "비밀번호 형식에 맞지 않습니다.",
              },
            ]}
          >
            <Input.Password
              placeholder="비밀번호를 입력하시오."
              onChange={handleChangePassword}
            />
          </Form.Item>
          <Form.Item
            name={"passwordConfirm"}
            label="비밀번호확인"
            required={true}
          >
            <Input.Password
              placeholder="비밀번호를 확인하시오."
              onChange={handleChangePassword}
            />
          </Form.Item>
          {/* 비밀번호 비교한 결과 출력 */}
          {!match && <div style={{ color: "red" }}>비밀번호가 다릅니다.</div>}
          <Form.Item>
            <Button htmlType="submit" disabled={!match}>
              확인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default PwForm;
```
