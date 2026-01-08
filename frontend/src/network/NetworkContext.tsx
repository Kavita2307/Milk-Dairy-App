import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { readLoadCell } from "../api/loadCell";
import { NetworkPolicy } from "../network/NetworkPolicy";

// type NetworkContextType = {
//   internetOnline: boolean;
//   machineConnected: boolean;
// };
type NetworkContextType = {
  internetOnline: boolean;
  machineConnected: boolean;
  wifiOn: boolean;
  mobileOn: boolean;
  readyForWeighing: boolean;
};

const NetworkContext = createContext<NetworkContextType>({
  internetOnline: false,
  machineConnected: false,
  wifiOn: false,
  mobileOn: false,
  readyForWeighing: false,
});

export const useNetwork = () => useContext(NetworkContext);

export async function resolveNetwork(policy: NetworkPolicy) {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    return { canSend: false };
  }

  if (policy === NetworkPolicy.WIFI_FIRST) {
    return {
      canSend: true,
      preferred: state.type === "wifi" ? "WIFI" : "CELLULAR_FALLBACK",
    };
  }

  if (policy === NetworkPolicy.MOBILE_FIRST) {
    return {
      canSend: true,
      preferred: state.type === "cellular" ? "CELLULAR" : "WIFI_FALLBACK",
    };
  }

  return { canSend: false };
}

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [internetOnline, setInternetOnline] = useState(false);
  const [machineConnected, setMachineConnected] = useState(false);
  const [wifiOn, setWifiOn] = useState(false);
  const [mobileOn, setMobileOn] = useState(false);

  // 🌐 INTERNET STATUS
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     const online =
  //       Boolean(state.isConnected) && Boolean(state.isInternetReachable);
  //     setInternetOnline(online);
  //   });

  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online =
        Boolean(state.isConnected) && Boolean(state.isInternetReachable);

      setInternetOnline(online);
      setWifiOn(state.type === "wifi" && state.isConnected);

      setMobileOn(
        Boolean(
          state.isConnected &&
            state.details &&
            "cellularGeneration" in state.details
        )
      );
    });

    return () => unsubscribe();
  }, []);

  // ⚖️ MACHINE STATUS (auto-ping every 5 sec)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkMachine = async () => {
      try {
        await readLoadCell();
        setMachineConnected(true);
      } catch {
        setMachineConnected(false);
      }
    };

    checkMachine(); // immediate check on app start

    interval = setInterval(checkMachine, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <NetworkContext.Provider
    //   value={{
    //     internetOnline,
    //     machineConnected,
    //   }}
    // >
    <NetworkContext.Provider
      value={{
        internetOnline,
        machineConnected,
        wifiOn,
        mobileOn,
        readyForWeighing: wifiOn && mobileOn && machineConnected,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
