import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { WalletContext } from "../context/WalletContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { account, handleConnect } = useContext(WalletContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-900 text-white px-6 py-4 shadow-lg relative z-50">
      <div className="flex justify-between items-center">
        <div className="font-extrabold text-xl tracking-widest">
          SimpleWallet
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link 
            to="/" 
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          <Link 
            to="/transaction" 
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            Transaction
          </Link>
          <Link 
            to="/about" 
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            About
          </Link>

          {!account ? (
            <button
              onClick={handleConnect}
              className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 text-purple-900 px-4 py-2 rounded font-semibold"
            >
              Connect Wallet
            </button>
          ) : (
            <span className="text-sm text-green-300 font-mono bg-purple-800 px-3 py-1 rounded">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 flex flex-col bg-purple-800 rounded-lg px-4 py-3">
          <Link 
            to="/" 
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          <Link 
            to="/transaction" 
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            Transaction
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            About
          </Link>

          {!account ? (
            <button
              onClick={() => {
                handleConnect();
                setMenuOpen(false);
              }}
              className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 text-purple-900 px-4 py-2 rounded font-semibold w-full"
            >
              Connect Wallet
            </button>
          ) : (
            <span className="text-sm text-green-300 font-mono bg-purple-700 px-3 py-1 rounded w-full text-center">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
