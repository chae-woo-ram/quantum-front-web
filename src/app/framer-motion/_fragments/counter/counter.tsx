import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterPropsType {
  from: number;
  to: number;
}

const Counter = ({ from, to }: CounterPropsType) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      const controls = animate(from, to, {
        duration: 3,
        type: "tween",

        onUpdate(value: number) {
          node.textContent = value.toFixed();
        },
      });

      return () => controls.stop();
    }
  }, [from, to]);

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        minWidth: "3em", // 적당한 고정 너비를 설정합니다. (필요에 따라 조정 가능)
        textAlign: "right", // 숫자가 오른쪽 정렬되도록 합니다.
      }}
    ></span>
  );
};

export default Counter;

// 사용 예시
// export default function App() {
//   return <Counter from={0} to={100} />;
// }
