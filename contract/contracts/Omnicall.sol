// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OApp } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";
import { ILayerZeroEndpointV2, MessagingFee, MessagingReceipt, Origin } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { ILayerZeroComposer } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroComposer.sol";
import { ExecutorVM, Call, CallResult } from "./ExecutorVM.sol";

contract Omnicall is ILayerZeroComposer, OApp, ExecutorVM {
    uint32 public immutable eid;

    constructor(address _endpoint, address _delegate) OApp(_endpoint, _delegate) Ownable(_delegate) {
        eid = ILayerZeroEndpointV2(_endpoint).eid();
    }

    function quote(
        uint32 _eid,
        Call[] calldata _calls,
        bytes calldata _options
    ) public view returns (uint256 nativeFee, uint256 lzTokenFee) {
        bytes32[] memory _heap = getHeapSnapshot();
        bytes memory _payload = abi.encode(_heap, _calls);
        MessagingFee memory fee = _quote(_eid, _payload, _options, false);
        return (fee.nativeFee, fee.lzTokenFee);
    }

    function send(
        uint32 _dstEid,
        Call[] calldata _calls,
        bytes calldata _options
    ) external payable returns(MessagingReceipt memory receipt) {
        bytes32[] memory _heap = getHeapSnapshot();
        bytes memory _payload = abi.encode(_heap, _calls);
        receipt = _lzSend(
            _dstEid,
            _payload,
            _options,
            MessagingFee(msg.value, 0), // Fee in native gas and ZRO token.
            payable(msg.sender) // Refund address in case of failed source message.
        );
    }

    function _lzReceive(
        Origin calldata /*_origin*/,
        bytes32 /*_guid*/,
        bytes calldata _payload,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        (bytes32[] memory _heap, Call[] memory _calls) = abi.decode(_payload, (bytes32[], Call[]));
        execute(_heap, _calls);
    }

    function lzCompose(
        address _oApp,
        bytes32 /*_guid*/,
        bytes calldata _payload,
        address,
        bytes calldata
    ) external payable override {
        require(_oApp == address(this), "!oApp");
        require(msg.sender == address(endpoint), "!endpoint");

        (bytes32[] memory _heap, Call[] memory _calls) = abi.decode(_payload, (bytes32[], Call[]));
        execute(_heap, _calls);
    }
}