import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import AuthCheck from '@/components/authCheck';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import RecoilRootWrapper from '@/components/recoilRootWrapper/RecoilRootWrapper';
import ReactQueryProviders from '@/hooks/useReactQuery';
import Providers from '@/lib/Provider';
import theme from '@/styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '채우람 갤러리',
  description: 'Gallery Service',
};

const notoSansKr = Noto_Sans_KR({
  weight: ['400'],
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={notoSansKr.className}>
          <ReactQueryProviders>
            <RecoilRootWrapper>
              <Providers>
                <AuthCheck>
                  <div className={styles.container}>
                    <Header />
                    <main className={styles.main}>{children}</main>
                    <Footer />
                  </div>
                </AuthCheck>
              </Providers>
            </RecoilRootWrapper>
          </ReactQueryProviders>
        </body>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
