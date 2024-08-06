'use client';

import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import styled from 'styled-components';

export const Banner3 = () => {
  const router = useRouter();

  return (
    <>
      <Banner3Container>
        <Title>
          <p>
            GALLERY MARKETPLACE: <span>실시간 채팅으로 예술 거래를 새롭게</span>
          </p>
          <p>"예술 작품을 사고파는 새로운 방식을 경험해보세요."</p>
          <p>
            우리 플랫폼은 아티스트와 직접 연결되어 실시간 채팅을 통해 원활한 소통과 거래를 가능하게 합니다.
            <br />전 세계의 독창적인 작품을 발견하고, 창작자들과 의미 있는 관계를 구축해보세요.
          </p>
        </Title>

        <VideoWrapper>
          <Video autoPlay loop muted>
            <source src="/video/chatVideo.mp4" type="video/mp4" />
          </Video>
        </VideoWrapper>

        <ChatButtonWrapper>
          <ChatButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => router.push(`/Chats`)}
            startIcon={<ArrowForwardIcon />}
          >
            Chat 시작하기
          </ChatButton>
        </ChatButtonWrapper>
      </Banner3Container>
    </>
  );
};

const Banner3Container = styled.div`
  padding: 80px 10%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #2a2a2a;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  text-align: center;
  max-width: 800px;
  margin-bottom: 40px;

  p:first-child {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;

    > span {
      font-weight: normal;
      font-size: 20px;
    }
  }

  p:nth-child(2) {
    font-size: 30px;
    font-weight: bold;
    position: relative;
    padding: 10px 20px;
    border-radius: 8px;
    color: transparent;

    background: linear-gradient(135deg, #c3cfe2, #c7d7f0, #e0aaff, #b09adb, #cfc4e0);
    background-clip: text;
    -webkit-background-clip: text;

    border: 2px solid transparent;
    background-size: 300% 300%;
    animation: gradientAnimation 7s ease infinite;
  }

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

const VideoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Video = styled.video`
  width: 80%;
  max-width: 800px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ChatButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const ChatButton = styled(Button)`
  && {
    color: #2a2a2a;
    font-weight: bold;
    padding: 4px 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #b5c6e1;
    }
  }
`;
