"use client";

import React, { useState, useEffect, ReactNode, useRef } from "react";
import Header from "./header";
import Footer from "./footer";
import LanguageSwitcher from "./language-switcher";

interface TerminalProps {
  children: ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ children }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 1400, height: 700 });

  const defaultSize = { width: 1400, height: 700 };

  useEffect(() => {
    const updateSizeAndPosition = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (windowWidth <= 1024) {
        setSize({ width: windowWidth, height: windowHeight });
        setPosition({ x: 0, y: 0 });
      } else {
        const newWidth = Math.min(defaultSize.width, windowWidth - 20);
        const newHeight = Math.min(defaultSize.height, windowHeight - 20);

        setSize({ width: newWidth, height: newHeight });
        setPosition({
          x: (windowWidth - newWidth) / 2,
          y: (windowHeight - newHeight) / 2,
        });
      }
    };

    updateSizeAndPosition();

    const handleResize = () => {
      updateSizeAndPosition();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetTerminal();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("resize", handleResize);
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
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const newWidth = Math.min(defaultSize.width, windowWidth - 20);
    const newHeight = Math.min(defaultSize.height, windowHeight - 20);

    setSize({ width: newWidth, height: newHeight });
    setPosition({
      x: (windowWidth - newWidth) / 2,
      y: (windowHeight - newHeight) / 2,
    });
  };

  return (
    <div
      ref={terminalRef}
      className={`fixed z-10 flex justify-center items-center
        w-full h-full
        left-0 top-0
        transition-all duration-200
      `}
      style={{
        ...(size.width > 1024
          ? {
        left: position.x,
        top: position.y,
        width: `${size.width}px`,
        height: `${size.height}px`,
            }
          : {}),
      }}
    >
      <div className={`relative bg-gradient-to-tr from-black to-neutral-800 text-gray-300 shadow-lg border border-gray-700
          w-full h-full
          max-w-[1400px] max-h-[800px]
          sm:rounded-lg
          sm:p-4 p-2
          flex flex-col
        `}
      >
        <div className="flex items-center sm:px-4 px-2 sm:py-2 py-2">
          <Header onFullscreenToggle={toggleFullscreen} onClose={resetTerminal} />
          <LanguageSwitcher />
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Terminal;

