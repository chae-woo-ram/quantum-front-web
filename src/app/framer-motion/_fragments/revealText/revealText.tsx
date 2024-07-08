import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AnimatedText = styled.div`
  display: flex;
  overflow: hidden;
`;

const Letter = styled(motion.span)`
  display: inline-block;
  margin-right: 2px;
`;

const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

interface TextProps {
  text: string;
}

const Text = ({ text }: TextProps) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setLetters(text.split(""));
    }, 3000);
  }, [text]);

  return (
    <AnimatedText>
      {letters.map((letter, index) => (
        <Letter
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          {letter}
        </Letter>
      ))}
    </AnimatedText>
  );
};

export default Text;

// 사용 예시
// export default function App() {
//   return <AnimatedTextComponent text="Hello, World!" />;
// }
