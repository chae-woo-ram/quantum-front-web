'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Counter from './_fragments/counter/counter';
import RevealText from './_fragments/revealText/revealText';
import { Variants, motion, useAnimation, useInView } from 'framer-motion';
import * as Style from './style';

interface Props {
  emoji: string;
  hueA: number;
  hueB: number;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

const Card = ({ emoji, hueA, hueB }: Props) => {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <Style.CardContainer initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }}>
      <Style.Splash style={{ background }} />
      <Style.Card variants={cardVariants}>{emoji}</Style.Card>
    </Style.CardContainer>
  );
};

const Section = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <Style.Section ref={ref}>
      <Style.SectionContent $isInView={isInView}>
        {children} {isInView ? 't' : 'f'}
      </Style.SectionContent>
    </Style.Section>
  );
};

function FadeInWhenVisible({ children }: { children: ReactNode }) {
  const controls = useAnimation();
  const ref2 = useRef(null);
  const isInView = useInView(ref2);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref2}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
      style={{ height: '100vh', border: '1px solid' }}
    >
      {children}
    </motion.div>
  );
}

const food: [string, number, number][] = [
  ['🍅', 340, 10],
  ['🍊', 20, 40],
  ['🍋', 60, 90],
  ['🍐', 80, 120],
  ['🍏', 100, 140],
  ['🫐', 205, 245],
  ['🍆', 260, 290],
  ['🍇', 290, 320],
];

export default function App() {
  return (
    <Style.Container>
      <Style.Title>
        <Counter to={700} from={0} />
        만명이 선택한 Web
      </Style.Title>

      <Style.Title>
        <RevealText text={'Water Melon Service'} />
      </Style.Title>
      {food.map(([emoji, hueA, hueB]) => (
        <Card emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
      ))}
      <Section>Animate</Section>
      <Section>when</Section>
      <Section>in</Section>
      <Section>view!</Section>
      <FadeInWhenVisible>1234</FadeInWhenVisible>
      <FadeInWhenVisible>5678</FadeInWhenVisible>
      <FadeInWhenVisible>91011</FadeInWhenVisible>
    </Style.Container>
  );
}
