# Security Policy

## Reporting a Vulnerability
We take security seriously. If you discover a vulnerability, please report it to us immediately.

### How to Report
Send an email to: security@nickgenom.io or endi.linux.mint@gmail.com

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
