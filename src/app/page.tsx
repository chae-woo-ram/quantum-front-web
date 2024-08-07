'use client';

import { Banner1 } from '@/components/banner/Banner1';
import { Banner2 } from '@/components/banner/Banner2';
import { Banner3 } from '@/components/banner/Banner3';
import { Banner4 } from '@/components/banner/Banner4';
import styled, { css } from 'styled-components';

export default function Home() {
  return (
    <>
      <Container>
        <Banner1></Banner1>
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

const Section = styled.div<{ $bgColor?: string; $customPadding?: string }>`
  ${({ theme, $bgColor, $customPadding }) => {
    const { colors } = theme;
    return css`
      width: 100%;
      background-color: ${$bgColor ? $bgColor : '#fff'};
      padding: ${$customPadding ? $customPadding : '140px 60px 120px'};
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
  }}
`;
