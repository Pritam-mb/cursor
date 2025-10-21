"use client";

import { PropsWithChildren } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { RainbowKitProvider, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { celo, celoAlfajores } from "@celo/rainbowkit-celo/chains";
import "@rainbow-me/rainbowkit/styles.css";

const supportedChains = [celoAlfajores, celo] as const;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportedChains,
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Geo-Token Protocol",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
    "00000000000000000000000000000000",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        appInfo={{ appName: "Geo-Token Protocol" }}
        coolMode
        theme={darkTheme({ accentColor: "#35d07f", borderRadius: "large" })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
