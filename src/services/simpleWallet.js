// services/simpleWallet.js
import { ethers, parseEther, formatEther } from "ethers";
import contractJson from './SimpleWallet.json';
import { getProviderAndSigner } from "./wallet";

const CONTRACT_ABI = contractJson.abi;
const CONTRACT_ADDRESS = "0x98dC62904Ff76ab5eBa77B664A0d7f488Ec4AA94";

const getContract = async () => {
  const { signer } = getProviderAndSigner();
  // signer adalah Promise di ethers v6, harus await
  const resolvedSigner = await signer;
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, resolvedSigner);
}

// ini dalam satuan ether
// export const depositETH = async (amountInEther) => {
//   const contract = await getContract();
//   const tx = await contract.deposit({ value: parseEther(amountInEther) });
//   await tx.wait();
//   return tx;
// };

// ini dalam bentuk satuan ether
export const depositETH = async (amountInWei) => {
  const contract = await getContract();
  const tx = await contract.deposit({ value: amountInWei });
  await tx.wait();
  return tx;
};

export const withdrawETH = async (amountInWei) => {
  const contract = await getContract();
  const tx = await contract.withdraw(parseEther(amountInWei));
  await tx.wait();
  return tx;
};

export const getBalance = async () => {
  const contract = await getContract();
  const balance = await contract.getBalance();
  return formatEther(balance);
};

export const getOwner = async () => {
  const contract = await getContract();
  return await contract.owner();
};
