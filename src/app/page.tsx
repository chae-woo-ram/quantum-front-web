'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const BannerWrapper = styled(motion.div)`
  position: sticky;
  top: 100px;
  left: 10%;
  text-align: center;
  overflow: hidden;
`;

const CardList = styled.ul`
  position: absolute;
  top: 21%;
  left: 40%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const CardItem = styled(motion.li)`
  will-change: transform; /* 성능 최적화 */
  width: calc(40%);
  border: 15px solid rgba(109, 107, 111, 0.2); /* 그림자 효과처럼 보이게 하는 테두리 */

  img {
    width: 100%;
    height: 50%;
  }
`;

const cards = [
  {
    id: 1,
    img: '/images/picture1.png',
    initial: { x: '-30%', y: '-20%', rotate: -20 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
  {
    id: 2,
    img: '/images/picture2.png',
    initial: { x: '20%', y: '-10%', rotate: 20 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
  {
    id: 3,
    img: '/images/picture3.png',
    initial: { x: '-50%', y: '30%', rotate: -20 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
  {
    id: 4,
    img: '/images/picture4.png',
    initial: { x: '20%', y: '20%', rotate: 15 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
];

const Banner = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <BannerWrapper style={{ scale }}>
      <img src="/images/frame.png" alt="" />
      <CardList>
        {cards.map((card) => (
          <CardItem
            key={card.id}
            style={{
              x: useTransform(scrollYProgress, [0, 0.3], [card.initial.x, card.final.x]),
              y: useTransform(scrollYProgress, [0, 0.3], [card.initial.y, card.final.y]),
              rotate: useTransform(scrollYProgress, [0, 0.3], [card.initial.rotate, card.final.rotate]),
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
    <>
      <Banner />
      <div style={{ height: '200vh' }}></div>
    </>
  );
}
