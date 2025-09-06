// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../interfaces/IRescue.sol";
import "./INickgenomPermit.sol";
import "./NickgenomErrors.sol";

/**
 * @title Nickgenom (NGM) — Fixed Supply BEP-20 with EIP-2612 Permit
 * @notice No tax, no blacklist, no transfer limits.
 *         100% initial supply -> owner's address. Burn & burnFrom enabled.
 * @dev Implements EIP-2612 for gasless approvals
 */
contract NickgenomPermit is ERC20, ERC20Permit, ERC20Burnable, Ownable, IRescue, INickgenomPermit {
    string private constant _NAME   = "Nickgenom";
    string private constant _SYMBOL = "NGM";
    uint256 private immutable _SUPPLY = 1_000_000_000_000 * 10**18; // 1 triliun dengan 18 desimal
    
    // Events untuk fungsi rescue
    event ERC20Rescued(address token, uint256 amount);
    event BNBRescued(uint256 amount);
    
    constructor()
        ERC20(_NAME, _SYMBOL)
        ERC20Permit(_NAME)
        Ownable(msg.sender) // ✅ Gunakan msg.sender bukan hard-coded
    {
        _mint(msg.sender, _SUPPLY);
    }
    
    // Fungsi rescue dengan events dan error handling
    function rescueERC20(address token, uint256 amount) external override onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        if (amount == 0) revert InvalidAmount();
        
        IERC20(token).transfer(owner(), amount);
        emit ERC20Rescued(token, amount);
    }
    
    function rescueBNB(uint256 amount) external override onlyOwner {
        if (amount == 0) revert InvalidAmount();
        if (address(this).balance < amount) revert InvalidAmount();
        
        payable(owner()).transfer(amount);
        emit BNBRescued(amount);
    }
    
    // Fungsi untuk menerima BNB
    receive() external payable {}
    
    // Fungsi untuk mendapatkan total supply
    function totalSupply() public view override returns (uint256) {
        return _SUPPLY;
    }
}