import React from 'react';
import { MotionProps } from 'framer-motion';

interface AnimatedTextProps {
  children: React.ReactNode;
  ref: React.Ref<HTMLDivElement>;
  getAnimationProps: (index: number) => MotionProps;
}

export const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  ({ children, getAnimationProps }, ref) => {
    return (
      <div ref={ref}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              initial: { opacity: 0, y: 30 },
              animate: getAnimationProps(index),
            } as MotionProps);
          }
          return child;
        })}
      </div>
    );
  },
);
