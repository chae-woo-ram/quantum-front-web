'use client';

import { Banner1 } from '@/components/banner/Banner1';
import { Banner2 } from '@/components/banner/Banner2';
import { Banner3 } from '@/components/banner/Banner3';
import { Banner4 } from '@/components/banner/Banner4';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <Container>
        <Banner1></Banner1>
        <div style={{ height: '10vh' }}></div>

        <Banner2></Banner2>
        <Banner3></Banner3>
        <Banner4></Banner4>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
`;
