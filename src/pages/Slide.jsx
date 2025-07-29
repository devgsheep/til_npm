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
