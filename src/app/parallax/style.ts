import { motion } from 'framer-motion';
import { css, styled } from 'styled-components';

const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`;

const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  scroll-snap-align: center;
  perspective: 500px;
`;

const SectionContent = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 300px;
      height: 400px;
      position: relative;
      max-height: 90vh;
      margin: 20px;
      overflow: hidden;
    `;
  }}
`;

const StyleImage = styled.img`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    `;
  }}
`;

const ProgressBar = styled(motion.div)`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      background: blue;
      height: 5px;
      position: fixed;
      bottom: 30px;
      left: 0;
      right: 0;
    `;
  }}
`;

export { Container, ProgressBar, Section, SectionContent, StyleImage };
