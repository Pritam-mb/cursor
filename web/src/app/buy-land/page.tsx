"use client";

import { useMemo, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseUnits } from "viem";
import { CUSD, CEUR } from "@/lib/stableTokens";

const erc20Abi = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const purchaseAbi = [
  {
    inputs: [
      { name: "paymentToken", type: "address" },
      { name: "regionCode", type: "string" },
      { name: "name", type: "string" },
      { name: "price", type: "uint256" },
    ],
    name: "purchaseLand",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function BuyLandPage() {
  const { chainId } = useAccount();
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState("10");
  const [currency, setCurrency] = useState<"cUSD" | "cEUR">("cUSD");

  const contractAddress = process.env
    .NEXT_PUBLIC_GEO_LAND_NFT as `0x${string}` | undefined;

  const stableAddress = useMemo<`0x${string}` | undefined>(() => {
    if (!chainId) return undefined;
    return (currency === "cUSD" ? CUSD : CEUR)[chainId];
  }, [chainId, currency]);

  const numericPrice = useMemo(() => {
    try {
      return parseUnits(price || "0", 18);
    } catch {
      return undefined;
    }
  }, [price]);

  const { config: approveConfig } = usePrepareContractWrite({
    address: stableAddress,
    abi: erc20Abi as any,
    functionName: "approve",
    args: [contractAddress!, numericPrice!],
    enabled: Boolean(stableAddress && contractAddress && numericPrice),
  });

  const {
    write: approveWrite,
    data: approveData,
    isLoading: isApproving,
  } = useContractWrite(approveConfig);
  const { isLoading: approvePending, isSuccess: approveSuccess } =
    useWaitForTransaction({ hash: approveData?.hash });

  const { config: purchaseConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: purchaseAbi as any,
    functionName: "purchaseLand",
    args: [stableAddress!, region, name, numericPrice!],
    enabled: Boolean(
      contractAddress &&
      stableAddress &&
      name &&
      region &&
      numericPrice &&
      approveSuccess
    ),
  });

  const { data, write, isLoading: isWriting } = useContractWrite(purchaseConfig);
  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Buy Geo-Land</h1>
      <p className="text-sm text-white/70">
        Pay with cUSD or cEUR on Celo. Mint a Geo-Land NFT and receive Area
        Growth Tokens (AGT) for passive income.
      </p>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!approveSuccess) {
            approveWrite?.();
          } else {
            write?.();
          }
        }}
      >
        <div className="grid gap-2">
          <label className="text-sm">Land name</label>
          <input
            className="bg-white/5 rounded px-3 py-2 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kigali Block A"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Region code</label>
          <input
            className="bg-white/5 rounded px-3 py-2 outline-none"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="RWA-KG-01"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Currency</label>
          <select
            className="bg-white/5 rounded px-3 py-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
          >
            <option value="cUSD">cUSD</option>
            <option value="cEUR">cEUR</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Price</label>
          <input
            className="bg-white/5 rounded px-3 py-2 outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="10.00"
          />
        </div>

        {!contractAddress && (
          <div className="text-amber-400 text-sm">
            Set NEXT_PUBLIC_GEO_LAND_NFT in .env to enable purchases.
          </div>
        )}

        <button
          type="submit"
          disabled={
            (!approveSuccess && (!approveWrite || isApproving || approvePending)) ||
            (approveSuccess && (!write || isWriting || isPending))
          }
          className="w-full bg-emerald-500 text-black font-semibold rounded py-2 disabled:opacity-50"
        >
          {!approveSuccess
            ? isApproving || approvePending
              ? "Approving…"
              : "Approve Stablecoin"
            : isWriting || isPending
            ? "Buying…"
            : "Buy Land"}
        </button>

        {isSuccess && (
          <div className="text-emerald-400 text-sm">
            Success! Transaction confirmed.
          </div>
        )}
      </form>

      <div className="text-xs text-white/60">
        You may need to approve the stablecoin first; after confirmation, submit
        the purchase.
      </div>
    </div>
  );
}
