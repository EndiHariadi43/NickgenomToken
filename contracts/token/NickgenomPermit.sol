// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IRescue.sol";
import "./NickgenomErrors.sol"; // ← TAMBAHKAN IMPORT INI

contract NickgenomPermit is ERC20, ERC20Permit, ERC20Burnable, Ownable, IRescue {
    string private constant _NAME   = "Nickgenom";
    string private constant _SYMBOL = "NGM";
    uint256 private constant _SUPPLY = 1_000_000_000_000 * 10**18;
    
    // Tidak perlu definisi errors di sini karena sudah di import
    
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
        if (token == address(0)) revert ZeroAddress(); // ← Menggunakan dari NickgenomErrors.sol
        if (amount == 0) revert InvalidAmount(); // ← Menggunakan dari NickgenomErrors.sol
        
        IERC20(token).transfer(owner(), amount);
        emit ERC20Rescued(token, amount);
    }
    
    function rescueBNB(uint256 amount) external override onlyOwner {
        if (amount == 0) revert InvalidAmount(); // ← Menggunakan dari NickgenomErrors.sol
        if (address(this).balance < amount) revert("Insufficient balance");
        
        payable(owner()).transfer(amount);
        emit BNBRescued(amount);
    }
    
    receive() external payable {}
}