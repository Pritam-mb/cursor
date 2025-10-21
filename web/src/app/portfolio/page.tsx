"use client";

import { useAccount, useBalance } from "wagmi";
import { CUSD } from "@/lib/stableTokens";

export default function PortfolioPage() {
  const { address, chainId, isConnected } = useAccount();
  const agt = process.env
    .NEXT_PUBLIC_AREA_GROWTH_TOKEN as `0x${string}` | undefined;

  const { data: cusdBal } = useBalance({
    address,
    token: chainId ? CUSD[chainId] : undefined,
    watch: true,
    enabled: Boolean(isConnected && chainId),
  });

  const { data: agtBal } = useBalance({
    address,
    token: agt,
    watch: true,
    enabled: Boolean(isConnected && agt),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Your Portfolio</h1>
      {!isConnected ? (
        <div className="text-white/70 text-sm">
          Connect your wallet to view balances.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded p-4">
              <div className="text-xs text-white/60">cUSD</div>
              <div className="text-lg font-semibold">
                {cusdBal ? `${cusdBal.formatted} ${cusdBal.symbol}` : "—"}
              </div>
            </div>
            <div className="bg-white/5 rounded p-4">
              <div className="text-xs text-white/60">AGT</div>
              <div className="text-lg font-semibold">
                {agtBal ? `${agtBal.formatted} ${agtBal.symbol}` : "—"}
              </div>
            </div>
          </div>
          <div className="text-sm text-white/70">
            Geo-Land NFTs will appear in your wallet's NFTs tab. Marketplace
            view coming soon.
          </div>
        </>
      )}
    </div>
  );
}
