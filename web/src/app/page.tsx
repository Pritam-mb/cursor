import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Geo-Token Protocol on Celo</h1>
      <p className="text-sm text-white/70">
        Fractionalize virtual land backed by real-world growth. Buy Geo-Land NFTs
        with cUSD/cEUR, receive Area Growth Tokens (AGT), and redeem AGT back to
        cUSD for passive, spendable income.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/buy-land" className="bg-emerald-500 text-black text-center rounded py-3 font-semibold">
          Buy Land
        </Link>
        <Link href="/trade" className="bg-white/10 text-white text-center rounded py-3 font-semibold">
          Trade Tokens
        </Link>
        <Link href="/portfolio" className="bg-white/10 text-white text-center rounded py-3 font-semibold">
          Portfolio
        </Link>
      </div>
      <div className="text-xs text-white/60">
        Built for mobile: low fees, fast settlement, phone-based onboarding via Celo.
      </div>
    </div>
  );
}
