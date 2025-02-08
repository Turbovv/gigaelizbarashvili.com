import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onFullscreenToggle: () => void;
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFullscreenToggle, onClose }) => {
  return (
    <div className=" flex w-full justify-between pl-3 items-center">
      <div className="flex items-center gap-2 group max-lg:hidden">
        <div
          className="w-3 h-3 rounded-full bg-gray-500 group-hover:bg-red-500 cursor-pointer"
          onClick={onClose}
        ></div>

        <div
          className="w-3 h-3 rounded-full bg-gray-500 group-hover:bg-yellow-500 cursor-pointer"
        ></div>

        <div
          className="w-3 h-3 rounded-full bg-gray-500 group-hover:bg-green-500 cursor-pointer"
          onClick={onFullscreenToggle}
        ></div>
      </div>
   <div className="text-center mx-auto  lg:hidden text-gray-400">
        Giga Elizbarashvili
      </div>
      <div className="flex space-x-4">
      <Link
          href="https://www.linkedin.com/in/turbovv/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-500"
        >
          <Linkedin size={24} />
        </Link>

        <Link
          href="https://github.com/Turbovv"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200"
        >
          <Github size={24} />
        </Link>
        </div>
    </div>
  );
};

export default Header;
