import { NetworkPolicy } from "./NetworkPolicy";

export const SCREEN_NETWORK_MAP: Record<string, NetworkPolicy> = {
  LeftoverScreen: NetworkPolicy.WIFI_FIRST,
  MilkProductionScreen: NetworkPolicy.WIFI_FIRST,
  DisplayScreen: NetworkPolicy.WIFI_FIRST,
};
