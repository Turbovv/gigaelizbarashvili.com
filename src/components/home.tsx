"use client";

import Link from "next/link";
import React, { useState, useEffect, ReactNode, useRef } from "react";
import Header from "./header";
import Footer from "./footer";

interface TerminalProps {
  children: ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ children }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 1400, height: 700 });

  const defaultSize = { width: 1400, height: 700 };
  const defaultPosition = { x: 0, y: 0 };

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setPosition({
      x: (windowWidth - defaultSize.width) / 2,
      y: (windowHeight - defaultSize.height) / 2,
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetTerminal();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = async () => {
    if (terminalRef.current && !document.fullscreenElement) {
      await terminalRef.current.requestFullscreen();
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const resetTerminal = async () => {
    if (isFullscreen) {
      await exitFullscreen();
    }
    setPosition({
      x: (window.innerWidth - defaultSize.width) / 2,
      y: (window.innerHeight - defaultSize.height) / 2,
    });
    setSize(defaultSize);
  };

  return (
    <div
      ref={terminalRef}
      className="absolute z-10"
      style={{
        left: position.x,
        top: position.y,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transition: "all 0.2s ease",
      }}
    >
      <div className="relative bg-gray-900 text-gray-300 rounded-lg shadow-lg border border-gray-700 h-full">
        <div className="flex items-center px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
          <Header onFullscreenToggle={toggleFullscreen} onClose={resetTerminal} />
        </div>

        <div className="h-[90%]">
          {children}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Terminal;
