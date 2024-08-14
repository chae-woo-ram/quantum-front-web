'use client';

// 클라이언트 사이드에서만 렌더링
import { useRouter } from 'next/navigation';
import { AnimatedText } from '@/components/animatedText/animatedText';
import CoverflowSwiper from '@/components/swiperComponent/CoverflowSwiper';
import { useAnimationInView } from '@/hooks/useAnimationInView';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Banner2 = () => {
  const router = useRouter();
  const { ref: textRef, getAnimationProps } = useAnimationInView();

  const exhibitionData = [
    { id: 1, img: '/images/exhibition1.jpg' },
    { id: 2, img: '/images/exhibition2.jpg' },
    { id: 3, img: '/images/exhibition3.jpg' },
    { id: 4, img: '/images/exhibition4.jpg' },
  ];

  return (
    <Banner2Container>
      <AnimatedText ref={textRef} getAnimationProps={getAnimationProps}>
        <AnimatedTitle>EXHIBITION</AnimatedTitle>
        <AnimatedSubtitle>창의성과 아름다움이 가득한 우리의 최신 미술 전시회를 경험해 보세요.</AnimatedSubtitle>
      </AnimatedText>

      <CoverflowSwiper data={exhibitionData} />
      <ExhibitionButtonWrapper>
        <ExhibitionButton
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => router.push(`/exhibitions`)}
          startIcon={<ArrowForwardIcon />}
        >
          전시회 둘러보기
        </ExhibitionButton>
      </ExhibitionButtonWrapper>
    </Banner2Container>
  );
};

const Banner2Container = styled.div`
  /* background: url('/images/bannerBg1.png') center/cover no-repeat; */
  padding: 80px 0px;
  font-weight: bold;
  color: #2a2a2a;
`;

const AnimatedTitle = styled(motion.h1)`
  font-size: 22px;
  text-align: center;
`;

const AnimatedSubtitle = styled(motion.p)`
  text-align: center;
  margin-top: 20px;
  font-size: 30px;
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

const ExhibitionButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ExhibitionButton = styled(Button)`
  && {
    color: #2a2a2a;
    font-weight: bold;
    padding: 4px 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;
