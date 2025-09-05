// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**

@title Nickgenom (NGM) — Fixed Supply BEP-20 with EIP-2612 Permit

@notice No tax, no blacklist, no transfer limits.

100% initial supply -> owner's address. Burn & burnFrom enabled.


*/
contract NickgenomPermit is ERC20, ERC20Permit, ERC20Burnable, Ownable {
string private constant _NAME   = "Nickgenom";
string private constant _SYMBOL = "NGM";
uint256 private constant _SUPPLY = 1_000_000_000_000; // 1 triliun (tanpa desimal)

// Owner + penerima 100% supply (checksummed)  
address private constant _OWNER_AND_RECIPIENT =  
    0x78b066f3e4c7A78EF6d4AA3929DF29D511bDCbFF;  

constructor()  
    ERC20(_NAME, _SYMBOL)  
    ERC20Permit(_NAME)  
    Ownable(_OWNER_AND_RECIPIENT)  
{  
    _mint(_OWNER_AND_RECIPIENT, _SUPPLY * 10 ** decimals());  
}  

function decimals() public pure override returns (uint8) {  
    return 18;  
}  

// Rescue aset nyasar (opsional)  
function rescueERC20(address token, uint256 amount) external onlyOwner {  
    IERC20(token).transfer(owner(), amount);  
}  
receive() external payable {}  
function rescueBNB(uint256 amount) external onlyOwner {  
    payable(owner()).transfer(amount);  
}

}
