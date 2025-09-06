// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../interfaces/IRescue.sol";

abstract contract Rescue is IRescue {
    event ERC20Rescued(address token, uint256 amount);
    event BNBRescued(uint256 amount);

    function rescueERC20(address token, uint256 amount) external virtual override {
        if (token == address(0)) revert ZeroAddress();
        if (amount == 0) revert InvalidAmount();
        
        IERC20(token).transfer(msg.sender, amount);
        emit ERC20Rescued(token, amount);
    }
    
    function rescueBNB(uint256 amount) external virtual override {
        if (amount == 0) revert InvalidAmount();
        if (address(this).balance < amount) revert InvalidAmount();
        
        payable(msg.sender).transfer(amount);
        emit BNBRescued(amount);
    }
}