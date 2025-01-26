"use client"
import React, { useState, useEffect, memo } from "react";
import "~/styles/background-animations.css";

type CircleProps = {
  top: string;
  left: string;
  isSpecial: boolean;
  moveX: string;
  moveY: string;
};

const Circle = memo(({ top, left, isSpecial, moveX, moveY }: CircleProps) => (
  <div
    className={`animated-circle ${isSpecial ? "bg-white-circle" : ""}`}
    style={{
      top,
      left,
      "--move-x": moveX,
      "--move-y": moveY,
    } as React.CSSProperties}
  />
));

export default function AnimatedCircles() {
  const TOTAL_CIRCLES = 500;
  const SPECIAL_CIRCLES = 100;

  const [positions, setPositions] = useState<
    { top: string; left: string; isSpecial: boolean; moveX: string; moveY: string }[]
  >([]);

  useEffect(() => {
    const specialIndices = new Set<number>();

    while (specialIndices.size < SPECIAL_CIRCLES) {
      const randomIndex = Math.floor(Math.random() * TOTAL_CIRCLES);
      specialIndices.add(randomIndex);
    }

    const newPositions = Array.from({ length: TOTAL_CIRCLES }).map((_, index) => ({
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      moveX: `${(Math.random() - 0.5) * 100}vw`,
      moveY: `${(Math.random() - 0.5) * 100}vh`,
      isSpecial: specialIndices.has(index),
    }));

    setPositions(newPositions);
  }, []);

  if (positions.length === 0) return null;

  return (
    <div className="circle-container">
      {positions.map((pos, index) => (
        <Circle
          key={index}
          top={pos.top}
          left={pos.left}
          isSpecial={pos.isSpecial}
          moveX={pos.moveX}
          moveY={pos.moveY}
        />
      ))}
    </div>
  );
}