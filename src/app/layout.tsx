import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import Providers from '@/lib/Provider';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={notoSansKr.className}>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
