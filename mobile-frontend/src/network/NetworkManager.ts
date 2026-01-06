import NetInfo from "@react-native-community/netinfo";
import { NetworkPolicy } from "./NetworkPolicy";

export async function resolveNetwork(
  policy: NetworkPolicy = NetworkPolicy.MOBILE_FIRST // ✅ DEFAULT
) {
  const state = await NetInfo.fetch();

  if (!state.isConnected || !state.isInternetReachable) {
    return { canSend: false, reason: "No internet connection" };
  }

  // 🔵 WIFI FIRST (load cell screens)
  if (policy === NetworkPolicy.WIFI_FIRST) {
    if (state.type === "wifi") {
      return { canSend: true, using: "WIFI" };
    }

    // allow mobile fallback
    return { canSend: true, using: "MOBILE_FALLBACK" };
  }

  // 🟢 MOBILE FIRST (DEFAULT for entire app)
  if (state.type === "cellular") {
    return { canSend: true, using: "MOBILE" };
  }

  return {
    canSend: false,
    reason: "Please enable mobile data",
  };
}
