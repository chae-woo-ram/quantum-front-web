'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const BannerWrapper = styled(motion.div)`
  position: sticky;
  top: 110px;
`;

const CardList = styled.ul`
  position: absolute;
  top: 10%;
  right: 6%;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  width: 80%;
  padding: 0px 20px;
`;

const CardItem = styled(motion.li)`
  /* position: absolute; */
  will-change: transform; /* 성능 최적화 */
  width: calc(33.33% - 20px);
  box-shadow: rgba(33, 38, 49, 0.12) 0px 4px 16px 0px;
  &:nth-child(4) {
    width: calc(66.66% - 15px);
  }
  &:nth-child(5) {
    width: calc(33.33% - 15px);
  }
`;

const cards = [
  {
    id: 1,
    img: 'https://www.widearth.world/image/feature/img_feature_banner_card_01.png',
    initial: { x: '-106%', y: '-46%', rotate: -18 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
  {
    id: 2,
    img: 'https://www.widearth.world/image/feature/img_feature_banner_card_02.png',
    initial: { x: '8%', y: '-32%', rotate: -32 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
  {
    id: 3,
    img: 'https://www.widearth.world/image/feature/img_feature_banner_card_03.png',
    initial: { x: '70%', y: '-60%', rotate: 13 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
  {
    id: 4,
    img: 'https://www.widearth.world/image/feature/img_feature_banner_card_04.png',
    initial: { x: '-30%', y: '-11%', rotate: 13 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
  {
    id: 5,
    img: 'https://www.widearth.world/image/feature/img_feature_banner_card_05.png',
    initial: { x: '36%', y: '33%', rotate: -15 },
    final: { x: '0%', y: '0%', rotate: 0 },
  },
];

const Banner = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <BannerWrapper style={{ scale }}>
      <img src="https://www.widearth.world/image/feature/img_feature_banner_frame.png" alt="" />
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
      <img
        src="https://www.widearth.world/image/feature/img_feature_banner_cursor.png"
        alt=""
        className="feature_banner_cursor"
      />
    </BannerWrapper>
  );
};

export default async function Home() {
  return (
    <div>
      <Banner />
      {/* 스크롤을 테스트하기 위한 임의의 콘텐츠 */}
      <div style={{ height: '200vh' }}></div>
    </div>
  );
}
