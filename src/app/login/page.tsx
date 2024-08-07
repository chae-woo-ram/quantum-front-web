'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user/atom';
import LoginForm from '@/components/login/loginForm';
import { Button, Divider, Typography } from '@mui/material';
import { Provider } from '@supabase/supabase-js';
import styled from 'styled-components';
import supabase from '../utils/supabase/client';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useRecoilState(userState);

  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        setMessage(`User fetch error: ${userError.message}`);
      }
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: provider as Provider });
    if (error) {
      setMessage(`OAuth error: ${error.message}`);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; // 비디오의 실행 속도를 0.5로 설정
    }
  }, []);

  return (
    <Container>
      <BackgroundVideo autoPlay loop muted ref={videoRef} poster="/images/bg_poster.png">
        <source src="/video/login-background-video.mp4" type="video/mp4" />
      </BackgroundVideo>
      <Content>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          message={message}
        />
        <Button variant={'text'} color="secondary" href="/sign-up">
          회원가입
        </Button>
        <Divider>
          <Typography variant="h6"></Typography>
        </Divider>
        <ButtonGroup>
          <SocialLoginButton
            backgroundColor="#ffffff"
            boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
            onClick={() => handleOAuthSignIn('google')}
          >
            <Image src={'/images/google-icon.png'} width={28} height={28} alt="google icon" />
            구글로 로그인
          </SocialLoginButton>
          <SocialLoginButton
            backgroundColor="#eed220"
            boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
            onClick={() => handleOAuthSignIn('kakao')}
          >
            <Image src={'/images/kakao-icon.png'} width={21} height={22} alt="kakao icon" />
            카카오톡 로그인
          </SocialLoginButton>
        </ButtonGroup>
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: rgba(48, 48, 48, 0.4);
  padding: 50px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  padding: 1rem;
`;

const SocialLoginButton = styled.button<{ backgroundColor: string; boxShadow: string }>`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  letter-spacing: -1px;
  font-size: 14px;
  border-radius: 12px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow: ${({ boxShadow }) => boxShadow}; /* 자연스러운 그림자 설정 */
  border: none; /* 기본 테두리 제거 */
  transition:
    background-color 0.3s,
    box-shadow 0.3s; /* 전환 효과 추가 */

  &:hover {
    background-color: ${({ backgroundColor }) => (backgroundColor === '#ffffff' ? '#f5f5f5' : '#e3c711')};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 강조 */
  }
`;
