import { FaReact } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white text-center py-6 mt-8 flex items-center justify-center gap-3">
      <FaReact className="text-cyan-400 w-6 h-6 animate-spin-slow" />
      <p className="text-sm font-semibold">© 2025 SimpleWallet DApp</p>
    </footer>
  );
};

export default Footer;
