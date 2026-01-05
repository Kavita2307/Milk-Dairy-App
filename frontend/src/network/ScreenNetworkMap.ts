import { NetworkPolicy } from "./NetworkPolicy";

export const SCREEN_NETWORK_MAP = {
  LeftoverScreen: NetworkPolicy.WIFI_FIRST,
  MilkProductionScreen: NetworkPolicy.WIFI_FIRST,
  DisplayScreen: NetworkPolicy.WIFI_FIRST,

  HomeScreen: NetworkPolicy.MOBILE_FIRST,
  DashboardScreen: NetworkPolicy.MOBILE_FIRST,
  SettingsScreen: NetworkPolicy.MOBILE_FIRST,
};
