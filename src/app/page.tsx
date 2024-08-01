'use client';

import Carousel from 'react-carousel-mui';
import Image from 'next/image';
import CustomCard from '@/components/customCard/CustomCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const cards = [
  {
    id: 1,
    img: '/images/picture1.png',
    initial: { x: '-60%', y: '-40%', rotate: -20, scale: 1.4 },
    final: { x: '0%', y: '0%', rotate: 0, scale: 1 },
  },
  {
    id: 2,
    img: '/images/picture2.png',
    initial: { x: '40%', y: '-20%', rotate: 20, scale: 1.4 },
    final: { x: '0%', y: '0%', rotate: 0, scale: 1 },
  },
  {
    id: 3,
    img: '/images/picture3.png',
    initial: { x: '-100%', y: '60%', rotate: -20, scale: 1.4 },
    final: { x: '0%', y: '0%', rotate: 0, scale: 1 },
  },
  {
    id: 4,
    img: '/images/picture4.png',
    initial: { x: '40%', y: '40%', rotate: 20, scale: 1.4 },
    final: { x: '0%', y: '0%', rotate: 0, scale: 1 },
  },
];

const Banner1 = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <>
      <BannerTitle>TODAY'S ARTWORK</BannerTitle>
      <Banner1Wrapper style={{ scale }}>
        <FrameImage src="/images/frame.png" alt="" />
        <CardList>
          {cards.map((card) => (
            <CardItem
              key={card.id}
              style={{
                x: useTransform(scrollYProgress, [0, 0.3], [card.initial.x, card.final.x]),
                y: useTransform(scrollYProgress, [0, 0.3], [card.initial.y, card.final.y]),
                rotate: useTransform(scrollYProgress, [0, 0.3], [card.initial.rotate, card.final.rotate]),
                scale: useTransform(scrollYProgress, [0, 0.3], [card.initial.scale, card.final.scale]),
              }}
            >
              <img src={card.img} alt="" />
            </CardItem>
          ))}
        </CardList>
      </Banner1Wrapper>
    </>
  );
};

const Banner2 = () => {
  const srcList = 'https://cdn.pixabay.com/photo/2022/01/25/04/42/bird-6965228_1280.jpg '
    .repeat(10)
    .split(' ')
    .slice(0, 10)
    .map((url, index) => ({ url, key: index }));

  return (
    <>
      <BannerTitle>TODAY'S EXHIBITION</BannerTitle>
      <StyledCarousel
        items={srcList}
        itemsPerPage={{
          xs: 2,
          sm: 2,
          tablet: 2,
          md: 3,
          lg: 3,
          xl: 3,
        }}
        itemRenderer={(slide) => <CustomCard key={slide.key} url={slide.url} />}
      />
    </>
  );
};

const Banner3 = () => {
  const srcList = 'https://cdn.pixabay.com/photo/2022/01/25/04/42/bird-6965228_1280.jpg '
    .repeat(10)
    .split(' ')
    .slice(0, 10)
    .map((url, index) => ({ url, key: index }));

  return (
    <>
      <BannerTitle>TODAY'S EXHIBITION</BannerTitle>
      <StyledCarousel
        items={srcList}
        itemsPerPage={{
          xs: 2,
          sm: 2,
          tablet: 2,
          md: 3,
          lg: 3,
          xl: 3,
        }}
        itemRenderer={(slide) => <CustomCard key={slide.key} url={slide.url} />}
      />
    </>
  );
};

export default function Home() {
  return (
    <>
      <Container>
        <BannerMainText>
          <Image src={'/images/logoText.png'} alt={'chaewooram text'} width={300} height={40} />
          채우람에서 예술과 함께하는 순간을 경험하세요
        </BannerMainText>

        <Banner1Container>
          <Banner1 />
          <div style={{ height: '10vh' }}></div>
        </Banner1Container>
      </Container>

      <Container>
        <Banner2Container>
          <Banner2 />
        </Banner2Container>
      </Container>

      <Container>
        <Banner3Container>
          <Banner3 />
        </Banner3Container>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Banner1Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Banner2Container = styled.div`
  background-color: #e8e8e8;
  padding: 100px 10%;
`;

const Banner3Container = styled.div`
  background-color: white;
  padding: 100px 10%;
`;

const BannerMainText = styled.h1`
  color: #2a2a2a;
  font-size: 30px;
  font-weight: bold;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const BannerTitle = styled.span`
  color: #2a2a2a;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const FrameImage = styled.img`
  width: 100%;
  height: auto;
`;

const Banner1Wrapper = styled(motion.div)`
  position: sticky;
  top: 100px;
`;

const CardList = styled.ul`
  position: absolute;
  top: 31.5%;
  left: 50.5%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 53%;
  height: 27.5%;
  transform: translate(-50%, -50%);
  list-style-type: none;
`;

const CardItem = styled(motion.li)`
  will-change: transform;
  width: calc(50% - 10px);
  height: 100%;
  border: 15px solid #e8e8e8;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

const StyledCarousel = styled(Carousel)`
  &.MuiPaper-root {
    border: 10px solid red;
    background: red !important;
    display: none;
  }
`;
