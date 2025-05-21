const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-extrabold mb-4 text-cyan-400">Welcome to SimpleWallet</h1>

        <p className="text-lg leading-relaxed text-gray-300 mb-3">
          This is a decentralized wallet powered by Ethereum smart contracts.
        </p>

        <p className="text-md text-gray-400">
          Easily connect your wallet, make deposits, and manage your funds on-chain — securely and transparently.
        </p>
      </div>
    </div>
  );
};

export default Home;
