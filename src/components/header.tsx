import { FileText, Github, Linkedin } from "lucide-react";
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
   <div className="lg:hidden text-gray-400">
        Giga Elizbarashvili
      </div>
      <div className="flex space-x-4 items-center">
        <a
        href="/cv.pdf"
        download="Giga Elizbarashvili.pdf"
        className="flex px-2 py-2 bg-gray-800 text-white underline font-medium rounded-lg"
      >
           <FileText  size={20} />
        CV
      </a>
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
