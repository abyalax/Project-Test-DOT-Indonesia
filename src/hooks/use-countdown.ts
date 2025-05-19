// hooks/useCountdownTimer.ts
import { useEffect, useRef, useState } from "react";

type UseCountdownOptions = {
  duration: number; // in seconds
  autoStart?: boolean;
  onComplete?: () => void;
};

export function useCountDownTimer({ duration, autoStart = false, onComplete }: UseCountdownOptions) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const pause = () => setIsRunning(false);
  const start = () => {
    setIsRunning(true);
  };
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onComplete]);

  return { timeLeft, isRunning, start, pause, reset };
}
