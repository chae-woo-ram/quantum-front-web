import { motion } from "framer-motion";
import { css, styled } from "styled-components";

const Container = styled.div`
  margin: 100px auto;
  max-width: 500px;
  padding-bottom: 100px;
`;

const Title = styled.div`
  margin: 100px auto;
  max-width: 500px;
  font-weight: 700;
  font-size: 34px;
`;

const Card = styled(motion.div)`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      font-size: 164px;
      width: 300px;
      height: 430px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 20px;
      box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075),
        0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075),
        0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075);
      transform-origin: 10% 60%;
    `;
  }}
`;

const CardContainer = styled(motion.div)`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding-top: 20px;
      margin-bottom: -120px;
    `;
  }}
`;

const Splash = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  clip-path: path(
    "M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z"
  );
`;

const Section = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 101vh;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  padding: 50px;
  border: 1px solid #333;
`;

const SectionContent = styled.div<{ $isInView: boolean }>`
  ${({ theme, $isInView }) => {
    const { colors } = theme;
    return css`
      display: block;
      transform: ${$isInView ? "none" : "translateX(-200px)"};
      opacity: ${$isInView ? 1 : 0};
      transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s;
      font-size: 34px;
    `;
  }}
`;

export {
  Card,
  CardContainer,
  Container,
  Section,
  SectionContent,
  Splash,
  Title,
};
