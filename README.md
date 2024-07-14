# Omnicall

Send multiple calls cross chains in one time using Layerzero.

This project is made for ETHGlobal Brussels 2024.

## Description

This tool empowers users to easily construct and execute multiple cross-chain calls in one time using a user-friendly block editor on the frontend. With this cross-chain composability, users can create a comprehensive strategy to achieve their goals or intents in a single transaction, rather than sending multiple transactions across different chains.

For example, consider a user wanting to perform a cross-chain triangle arbitrage strategy. Typically, they would need to bridge a token, wait a long time, trade tokens, bridge back to the original chain, wait again, and finally trade it back to the original token. This process involves at least four transactions on two chains and wastes time bridging tokens, all while bearing rate risk. With Omnicall, users can bundle all these actions into a single strategy and send it once, streamlining the process.

The vision of this tool extends beyond facilitating DeFi strategies such as omnichain triangle arbitrage or omnichain collateral management. It also aims to benefit DAOs by enabling omnichain treasury management and handling omnichain proposals.

Omnicall is more powerful than multicall.

## How it made

The Omnicall contract is designed for smart contract wallets to ensure asset security. Therefore, you need to deploy smart wallets with Omnicall on different chains to represent yourself.

We utilize Layerzero to manage omnichain messages behind the scenes. To empower users who aren't programmers, we use Blockly to provide an easy-to-use, no-code interface for creating Omnicall strategies effortlessly. Additionally, we use Dynamic for user onboarding.

Tech:
- Layerzero
- Dynamic
- Blockly
- Next.js
