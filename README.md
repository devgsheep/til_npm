# swiper

- https://swiperjs.com/react
- https://swiperjs.com/demos

## 설치

```bash
npm i swiper
```

## 폴더 구성

- /src/pages/Slide.jsx 파일 생성

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 작업
import "swiper/css";
// 개별 작업
import "./slide.css";
function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        <Swiper className="sw-visual">
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```

- /src/pages/slide.css 파일 생성

```css
.visual-slide {
  width: 80%;
  margin: 0 auto;
  background-color: skyblue;
  min-height: 200px;
}

.sw-visual {
  width: 100%;
  height: 100%;
}
```

## 1. loop와 navigation 적용 예제

- 1단계 : css와 모듈을 확인함.

```jsx
// css와 모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
```

- 2단게 : modules 적용

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 작업
import "swiper/css";
// 개별 작업
import "./slide.css";

// css와 모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="sw-visual"
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```
