import NetInfo from "@react-native-community/netinfo";

/**
 * Returns true only if device is connected to Wi-Fi.
 * Used for local-network devices like load cells.
 */
export async function requireWifi(): Promise<boolean> {
  const state = await NetInfo.fetch();
  return !!state.isConnected && state.type === "wifi";
}
