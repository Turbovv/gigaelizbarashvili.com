"use client";
import Link from "next/link";
import React, { useState, useEffect, ReactNode } from "react";

interface TerminalProps {
  children: ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const terminalWidth = 1400;
    const terminalHeight = 700;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setPosition({
      x: (windowWidth - terminalWidth) / 2,
      y: (windowHeight - terminalHeight) / 2,
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - mouseOffset.x;
      const newY = e.clientY - mouseOffset.y;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const terminalWidth = 1400;
      const terminalHeight = 700;

      setPosition({
        x: Math.max(0, Math.min(newX, windowWidth - terminalWidth)),
        y: Math.max(0, Math.min(newY, windowHeight - terminalHeight)),
      });
    }
  };

  return (
    <div
      className="absolute z-10"
      style={{
        left: position.x,
        top: position.y,
        transition: isDragging ? "none" : "all 0.2s ease",
        width: "1400px",
        height: "700px",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative bg-gray-900 text-gray-300 rounded-lg shadow-lg border border-gray-700 h-full">
        <div
          className="flex items-center px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-auto text-sm text-gray-500">Ghostty</span>
        </div>

        <div className="px-6 py-8 text-center h-[90%]">
          {children}
        </div>

        <div className="px-4 py-2 bg-gray-800 rounded-b-lg flex gap-1 items-center">
          <span className="text-sm text-gray-500">~/main</span>
          <div className="flex gap-4 text-sm">
            <span className="cursor-pointer">tmux</span>
           <Link href="/">home</Link>
            <Link href="/about">projects</Link>
            <span className="cursor-pointer">guest-book</span>
            <span className="cursor-pointer">articles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

