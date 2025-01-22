
interface HeaderProps {
  onFullscreenToggle: () => void;
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFullscreenToggle, onClose }) => {
  return (
    <div className=" flex w-full justify-between pl-3 items-center">
      <div className="flex items-center gap-2 group">
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
   <span className=" text-gray-500">Terminal</span>
    </div>
  );
};

export default Header;
