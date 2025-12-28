interface HeaderProps {
  title: string;
  imageTheme: string;
  onThemeToggle: () => void;
}

const Header = ({ title, imageTheme, onThemeToggle }: HeaderProps) => {
  return (
    <header className="flex items-center w-full justify-between mb-10 ">
      <h1 className="text-3xl font-bold text-gray-50">{title}</h1>
      <button className="cursor-pointer border-0">
        <img src={imageTheme} alt="Header Image" onClick={onThemeToggle} />
      </button>
    </header>
  );
};

export default Header;
