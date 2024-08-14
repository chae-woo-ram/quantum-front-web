'use client';

import React, { useRef, useState } from 'react';
import SignUpForm from '@/components/signUp/signUpForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { styled } from 'styled-components';
import supabase from '../utils/supabase/client';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다 ');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Container>
      <BackgroundVideo autoPlay loop muted ref={videoRef} poster="/images/bg_poster.png">
        <source src="/video/login-background-video.mp4" type="video/mp4" />
      </BackgroundVideo>
      <Content>
        <SignUpForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
          message={message}
        />
        <Button variant={'text'} color="secondary" href="/login" startIcon={<ArrowBackIcon />}>
          로그인으로 돌아가기
        </Button>
      </Content>
    </Container>
  );
};

export default SignUp;

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
