import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CoverflowSwiperProps {
  data: { id: number; img: string }[];
}

const CoverflowSwiper = ({ data }: CoverflowSwiperProps) => {
  return (
    <SwiperContainer
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      loop={true}
      autoplay={{
        delay: 1500,
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination, Autoplay]}
    >
      {data.map((item) => (
        <SwiperSlideWrapper key={item.id} style={{ backgroundImage: `url(${item.img})` }}></SwiperSlideWrapper>
      ))}
    </SwiperContainer>
  );
};

export default CoverflowSwiper;

const SwiperContainer = styled(Swiper)`
  width: 100vw;
  padding: 120px 0px;
  margin-bottom: 50px;

  & .swiper-pagination {
    .swiper-pagination-bullet-active {
      background-color: ${(props) => props.theme.palette.secondary.main};
    }
  }
  & .swiper-slide-active {
    transform: scale(1.4) !important; /* 활성화된 슬라이드 두 배 크기로 설정 */
    transition: transform 0.3s ease; /* 변환 애니메이션 추가 */
  }
`;

const SwiperSlideWrapper = styled(SwiperSlide)`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  height: 300px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-size: cover; /* 배경 이미지 크기 조절 */
  background-position: center; /* 배경 이미지 위치 조정 */
`;
