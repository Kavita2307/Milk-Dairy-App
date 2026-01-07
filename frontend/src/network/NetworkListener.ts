import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";

/**
 * Starts a global network listener.
 * Calls retryQueued() whenever the device comes online.
 *
 * @param retryQueued function to retry queued requests
 * @returns unsubscribe function
 */
export function startNetworkListener(
  retryQueued: () => void
): NetInfoSubscription {
  return NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      console.log("Network connected → retry queued requests");
      retryQueued();
    }
  });
}
