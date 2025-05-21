// ini test dalam bentuk localhost-harhat Network

// // wallet.js - untuk ethers v6
// import { BrowserProvider } from "ethers";

// export const connectWallet = async () => {
//   if (window.ethereum) {
//     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//     return accounts[0];
//   } else {
//     throw new Error("Metamask not installed");
//   }
// };

// export const getProviderAndSigner = () => {
//   const provider = new BrowserProvider(window.ethereum);
//   const signer = provider.getSigner();
//   return { provider, signer };
// };


import { BrowserProvider, Network } from "ethers";

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("Metamask not installed");

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  const chainId = await window.ethereum.request({ method: "eth_chainId" });

  // chainId Holesky = 0x4268 (hexadecimal dari 17000)
  if (chainId !== "0x4268") {
    alert("Please switch your MetaMask network to Holesky");
    throw new Error("Wrong network: Please switch to Holesky");
  }

  return accounts[0];
};

export const getProviderAndSigner = () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  return { provider, signer };
};

