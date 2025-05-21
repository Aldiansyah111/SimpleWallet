// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleWallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Event log
    event Deposit(address indexed sender, uint amount);
    event Withdraw(address indexed to, uint amount);

    // Fungsi menerima ETH otomatis (tanpa fungsi)
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // 🔹 Fungsi eksplisit untuk deposit
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        emit Deposit(msg.sender, msg.value);
    }

    // Cek saldo
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    // Withdraw oleh owner
    function withdraw(uint _amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(address(this).balance >= _amount, "Insufficient balance");

        payable(owner).transfer(_amount);
        emit Withdraw(owner, _amount);
    }
}
