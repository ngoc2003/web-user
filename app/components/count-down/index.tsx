"use client";

import React, { useEffect, useState } from "react";

interface PCCountDownProps {
  time: number;
  onFinish: () => void;
}

const PCCountDown = ({ time, onFinish }: PCCountDownProps) => {
  const [timer, setTimer] = useState<number>(time);

  useEffect(() => {
    const count = setInterval(
      () => setTimer((prev) => (timer > 0 ? prev - 1 : prev)),
      1000
    );

    if (timer === 0) {
      onFinish();
    }

    return () => {
      clearInterval(count);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return <>{timer}s</>;
};

export default PCCountDown;
