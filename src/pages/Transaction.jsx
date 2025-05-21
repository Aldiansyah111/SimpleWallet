// import { useContext, useState } from "react";
// import { WalletContext } from "../context/WalletContext";
// import { depositETH, withdrawETH } from "../services/simpleWallet";
// import { FaWallet, FaArrowDown, FaArrowUp } from "react-icons/fa";

// const Transaction = () => {
//     const { account, balance, owner, loadWalletInfo } = useContext(WalletContext);
//     const [depositAmount, setDepositAmount] = useState("");
//     const [withdrawAmount, setWithdrawAmount] = useState("");

//     const handleDeposit = async () => {
//         if (!depositAmount) return alert("Please enter an amount to deposit.");

//         try {
//             await depositETH(depositAmount);
//             await loadWalletInfo();
//             setDepositAmount("");
//             alert("Deposit successful!");
//         } catch (error) {
//             console.error("Deposit error:", error);
//             alert("Deposit failed. Please try again.");
//         }
//     };

//     const handleWithdraw = async () => {
//         if (!withdrawAmount) return alert("Please enter an amount to withdraw.");

//         try {
//             await withdrawETH(withdrawAmount);
//             await loadWalletInfo();
//             setWithdrawAmount("");
//             alert("Withdraw successful!");
//         } catch (error) {
//             console.error("Withdraw error:", error);
//             alert("Only owner can withdraw.");
//         }
//     };


//     if (!account) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white flex items-center justify-center px-4">
//                 <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center">
//                     <h1 className="text-2xl font-bold mb-2">Transaction Page</h1>
//                     <p className="text-red-400">Please connect your wallet from the navbar first.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white flex items-center justify-center px-4 py-12">
//             <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8">
//                 <h1 className="text-3xl font-extrabold mb-4 text-cyan-400 flex items-center gap-2">
//                     <FaWallet /> Transaction Page
//                 </h1>

//                 <div className="mb-6 text-gray-300 space-y-2">
//                     <p><span className="text-white font-medium">Connected as:</span> {account}</p>
//                     <p><span className="text-white font-medium">Owner:</span> {owner}</p>
//                     <p><span className="text-white font-medium">Contract Balance:</span> {balance} ETH</p>
//                 </div>

//                 <div className="mb-6">
//                     <label className="block text-white font-medium mb-1">Deposit ETH</label>
//                     <div className="flex">
//                         <input
//                             type="text"
//                             placeholder="Amount"
//                             value={depositAmount}
//                             onChange={(e) => setDepositAmount(e.target.value)}
//                             className="flex-1 px-3 py-2 rounded-l bg-black/30 text-white border border-gray-600 focus:outline-none"
//                         />
//                         <button
//                             onClick={handleDeposit}
//                             className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r text-white flex items-center gap-2"
//                         >
//                             <FaArrowDown /> Deposit
//                         </button>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-white font-medium mb-1">Withdraw ETH</label>
//                     <div className="flex">
//                         <input
//                             type="text"
//                             placeholder="Amount"
//                             value={withdrawAmount}
//                             onChange={(e) => setWithdrawAmount(e.target.value)}
//                             className="flex-1 px-3 py-2 rounded-l bg-black/30 text-white border border-gray-600 focus:outline-none"
//                         />
//                         <button
//                             onClick={handleWithdraw}
//                             className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r text-white flex items-center gap-2"
//                         >
//                             <FaArrowUp /> Withdraw
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Transaction;



import { useContext, useState } from "react";
import { WalletContext } from "../context/WalletContext";
import { depositETH, withdrawETH } from "../services/simpleWallet";
import { FaWallet, FaArrowDown, FaArrowUp } from "react-icons/fa";

const Transaction = () => {
    const { account, balance, owner, loadWalletInfo } = useContext(WalletContext);
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");

    // Fungsi untuk cek jaringan Holesky (chainId 0x4268)
    const checkNetwork = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask.");
            return false;
        }
        try {
            const chainId = await window.ethereum.request({ method: "eth_chainId" });
            if (chainId !== "0x4268") {  // 0x4268 = Hex for Holesky chain ID
                alert("Please switch your MetaMask network to Holesky.");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Failed to check network:", error);
            alert("Failed to check network. Please try again.");
            return false;
        }
    };

    const handleDeposit = async () => {
        if (!depositAmount) return alert("Please enter an amount to deposit.");

        if (!(await checkNetwork())) return;

        try {
            await depositETH(depositAmount);
            await loadWalletInfo();
            setDepositAmount("");
            alert("Deposit successful!");
        } catch (error) {
            console.error("Deposit error:", error);
            alert("Deposit failed. Please try again.");
        }
    };

    const handleWithdraw = async () => {
        if (!withdrawAmount) return alert("Please enter an amount to withdraw.");

        if (!(await checkNetwork())) return;

        try {
            await withdrawETH(withdrawAmount);
            await loadWalletInfo();
            setWithdrawAmount("");
            alert("Withdraw successful!");
        } catch (error) {
            console.error("Withdraw error:", error);
            alert("Only owner can withdraw.");
        }
    };

    if (!account) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white flex items-center justify-center px-4">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center">
                    <h1 className="text-2xl font-bold mb-2">Transaction Page</h1>
                    <p className="text-red-400">Please connect your wallet from the navbar first.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-extrabold mb-4 text-cyan-400 flex items-center gap-2">
                    <FaWallet /> Transaction Page
                </h1>

                <div className="mb-6 text-gray-300 space-y-2">
                    <p><span className="text-white font-medium">Connected as:</span> {account}</p>
                    <p><span className="text-white font-medium">Owner:</span> {owner}</p>
                    <p><span className="text-white font-medium">Contract Balance:</span> {balance} ETH</p>
                </div>

                <div className="mb-6">
                    <label className="block text-white font-medium mb-1">Deposit ETH</label>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Amount"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-l bg-black/30 text-white border border-gray-600 focus:outline-none"
                        />
                        <button
                            onClick={handleDeposit}
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r text-white flex items-center gap-2"
                        >
                            <FaArrowDown /> Deposit
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-white font-medium mb-1">Withdraw ETH</label>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Amount"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-l bg-black/30 text-white border border-gray-600 focus:outline-none"
                        />
                        <button
                            onClick={handleWithdraw}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r text-white flex items-center gap-2"
                        >
                            <FaArrowUp /> Withdraw
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;

