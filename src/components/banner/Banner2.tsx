'use client';

// 클라이언트 사이드에서만 렌더링
import { useRouter } from 'next/navigation';
import CoverflowSwiper from '@/components/swiperComponent/CoverflowSwiper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import styled from 'styled-components';

export const Banner2 = () => {
  const router = useRouter();

  const exhibitionData = [
    { id: 1, img: '/images/exhibition1.jpg' },
    { id: 2, img: '/images/exhibition2.jpg' },
    { id: 3, img: '/images/exhibition3.jpg' },
    { id: 4, img: '/images/exhibition4.jpg' },
  ];

  return (
    <Banner2Container>
      <Title>
        <p>EXHIBITION</p>
        <p>창의성과 아름다움이 가득한 우리의 최신 미술 전시회를 경험해 보세요.</p>
      </Title>

      <CoverflowSwiper exhibitionData={exhibitionData} />
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
    font-size: 25px;
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
