'use client';

import { styled } from 'styled-components';

export const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 My App. All rights reserved.</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: 1rem;
  text-align: center;
`;
