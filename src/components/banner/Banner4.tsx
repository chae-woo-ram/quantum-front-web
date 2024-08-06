'use client';

import CustomCard from '@/components/customCard/CustomCard';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const Banner4 = () => {
  const exhibitionData = [
    { id: 1, img: '/images/exhibition1.jpg' },
    { id: 2, img: '/images/exhibition2.jpg' },
    { id: 3, img: '/images/exhibition3.jpg' },
    { id: 4, img: '/images/exhibition4.jpg' },
  ];

  return (
    <>
      <Banner4Container>
        <Title>
          <p>EXHIBITION</p>
          <p>창의성과 아름다움이 가득한 우리의 최신 미술 전시회를 경험해 보세요.</p>
        </Title>

        <ContentWrapper>
          <StyledSwiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            spaceBetween={50}
            slidesPerView={3}
            centeredSlides={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="mySwiper"
          >
            {exhibitionData.map((item) => (
              <SwiperSlide key={item.id}>
                <CustomCard url={item.img} />
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </ContentWrapper>
      </Banner4Container>
    </>
  );
};

const Banner4Container = styled.div`
  background: url('/images/bannerBg2.png') center/cover no-repeat;
  padding: 80px 10%;
`;

const Title = styled.h1`
  color: #2a2a2a;
  font-size: 22px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;

  p:first-child {
    font-size: 30px;
    font-weight: bold;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSwiper = styled(Swiper)`
  width: 40%;

  > div:last-child {
    margin-top: 20px;
  }
`;
