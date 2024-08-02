import { GetServerSideProps } from 'next';
import supabase from './utils/supabase/client';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // 페이지에 전달할 추가 props가 없으면 빈 객체
  };
};

const ProtectedPage: React.FC = () => {
  return (
    <div>
      <h1>Protected Content</h1>
    </div>
  );
};

export default ProtectedPage;
