// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    event Deposited(address indexed from, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);

    error ZeroDeposit();
    error NothingToWithdraw();
    error TransferFailed();

    // anyone can deposit
    function deposit() external payable {
        if (msg.value == 0) {
            revert ZeroDeposit();
        }  

        emit Deposited(msg.sender, msg.value);
                
    }

    function withdraw() public onlyOwner {
        // only the owner can withdraw
        uint256 amount = address(this).balance;

    if (amount == 0) {
        revert NothingToWithdraw();
    }

    emit Withdrawn(owner(), amount);

    (bool success, ) = payable(owner()).call{value: amount}("");
    if (!success) {
        revert TransferFailed();
    }
    }
}