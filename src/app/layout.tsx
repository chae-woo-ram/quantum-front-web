import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import Providers from '@/lib/Provider';
import theme from '@/styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Water Melon',
  description: 'Water Melon Service',
  icons: {
    icon: '/favicon.png',
  },
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
          <Providers>
            <div className={styles.container}>
              <Header />
              <main className={styles.main}>{children}</main>
              <Footer />
            </div>
          </Providers>
        </body>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
