'use client';

import { styled } from 'styled-components';

export const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 CHAEWOORAM GALLERY. All Rights Reserved. </p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: 1rem;
  text-align: center;
  font-size: 10px;
  height: 48px;
  background-color: #e8e8e8;
  color: #a0a0a0;
`;
