import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'MyOApp',
}

const zkpolygonsepContract: OmniPointHardhat = {
    eid: EndpointId.ZKPOLYGONSEP_V2_TESTNET,
    contractName: 'MyOApp',
}

const arbsepContract: OmniPointHardhat = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: 'MyOApp',
}

const basesepContract: OmniPointHardhat = {
    eid: EndpointId.BASESEP_V2_TESTNET,
    contractName: 'MyOApp',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: sepoliaContract,
        },
        {
            contract: zkpolygonsepContract,
        },
        {
            contract: arbsepContract,
        },
        {
            contract: basesepContract,
        },
    ],
    connections: [
        {
            from: sepoliaContract,
            to: zkpolygonsepContract,
        },
        {
            from: sepoliaContract,
            to: arbsepContract,
        },
        {
            from: sepoliaContract,
            to: basesepContract,
        },
        {
            from: zkpolygonsepContract,
            to: sepoliaContract,
        },
        {
            from: zkpolygonsepContract,
            to: arbsepContract,
        },
        {
            from: zkpolygonsepContract,
            to: basesepContract,
        },
        {
            from: arbsepContract,
            to: sepoliaContract,
        },
        {
            from: arbsepContract,
            to: zkpolygonsepContract,
        },
        {
            from: arbsepContract,
            to: basesepContract,
        },
        {
            from: basesepContract,
            to: sepoliaContract,
        },
        {
            from: basesepContract,
            to: zkpolygonsepContract,
        },
        {
            from: basesepContract,
            to: arbsepContract,
        },
        // {
        //     from: fujiContract,
        //     to: sepoliaContract,
        //     config: {
        //         sendConfig: {
        //             executorConfig: {
        //                 maxMessageSize: 99,
        //                 executor: '0x71d7a02cDD38BEa35E42b53fF4a42a37638a0066',
        //             },
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: [],
        //                 optionalDVNs: [
        //                     '0xe9dCF5771a48f8DC70337303AbB84032F8F5bE3E',
        //                     '0x0AD50201807B615a71a39c775089C9261A667780',
        //                 ],
        //                 optionalDVNThreshold: 2,
        //             },
        //         },
        //         receiveConfig: {
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: [],
        //                 optionalDVNs: [
        //                     '0x3Eb0093E079EF3F3FC58C41e13FF46c55dcb5D0a',
        //                     '0x0AD50201807B615a71a39c775089C9261A667780',
        //                 ],
        //                 optionalDVNThreshold: 2,
        //             },
        //         },
        //     },
        // },
    ],
}

export default config
