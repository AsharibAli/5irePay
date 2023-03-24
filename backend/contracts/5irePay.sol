// SPDX-License-Identifier: MIT

import "./interfaces/IERC20.sol";

pragma solidity ^0.8.7;

contract 5irePay {
    bytes4 private constant T_SELECTOR = bytes4(keccak256(bytes("transfer(address,uint256)")));
    bytes4 private constant TF_SELECTOR =
        bytes4(keccak256(bytes("transferFrom(address,address,uint256)")));

    mapping(bytes32 => address) private addresses; // email hash -> address
    mapping(address => bytes32) private hashes;

    event Registered(bytes32 emailHash, address user);

    function getAddress(bytes32 emailHash) external view returns (address _address) {
        _address = addresses[emailHash];
    }

    function isEmailRegistered(bytes32 emailHash) external view returns (bool exists) {
        if(addresses[emailHash] == address(0)) exists = false;
        else exists = true;
    }

    function register(bytes32 emailHash) external {
        require(addresses[emailHash] == address(0), "Already Registered"); // one check is enough
        addresses[emailHash] = msg.sender;
        hashes[msg.sender] = emailHash;
        emit Registered(emailHash, msg.sender);
    }

    function _safeTranfer(
        address token,
        address to,
        uint256 amount
    ) internal {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(T_SELECTOR, to, amount)
        );
        require(success && (data.length == 0 || abi.decode(data, (bool))), "Transfer Failed!");
    }

    function _safeTranferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) internal {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(TF_SELECTOR, from, to, amount)
        );
        require(success && (data.length == 0 || abi.decode(data, (bool))), "Transfer Failed!");
    }

    // function transferFrom(
    //     address _token,
    //     uint256 _amount,
    //     address _to,
    //     uint256 deadline,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) external {
    //     IERC20(_token).permit(msg.sender, address(this), _amount, deadline, v, r, s);
    //     _safeTranferFrom(_token, msg.sender, _to, _amount);
    // }

    function transferFrom(
        address _token,
        uint256 _amount,
        address _to
    ) external {
        _safeTranferFrom(_token, msg.sender, _to, _amount);
    }
}
