// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleContract {
    string public message;
    address public owner;
    constructor() {
        owner = msg.sender;
        message = "Hello, blockchain!";
    }

    error NotOwner();

    event MessageUpdated(address indexed by, string newMessage);

    modifier onlyOwner() {
        if (owner != msg.sender){
            revert NotOwner();
        }
        _;
    }

     function setMessage(string calldata newMessage) external onlyOwner {
        message = newMessage;
        emit MessageUpdated(msg.sender, newMessage);
    }

    
}