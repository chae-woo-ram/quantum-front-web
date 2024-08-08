import { css } from 'styled-components';

const animation = {
  fadeIn: (duration: number, timing: string) => css`
    animation: fade-in ${duration}s ${timing};
    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,

  fadeOut: (duration: number, timing: string) => css`
    animation: fade-out ${duration}s ${timing};
    @keyframes fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `,

  fadeInToOut: (duration: number, timing: string) => css`
    animation: fade-in-out ${duration}s ${timing};
    @keyframes fade-in-out {
      0% {
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `,

  scaleIn: (duration: number, timing: string) => css`
    visibility: visible;
    transition: visibility ${duration}s ${timing};
    animation: scale-in ${duration}s ${timing};
    @keyframes scale-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  `,

  scaleOut: (duration: number, timing: string) => css`
    visibility: hidden;
    transition: visibility ${duration}s ${timing};
    animation: scale-out ${duration}s ${timing};
    @keyframes scale-out {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(0);
      }
    }
  `,

  spinCycle: (duration: number, timing: string) => css`
    animation: rotation ${duration}s linear ${timing};
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,

  slideIn: (duration: number, fromX: string, toX: string) => css`
    animation: fade-in ${duration}s ease-in-out forwards;
    @keyframes fade-in {
      from {
        transform: translateX(${fromX});
      }
      to {
        transform: translateX(${toX});
      }
    }
  `,

  blinkShadow: (duration: number, color: string) => css`
    animation: blink-shadow ${duration}s infinite;
    @keyframes blink-shadow {
      0%,
      100% {
        box-shadow: 0 0 10px ${color};
      }
      50% {
        box-shadow: none;
      }
    }
  `,
};

export { animation };
