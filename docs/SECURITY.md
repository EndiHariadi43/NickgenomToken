# Security Policy

## Reporting a Vulnerability
We take security seriously. If you discover a vulnerability, please report it to us immediately.

## Official Address

- **Nickgenom (NGM) – BNB Smart Chain (Mainnet):**  
  `0x0353aD4cAD5548dE4230E36d86ed5536a0bACA16`  
  BscScan: https://bscscan.com/address/0x0353aD4cAD5548dE4230E36d86ed5536a0bACA16

Only the address above is official. Any other address is unrelated.

## Impersonation & Phishing

- Beware of tokens/contracts using similar names or symbols.
- Confirm links only from our official channels (README, Whitepaper, website, Telegram/X).
- Never share seed phrases or private keys. The Nickgenom team will **never** ask for them.

## Reporting

If you discover a security issue or impersonation attempt, please open a confidential report via:
- GitHub Security Advisories (Private)  
- Telegram: @NGM_token (DM admins only)  
Include transaction hashes, addresses, and steps to reproduce if relevant.

### How to Report
Send an email to: 59972539+EndiHariadi43@users.noreply.github.com

Include the following information:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Responsible Disclosure
We will acknowledge receipt of your report within 48 hours and provide a timeline for when we expect to address the issue. We will keep you informed of our progress and notify you when the vulnerability is resolved.

## Security Measures

### Smart Contract Security
- The contract has been tested with unit tests
- The contract uses OpenZeppelin's audited contracts
- The contract includes custom error handling
- The contract includes rescue functions for misplaced tokens

### Operational Security
- Multi-sig wallet for contract ownership
- Time-locked contract upgrades (if applicable)
- Regular security audits

## Known Security Considerations

### Reentrancy
The contract does not perform external calls in a way that could lead to reentrancy attacks.

### Overflow/Underflow
The contract uses Solidity 0.8.20 which has built-in overflow/underflow protection.

### Access Control
Critical functions are protected by the `onlyOwner` modifier.

### Front-running
Permit functionality is designed to be resistant to front-running attacks.

## Audit History
- [TBD] Initial audit by [Audit Firm]
