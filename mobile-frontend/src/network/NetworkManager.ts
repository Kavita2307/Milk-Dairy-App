import NetInfo from "@react-native-community/netinfo";
import { NetworkPolicy } from "./NetworkPolicy";

export async function resolveNetwork(policy: NetworkPolicy) {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    return { canSend: false, reason: "OFFLINE" };
  }

  if (policy === NetworkPolicy.WIFI_FIRST) {
    if (state.type === "wifi") {
      return { canSend: true, using: "WIFI" };
    }
    return { canSend: true, using: "CELLULAR_FALLBACK" };
  }

  if (policy === NetworkPolicy.MOBILE_FIRST) {
    if (state.type === "cellular") {
      return { canSend: true, using: "CELLULAR" };
    }
    return { canSend: true, using: "WIFI_FALLBACK" };
  }

  return { canSend: false };
}
