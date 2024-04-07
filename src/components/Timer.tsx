import React, { useState, useEffect } from 'react'

interface TimerProps {
  duration: number
  onTimerEnd: () => void
  resetFlag: boolean
  onResetComplete: () => void
}

const Timer: React.FC<TimerProps> = ({ duration, onTimerEnd, resetFlag, onResetComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration); // in seconds

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerEnd()
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimerEnd]);

  useEffect(() => {
    if (resetFlag) {
        setTimeLeft(duration)
        onResetComplete()
    }
}, [resetFlag])

  return (
    <div className="Timer">
      Time Left: {timeLeft}s
    </div>
  );
};

export default Timer;