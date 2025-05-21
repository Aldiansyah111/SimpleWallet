const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-4 text-cyan-400">About</h1>

        <p className="text-lg leading-relaxed text-gray-300 mb-6">
          <span className="text-white font-semibold">SimpleWallet</span> is a decentralized application (dApp) that lets you securely deposit and withdraw funds via a smart contract. It demonstrates basic interaction between a web UI and the Ethereum blockchain using modern web technologies.
        </p>

        <p className="text-lg leading-relaxed text-gray-300 mb-4">
          Built for learning and experimentation, SimpleWallet empowers users to understand how wallets, Web3 providers, and smart contracts interact in real time. Whether you're new to blockchain or just exploring dApps, this project offers a simple and clear example.
        </p>

        <p className="text-lg leading-relaxed text-gray-300 mb-4">
          This app uses <span className="text-white font-medium">React, TailwindCSS</span>, and <span className="text-white font-medium">Ethers.js</span> to connect with the Ethereum network. All transactions are processed via a deployed smart contract, ensuring transparency and control in your hands.
        </p>

        <p className="text-lg leading-relaxed text-gray-300">
          This project is open-source and part of a broader vision to make decentralized finance accessible to everyone. We welcome contributions and feedback from the community. Let's build the future of Web3 — together.
        </p>
      </div>
    </div>
  );
};

export default About;
