// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRescue {
    function rescueERC20(address token, uint256 amount) external;
    function rescueBNB(uint256 amount) external;
}