'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user/atom';
import supabase from '@/app/utils/supabase/client';
import Loading from '../common/Loading';

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
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthCheck;
