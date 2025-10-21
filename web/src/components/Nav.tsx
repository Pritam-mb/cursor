"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 bg-black text-white border-b border-white/10">
      <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="font-semibold text-base tracking-tight">
          Geo-Token
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/buy-land" className="hover:underline">Buy Land</Link>
          <Link href="/trade" className="hover:underline">Trade</Link>
          <Link href="/portfolio" className="hover:underline">Portfolio</Link>
          <ConnectButton accountStatus={{ smallScreen: "avatar", largeScreen: "address" }} />
        </nav>
      </div>
    </header>
  );
}
