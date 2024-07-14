import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { sepolia, arbitrumSepolia, baseSepolia, optimismSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected } from 'wagmi/connectors'

export function getConfig() {
  return createConfig({
    chains: [sepolia, arbitrumSepolia, baseSepolia, optimismSepolia],
    multiInjectedProviderDiscovery: false,
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [sepolia.id]: http(),
      [arbitrumSepolia.id]: http(),
      [baseSepolia.id]: http(),
      [optimismSepolia.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
