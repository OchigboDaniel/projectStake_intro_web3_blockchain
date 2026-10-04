// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RegisterAName {

    mapping (address => string) public name;

    event NameRegisteredLog( address indexed user, string regName);

    // handle already existing name
    error AlreadyRegistered();
    // handles empty name
    error NameTooShort();

    function register(string calldata name_) external {
        // check if the address already has a name
        if ( bytes(name[msg.sender]).length > 0 ) {
            revert AlreadyRegistered();
        }
        // check if the newly registered name is for than 3 char
        if (bytes(name_).length < 3){
            revert NameTooShort();            
        }
        name[msg.sender] = name_;
        emit NameRegisteredLog(msg.sender, name_);
    }
}