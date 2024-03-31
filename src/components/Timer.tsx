import React, { useState, useEffect } from 'react'

interface TimerProps {
  // Props if needed
}

const Timer: React.FC<TimerProps> = () => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Timer">
      Time Left: {timeLeft}s
    </div>
  );
};

export default Timer;