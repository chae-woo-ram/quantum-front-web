import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useAnimationInView = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  const getAnimationProps = (index: number) => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    transition: { duration: 1, delay: index * 0.5 },
  });

  return { ref, getAnimationProps };
};
