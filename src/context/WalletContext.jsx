import { createContext, useState, useEffect } from "react";
import { connectWallet } from "../services/wallet";
import { getBalance, getOwner } from "../services/simpleWallet";

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [owner, setOwner] = useState("");

  const handleConnect = async () => {
    try {
      const acc = await connectWallet();
      setAccount(acc);
      await loadWalletInfo();
    } catch (err) {
      console.error("Failed to connect:", err);
    }
  };

  const loadWalletInfo = async () => {
    if (!account) return; // skip if no account connected
    const bal = await getBalance();
    const own = await getOwner();
    setBalance(bal);
    setOwner(own);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  // Auto-load wallet info when account changes
  useEffect(() => {
    if (account) {
      loadWalletInfo();
    }
  }, [account]);

  return (
    <WalletContext.Provider value={{ account, handleConnect, balance, owner, loadWalletInfo }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
