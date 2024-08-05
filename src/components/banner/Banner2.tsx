'use client';

import CustomCard from '@/components/customCard/CustomCard';
import styled from 'styled-components';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
import { Autoplay, EffectCube, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// 자동 재생 스타일 추가

export const Banner2 = () => {
  const srcList = 'https://cdn.pixabay.com/photo/2022/01/25/04/42/bird-6965228_1280.jpg '
    .repeat(10)
    .split(' ')
    .slice(0, 10)
    .map((url, index) => ({ url, key: index }));

  return (
    <>
      <Banner2Container>
        <Title>
          <p>EXHIBITION</p>
          <p>창의성과 아름다움이 가득한 우리의 최신 미술 전시회를 경험해 보세요.</p>
        </Title>

        <CarouselWrapper>
          <StyledSwiper
            modules={[EffectCube, Navigation, Autoplay]}
            effect="cube"
            autoplay={{ delay: 1000 }}
            navigation
            cubeEffect={{ shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94 }}
          >
            {srcList.map((slide) => (
              <SwiperSlide key={slide.key}>
                {' '}
                {/* 수정한 부분: SwiperSlide로 감싸기 */}
                <CustomCard url={slide.url} />
                <ExhibitionText>
                  디스크립션
                  <br />
                  디스크립션
                </ExhibitionText>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </CarouselWrapper>
      </Banner2Container>
    </>
  );
};

const Banner2Container = styled.div`
  background: url('/images/bannerBg1.png') center/cover no-repeat;
  padding: 80px 10%;
`;

const Title = styled.h1`
  color: #2a2a2a;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;

  p:first-child {
    font-size: 30px;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSwiper = styled(Swiper)`
  // 수정한 부분: Swiper 스타일링
  width: 40%;

  > div:last-child {
    margin-top: 20px;
  }
`;

const ExhibitionText = styled.div`
  color: #575252;
  margin: 20px 0;
  font-size: 14px;
  font-weight: bold;
  text-align: right;
`;
