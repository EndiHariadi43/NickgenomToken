// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22; // Update dari 0.8.20 ke 0.8.22

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface INickgenomPermit is IERC20 {
    function totalSupply() external view returns (uint256);
}