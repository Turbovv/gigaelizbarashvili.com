import React from "react";

interface HeaderProps {
  onFullscreenToggle: () => void;
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFullscreenToggle, onClose }) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex items-center w-full gap-2">
        <div
          className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
          onClick={onClose}
        ></div>

        <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>

        <div
          className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
          onClick={onFullscreenToggle}
        ></div>

        <span className="ml-auto text-sm text-gray-500">Terminal</span>
      </div>
    </div>
  );
};

export default Header;
