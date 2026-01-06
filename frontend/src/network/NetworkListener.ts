import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";

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
type MachineNetworkStatus = {
  isMachineConnected: boolean;
  machineIp: string | null;
};
const FORCE_MACHINE = true; // change to false later

export const listenToNetworkChanges = (
  onChange: (status: MachineNetworkStatus) => void
) => {
  return NetInfo.addEventListener((state: NetInfoState) => {
    let isMachineConnected = false;
    let machineIp: string | null = null;

    // 1️⃣ Check Wi-Fi
    if (state.type === "wifi" && state.isConnected) {
      const details: any = state.details;

      // 2️⃣ Detect ESP32 by IP range
      if (details?.ipAddress?.startsWith("192.168.")) {
        isMachineConnected = true;
        machineIp = "192.168.4.1"; // default ESP32 gateway
      }

      // 3️⃣ Optional: Detect by SSID name
      if (
        details?.ssid &&
        (details.ssid.includes("ESP32") ||
          details.ssid.includes("MILK") ||
          details.ssid.includes("LOAD"))
      ) {
        isMachineConnected = true;
        machineIp = "192.168.4.1";
      }
      if (FORCE_MACHINE) {
        onChange({
          isMachineConnected: true,
          machineIp: "192.168.4.1",
        });
        return;
      }

      console.log("Machine Connected:", isMachineConnected, machineIp);
      console.log("Network type:", state.type);
      console.log("Connected:", state.isConnected);
      console.log("SSID:", state.details?.ssid);
      console.log("IP:", state.details?.ipAddress);
    }

    onChange({
      isMachineConnected,
      machineIp,
    });
  });
};
