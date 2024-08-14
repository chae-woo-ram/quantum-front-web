'use client';

import { useRouter } from 'next/navigation';
import { AnimatedText } from '@/components/animatedText/animatedText';
import BookCard from '@/components/bookCard/BookCard';
import { useAnimationInView } from '@/hooks/useAnimationInView';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Banner4 = () => {
  const router = useRouter();
  const { ref: textRef, getAnimationProps } = useAnimationInView();

  const bookData = [
    { id: 1, img1: '/images/book1.png', img2: '/images/book_open1.png', name: 'Ricky Kim', year: '2024' },
    {
      id: 2,
      img1: '/images/book2.png',
      img2: '/images/book_open2.png',
      name: 'The Post Dansaekhwa Of Korea',
      year: '2018',
    },
    { id: 3, img1: '/images/book3.png', img2: '/images/book_open3.png', name: 'Chaerin Park', year: '2021' },
    {
      id: 4,
      img1: '/images/book4.png',
      img2: '/images/book_open4.png',
      name: 'Olivia Williams',
      year: '2022',
    },
    { id: 5, img1: '/images/book5.png', img2: '/images/book_open5.png', name: 'Seoyeon Lee', year: '2022' },
    { id: 6, img1: '/images/book6.png', img2: '/images/book_open6.png', name: 'Yoonsu Jeong', year: '2021' },
  ];

  return (
    <Banner4Container>
      <AnimatedText ref={textRef} getAnimationProps={getAnimationProps}>
        <AnimatedTitle>GALLERY BOOK</AnimatedTitle>
        <AnimatedSubtitle>
          "최고의 작품과 예술가들의 이야기를 담은 <br />
          갤러리 북을 만나보세요."
        </AnimatedSubtitle>
        <AnimatedDescription>
          GALLERY BOOK은 우리의 전시회와 컬렉션을 집에서도 편안하게 즐길 수 있는 기회를 제공합니다.
          <br />
          아름다운 일러스트와 깊이 있는 해설로 예술의 매력을 한층 더 느껴보세요.
        </AnimatedDescription>
      </AnimatedText>

      <ContentWrapper>
        <Slide>
          {bookData.concat(bookData).map((item, index) => (
            <SlideItem key={index}>
              <BookCard img1={item.img1} img2={item.img2} name={item.name} year={item.year} />
            </SlideItem>
          ))}
        </Slide>
      </ContentWrapper>

      <BookButtonWrapper>
        <BookButton
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => router.push(`/Chats`)}
          startIcon={<ArrowForwardIcon />}
        >
          Book 둘러보기
        </BookButton>
      </BookButtonWrapper>
    </Banner4Container>
  );
};

const Banner4Container = styled.div`
  /* background: url('/images/bannerBg2.png') center/cover no-repeat; */
  padding: 80px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.5;
  color: #2a2a2a;
`;

const AnimatedTitle = styled(motion.h1)`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  max-width: 800px;
  margin-bottom: 20px;
`;

const AnimatedSubtitle = styled(motion.p)`
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  position: relative;
  color: transparent;
  background: linear-gradient(135deg, #f9d423, #e0aaff, #b09adb, #9c89b8, #cfc4e0);
  background-clip: text;
  -webkit-background-clip: text;
  border: 2px solid transparent;
  background-size: 300% 300%;
  animation: gradientAnimation 7s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

const AnimatedDescription = styled(motion.p)`
  font-size: 18px;
  margin-bottom: 40px;
`;

const ContentWrapper = styled.div`
  width: 100vw;
  overflow: hidden;
`;

const Slide = styled.ul`
  height: 100%;
  width: 4200px; // 이미지 + 여백 너비 (350 * 12)
  display: flex;
  flex-wrap: nowrap;
  gap: 50px;
  animation: autoPlay 10s linear infinite;

  @keyframes autoPlay {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const SlideItem = styled.li`
  width: 300px;
`;

const BookButtonWrapper = styled.div`
  margin-top: 50px;
`;

const BookButton = styled(Button)`
  && {
    color: #2a2a2a;
    font-weight: bold;
    padding: 4px 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      background: linear-gradient(135deg, #59cff0 0%, #6aa6ee 25%, #00d2a3 50%, #b9fbc0 75%, #f9f47c 100%);
    }
  }
`;

export default Banner4;
