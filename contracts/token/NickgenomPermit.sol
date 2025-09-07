// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IRescue.sol"; // Hapus import Rescue dan NickgenomErrors

contract NickgenomPermit is ERC20, ERC20Permit, ERC20Burnable, Ownable, IRescue {
    string private constant _NAME   = "Nickgenom";
    string private constant _SYMBOL = "NGM";
    uint256 private constant _SUPPLY = 1_000_000_000_000 * 10**18;
    
    // Definisikan errors langsung di sini
    error ZeroAddress();
    error InvalidAmount();
    
    // Events
    event ERC20Rescued(address token, uint256 amount);
    event BNBRescued(uint256 amount);
    
    constructor()
        ERC20(_NAME, _SYMBOL)
        ERC20Permit(_NAME)
        Ownable(msg.sender)
    {
        _mint(msg.sender, _SUPPLY);
    }
    
    function rescueERC20(address token, uint256 amount) external override onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        if (amount == 0) revert InvalidAmount();
        
        IERC20(token).transfer(owner(), amount);
        emit ERC20Rescued(token, amount);
    }
    
    function rescueBNB(uint256 amount) external override onlyOwner {
        if (amount == 0) revert InvalidAmount();
        if (address(this).balance < amount) revert("Insufficient balance");
        
        payable(owner()).transfer(amount);
        emit BNBRescued(amount);
    }
    
    receive() external payable {}
}