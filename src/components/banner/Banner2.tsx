'use client';

import Carousel from 'react-material-ui-carousel';
import CustomCard from '@/components/customCard/CustomCard';
import styled from 'styled-components';

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
          <StyledCarousel interval={1000} navButtonsAlwaysVisible>
            {srcList.map((slide) => (
              <>
                <CustomCard key={slide.key} url={slide.url} />
                <ExhibitionText>
                  디스크립션
                  <br />
                  디스크립션
                </ExhibitionText>
              </>
            ))}
          </StyledCarousel>
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

const StyledCarousel = styled(Carousel)`
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
