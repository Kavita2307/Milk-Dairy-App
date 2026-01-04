import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { readLoadCell } from "../api/loadCell";

type NetworkContextType = {
  internetOnline: boolean;
  machineConnected: boolean;
};

const NetworkContext = createContext<NetworkContextType>({
  internetOnline: false,
  machineConnected: false,
});

export const useNetwork = () => useContext(NetworkContext);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [internetOnline, setInternetOnline] = useState(false);
  const [machineConnected, setMachineConnected] = useState(false);

  // 🌐 INTERNET STATUS
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online =
        Boolean(state.isConnected) && Boolean(state.isInternetReachable);
      setInternetOnline(online);
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
    <NetworkContext.Provider
      value={{
        internetOnline,
        machineConnected,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
