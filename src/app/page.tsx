'use client';

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

const Banner = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <BannerWrapper style={{ scale }}>
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
    </BannerWrapper>
  );
};

export default function Home() {
  return (
    <Container>
      <Banner />
      <div style={{ height: '200vh' }}></div>
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
  padding: 120px 0 50px;
  margin: 0 auto;
`;

const FrameImage = styled.img`
  width: 100%;
  height: auto;
`;

const BannerWrapper = styled(motion.div)`
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
