# NickgenomToken API Reference

## Overview
NickgenomToken (NGM) is a fixed-supply BEP-20 token on Binance Smart Chain with EIP-2612 permit functionality.

## Contract Address
- **Mainnet**: [TBD]
- **Testnet**: [TBD]

## Functions

### Standard ERC20 Functions
- `name()`: Returns "Nickgenom"
- `symbol()`: Returns "NGM"
- `decimals()`: Returns 18
- `totalSupply()`: Returns 1,000,000,000,000 * 10^18
- `balanceOf(address account)`: Returns the balance of the specified account
- `transfer(address to, uint256 amount)`: Transfers tokens to the specified address
- `approve(address spender, uint256 amount)`: Approves the specified address to spend tokens
- `allowance(address owner, address spender)`: Returns the allowance of the specified spender

### EIP-2612 Permit Functions
- `permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)`: Sets approval using a signature
- `nonces(address owner)`: Returns the current nonce for the specified owner
- `DOMAIN_SEPARATOR()`: Returns the domain separator

### Burn Functions
- `burn(uint256 amount)`: Burns tokens from the caller
- `burnFrom(address account, uint256 amount)`: Burns tokens from the specified account

### Rescue Functions
- `rescueERC20(address token, uint256 amount)`: Rescues ERC20 tokens sent to the contract by mistake
- `rescueBNB(uint256 amount)`: Rescues BNB sent to the contract by mistake

## Events
- `Transfer(address from, address to, uint256 value)`: Emitted when tokens are transferred
- `Approval(address owner, address spender, uint256 value)`: Emitted when an approval is set
- `ERC20Rescued(address token, uint256 amount)`: Emitted when ERC20 tokens are rescued
- `BNBRescued(uint256 amount)`: Emitted when BNB is rescued

## Errors
- `ZeroAddress()`: Thrown when a zero address is provided
- `InvalidAmount()`: Thrown when an invalid amount is provided