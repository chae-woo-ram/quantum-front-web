'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user/atom';
import supabase from '@/app/utils/supabase/client';
import { css } from '@mui/material';
import loadingJson from 'public/json/loading.json';
import { styled } from 'styled-components';

interface AuthCheckProps {
  children: ReactNode;
}

const AuthCheck = ({ children }: AuthCheckProps) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState); // Recoil 상태 사용
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        // router.push('/login');
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <Container>
        <StyleLottie loop animationData={loadingJson} play />
      </Container>
    );
  }

  return <>{children}</>;
};

export default AuthCheck;

const StyleLottie = styled(Lottie)`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 100px;
      height: 100px;
    `;
  }}
`;

const Container = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
  }}
`;
