// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev ERC20 sederhana untuk token hasil deploy dari Factory.
 *      Menggunakan 18 desimal (default ERC20 OZ).
 */
contract SimpleERC20 is ERC20, Ownable {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,   // sudah dalam satuan 18 desimal
        address owner_,           // pemilik kontrak (owner)
        address mintTo_           // penerima mint awal
    )
        ERC20(name_, symbol_)
        Ownable(owner_)           // <-- Wajib di OZ v5: panggil base ctor di sini
    {
        _mint(mintTo_, initialSupply_);
    }
}

/**
 * @title NickgenomFactory
 * @notice Mini launchpad: deploy token ERC20 baru dengan membayar fee dalam BNB.
 */
contract NickgenomFactory is Ownable {
    // fee deploy dalam wei (contoh: 0.01 ether)
    uint256 public deployFeeWei = 0.01 ether;
    address public feeCollector;

    event TokenDeployed(
        address token,
        address indexed deployer,
        string name,
        string symbol,
        uint256 initialSupply
    );

    constructor(address _feeCollector)
        Ownable(_feeCollector) // <-- Wajib di OZ v5
    {
        require(_feeCollector != address(0), "invalid collector");
        feeCollector = _feeCollector;
    }

    function setDeployFee(uint256 newFeeWei) external onlyOwner {
        deployFeeWei = newFeeWei;
    }

    function setFeeCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "invalid collector");
        feeCollector = newCollector;
    }

    /**
     * @notice Deploy token ERC20 baru.
     * @param name_ Nama token (mis. "MyToken")
     * @param symbol_ Simbol (mis. "MTK")
     * @param initialSupply Jumlah awal (SUDAH 18 desimal, mis. 1_000 * 1e18)
     * @param mintTo Alamat penerima mint awal (0x0 => msg.sender)
     */
    function deployToken(
        string calldata name_,
        string calldata symbol_,
        uint256 initialSupply,
        address mintTo
    ) external payable returns (address token) {
        require(msg.value >= deployFeeWei, "insufficient fee");

        address receiver = (mintTo == address(0)) ? msg.sender : mintTo;

        SimpleERC20 t = new SimpleERC20(
            name_,
            symbol_,
            initialSupply,
            owner(),   // owner kontrak token = owner factory (feeCollector)
            receiver
        );
        token = address(t);

        // kirim fee ke feeCollector
        (bool ok, ) = feeCollector.call{value: msg.value}("");
        require(ok, "fee transfer failed");

        emit TokenDeployed(token, msg.sender, name_, symbol_, initialSupply);
    }

    // Tarik BNB nyasar dari factory (hanya owner)
    function rescueBNB(uint256 amount) external onlyOwner {
        (bool ok, ) = owner().call{value: amount}("");
        require(ok, "rescue failed");
    }

    receive() external payable {}
}
