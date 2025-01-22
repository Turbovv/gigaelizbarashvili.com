"use client";
import { useEffect } from "react";
import "~/styles/background-animations.css";

export default function AnimatedCircles() {
  useEffect(() => {
    const circles = document.querySelectorAll(".animated-circle");
    circles.forEach(circle => {
      const element = circle as HTMLElement;
      const moveX = Math.random() * 200 - 100 + "vw";
      const moveY = Math.random() * 200 - 100 + "vh";
      element.style.setProperty("--move-x", moveX);
      element.style.setProperty("--move-y", moveY);
    });

    const randomIndices = new Set<number>();
    while (randomIndices.size < 100) {
      randomIndices.add(Math.floor(Math.random() * circles.length));
    }
    randomIndices.forEach(index => {
      const element = circles[index] as HTMLElement;
      element.classList.add("fade");
    });
  }, []);

  return (
    <div className="circle-container">
      {Array.from({ length: 500 }).map((_, index) => (
        <div
          key={index}
          className="animated-circle"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
          }}
        />
      ))}
    </div>
  );
}