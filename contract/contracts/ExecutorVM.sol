// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import { BytesLib } from "./BytesLib.sol";

struct Input {
    bool isHeapValue;
    bytes32 value;
}

struct Output {
    uint256 heapAddress;
    uint256 startIndex;
}

struct Call {
    address target;
    uint256 value;
    bytes4 selector;
    Input[] inputs;
    Output[] outputs;
}

struct CallResult {
    bool success;
    bytes returnData;
}

error ExecutorVM_CallFailure();

contract ExecutorVM {
    using BytesLib for bytes;

    bytes32 constant HEAP = keccak256("HEAP");

    constructor() {}

    function execute(bytes32[] memory heap, Call[] memory calls) public payable returns (CallResult[] memory results) {
        resetHeap(heap);

        for (uint256 i = 0; i < calls.length; i++) {
            results[i] = executeCall(calls[i]);
        }
    }

    function executeCall(Call memory call) internal returns (CallResult memory result) {        
        bytes memory inputsData = processInputs(call.inputs);
        bytes memory callData = bytes.concat(call.selector, inputsData);

        (bool success, bytes memory returnData) = call.target.call{value: call.value}(callData);
        if (!success) {
            revert ExecutorVM_CallFailure();
        }

        result.success = success;
        result.returnData = returnData;
        processOutputs(call.outputs, returnData);
    }

    function processInputs(Input[] memory inputs) internal view returns (bytes memory data) {
        for (uint256 i = 0; i < inputs.length; ) {
            bytes memory argumentData = processInput(inputs[i]);
            data = bytes.concat(data, argumentData);
            unchecked {
                ++i;
            }
        }
    }

    function processInput(Input memory input) internal view returns (bytes memory data) {
        if (input.isHeapValue) {
            data = abi.encode(getValueFromHeap(uint256(input.value)));
        } else {
            data = abi.encode(input.value);
        }
    }

    function processOutputs(Output[] memory outputs, bytes memory returnData) internal {
        for (uint256 i = 0; i < outputs.length; ) {
            processOutput(outputs[i], returnData);
            unchecked {
                ++i;
            }
        }
    }

    function processOutput(Output memory output, bytes memory returnData) internal {
        bytes32 data = returnData.toBytes32(output.startIndex);
        setValueToHeap(output.heapAddress, data);
    }

    function getValueFromHeap(uint256 heapAddress) internal view returns (bytes32 value) {
        bytes32[] memory heap = load(HEAP);
        value = heap[heapAddress];
    }

    function setValueToHeap(uint256 heapAddress, bytes32 value) internal {
        bytes32[] memory heap = load(HEAP);
        heap[heapAddress] = value;
        store(HEAP, heap);
    }

    function getHeapSnapshot() internal view returns (bytes32[] memory snapshot) {
        return load(HEAP);
    }

    function resetHeap(bytes32[] memory value) internal {
        store(HEAP, value);
    }

    function load(bytes32 location) private view returns (bytes32[] memory value) {
        assembly {
            value := sload(location)
        }
    }

    function store(bytes32 location, bytes32[] memory value) private {
        assembly {
            sstore(location, value)
        }
    }
}