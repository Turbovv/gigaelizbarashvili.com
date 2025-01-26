"use client";

import React, { useState, useEffect } from "react";
import "~/styles/background-animations.css";

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

    setPositions(
      Array.from({ length: TOTAL_CIRCLES }).map((_, index) => ({
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        moveX: `${(Math.random() - 0.5) * 200}vw`,
        moveY: `${(Math.random() - 0.5) * 200}vh`,
        isSpecial: specialIndices.has(index),
      }))
    );
  }, []);

  if (positions.length === 0) return null;

  return (
    <div className="circle-container">
      {positions.map((pos, index) => (
        <div
          key={index}
          className={`animated-circle ${pos.isSpecial ? "bg-white-circle" : ""}`}
          style={{
            top: pos.top,
            left: pos.left,
            "--move-x": pos.moveX,
            "--move-y": pos.moveY,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
