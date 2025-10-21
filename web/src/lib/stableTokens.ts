import { celo, celoAlfajores } from "@celo/rainbowkit-celo/chains";

type AddressMap = Record<number, `0x${string}`>;

export const CUSD: AddressMap = {
  [celo.id]:
    (process.env.NEXT_PUBLIC_CELO_MAINNET_CUSD as `0x${string}`) ||
    ("0x765DE816845861e75A25fCA122bb6898B8B1282a" as `0x${string}`),
  [celoAlfajores.id]:
    (process.env.NEXT_PUBLIC_ALFAJORES_CUSD as `0x${string}`) ||
    ("0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1" as `0x${string}`),
};

export const CEUR: AddressMap = {
  [celo.id]:
    (process.env.NEXT_PUBLIC_CELO_MAINNET_CEUR as `0x${string}`) ||
    ("0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73" as `0x${string}`),
  [celoAlfajores.id]:
    (process.env.NEXT_PUBLIC_ALFAJORES_CEUR as `0x${string}`) ||
    ("0x10c892A6Ec0d69Df62A3Ca90f3bb8a3992aBe0f2" as `0x${string}`),
};
