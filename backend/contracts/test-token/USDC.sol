// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@rari-capital/solmate/src/tokens/ERC20.sol";

contract USDC is ERC20 {
    constructor() ERC20("USDC", "USDC", 6) {
        _mint(msg.sender, 10000000000000 * 10**6);
    }
}
