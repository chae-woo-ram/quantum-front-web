// src/app/components/Header.tsx
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/home">gnb1</Link>
          </li>
          <li>
            <Link href="/about">gnb2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
