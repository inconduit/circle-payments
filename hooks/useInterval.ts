import { useEffect, useRef } from "react";

export default function useInterval(
  callback: () => void,
  delay: number,
  cancellationTest?: () => boolean
) {
  const savedCallback = useRef<() => void>();
  const savedCancellationTest = useRef<() => boolean | null>();

  useEffect(() => {
    savedCallback.current = callback;
    savedCancellationTest.current = cancellationTest;
  }, [callback, cancellationTest]);

  useEffect(() => {
    if (delay !== null) {
      const tick = () => {
        if (savedCancellationTest.current?.()) {
          clearInterval(intervalId);
        }
        savedCallback.current?.();
      };
      let intervalId = setInterval(tick, delay);

      return () => clearInterval(intervalId);
    }
  }, [delay]);
}
