'use client';

import { useRef } from 'react';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import * as Style from './style';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useParallax(scrollYProgress, 100);

  return (
    <Style.Section>
      <Style.SectionContent ref={ref}>
        <Style.StyleImage src={`/images/${id}.jpg`} alt={`Image #00${id}`} />
      </Style.SectionContent>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </Style.Section>
  );
}

function Parallax() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <Style.Container ref={containerRef}>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image key={image} id={image} />
      ))}
      <Style.ProgressBar style={{ scaleX: scrollYProgress }} />
    </Style.Container>
  );
}

export default Parallax;
