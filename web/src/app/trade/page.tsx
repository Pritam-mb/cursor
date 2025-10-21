"use client";

import { useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseUnits } from "viem";

const AGT_ABI = [
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "redeemForCUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function TradePage() {
  const { address } = useAccount();
  const [amount, setAmount] = useState("5");
  const agt = process.env
    .NEXT_PUBLIC_AREA_GROWTH_TOKEN as `0x${string}` | undefined;

  const { config } = usePrepareContractWrite({
    address: agt,
    abi: AGT_ABI as any,
    functionName: "redeemForCUSD",
    args: [parseUnits(amount || "0", 18)],
    enabled: Boolean(agt && amount && address),
  });
  const { data, write, isLoading: isWriting } = useContractWrite(config);
  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Trade Area Growth Tokens</h1>
      <p className="text-sm text-white/70">
        Redeem AGT for cUSD to realize gains as spendable stablecoins.
      </p>

      <div className="grid gap-2">
        <label className="text-sm">Amount to redeem</label>
        <input
          className="bg-white/5 rounded px-3 py-2 outline-none"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      {!agt && (
        <div className="text-amber-400 text-sm">
          Set NEXT_PUBLIC_AREA_GROWTH_TOKEN in .env to enable redemptions.
        </div>
      )}
      <button
        disabled={!address || !write || isWriting || isPending}
        className="w-full bg-emerald-500 text-black font-semibold rounded py-2 disabled:opacity-50"
        onClick={() => write?.()}
      >
        {isWriting || isPending ? "Processing…" : "Redeem for cUSD"}
      </button>
      {isSuccess && (
        <div className="text-emerald-400 text-sm">
          Success! Transaction confirmed.
        </div>
      )}
    </div>
  );
}
