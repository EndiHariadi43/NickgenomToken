// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleERC20 is ERC20, Ownable {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        address owner_,
        address mintTo_
    ) ERC20(name_, symbol_) {
        _transferOwnership(owner_);
        _mint(mintTo_, initialSupply_);
    }
}

contract NickgenomFactory is Ownable {
    // fee dalam wei (mis: 0.01 BNB = 0.01 * 1e18)
    uint256 public deployFeeWei = 0.01 ether; 
    address public feeCollector;

    event TokenDeployed(address token, address indexed deployer, string name, string symbol, uint256 initialSupply);

    constructor(address _feeCollector) {
        require(_feeCollector != address(0), "invalid collector");
        feeCollector = _feeCollector;
        _transferOwnership(_feeCollector); // owner = kolektor
    }

    function setDeployFee(uint256 newFeeWei) external onlyOwner {
        deployFeeWei = newFeeWei;
    }

    function setFeeCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "invalid collector");
        feeCollector = newCollector;
    }

    /// @notice Deploy token ERC20 baru dengan mint awal ke msg.sender (atau ke mintTo).
    /// @param name_ nama token
    /// @param symbol_ simbol token
    /// @param initialSupply jumlah awal (dalam unit penuh, ingat decimals = 18 bila ingin 1000 * 1e18)
    /// @param mintTo alamat penerima mint awal (jika 0x0, maka msg.sender)
    function deployToken(
        string calldata name_,
        string calldata symbol_,
        uint256 initialSupply,
        address mintTo
    ) external payable returns (address token) {
        require(msg.value >= deployFeeWei, "insufficient fee");
        address receiver = mintTo == address(0) ? msg.sender : mintTo;

        // Mint menggunakan 18 desimal default (sesuai ERC20 OpenZeppelin)
        SimpleERC20 t = new SimpleERC20(name_, symbol_, initialSupply, owner(), receiver);
        token = address(t);

        // kirim fee
        (bool ok, ) = feeCollector.call{value: msg.value}("");
        require(ok, "fee transfer failed");

        emit TokenDeployed(token, msg.sender, name_, symbol_, initialSupply);
    }

    // Tarik BNB yang nyasar
    function rescueBNB(uint256 amount) external onlyOwner {
        (bool ok, ) = owner().call{value: amount}("");
        require(ok, "rescue failed");
    }

    receive() external payable {}
}
