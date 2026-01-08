// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import NetInfo from "@react-native-community/netinfo";
// import { getWeight, tareScale } from "../../api/esp32Service";
// import { useNetwork } from "@/src/network/NetworkContext";

// export default function WeightDisplayScreen() {
//   const [weight, setWeight] = useState(0);
//   const [stable, setStable] = useState(false);
//   const [status, setStatus] = useState("CHECKING NETWORK");

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const { readyForWeighing } = useNetwork();
//   const { internetOnline, machineConnected } = useNetwork();

//   useEffect(() => {
//     if (!machineConnected) {
//       setStatus("TURN ON WIFI");
//       return;
//     } else if (!internetOnline) {
//       setStatus("turn on mobile data");
//       return;
//     } else if (!machineConnected && !internetOnline) {
//       setStatus("mobile data and wifi both are not connected");
//       return;
//     }

//     startPolling();
//     return stopPolling;
//   }, [internetOnline, machineConnected]);

//   /* =============================
//      NETWORK CHECK (Wi-Fi + Mobile)
//      ============================= */
//   const checkNetwork = async () => {
//     const state = await NetInfo.fetch();

//     const wifiOn = state.type === "wifi" && state.isConnected;
//     const mobileOn =
//       state.isConnected &&
//       state.details &&
//       "cellularGeneration" in state.details;

//     return wifiOn && mobileOn;
//   };

//   /* =============================
//      START POLLING
//      ============================= */
//   const startPolling = () => {
//     if (intervalRef.current) return;

//     intervalRef.current = setInterval(async () => {
//       try {
//         const data = await getWeight();
//         setWeight(data.weight);
//         setStable(data.stable);
//         setStatus(data.stable ? "STABLE" : "MEASURING...");
//       } catch {
//         setStatus("DEVICE NOT CONNECTED");
//       }
//     }, 500);
//   };

//   const stopPolling = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };

//   /* =============================
//      INITIAL LOAD
//      ============================= */
//   // useEffect(() => {
//   //   const init = async () => {
//   //     const networkOk = await checkNetwork();

//   //     if (!networkOk) {
//   //       setStatus("TURN ON WIFI + MOBILE DATA");
//   //       return;
//   //     }

//   //     setStatus("CONNECTED");
//   //     startPolling();
//   //   };

//   //   init();

//   //   return () => stopPolling();
//   // }, []);

//   /* =============================
//      TARE
//      ============================= */
//   const handleTare = async () => {
//     try {
//       await tareScale();
//       Alert.alert("Success", "Scale tared successfully");
//     } catch {
//       Alert.alert("Error", "Weighing machine not connected");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Weight Display</Text>

//       <Text style={styles.weight}>{weight.toFixed(2)} kg</Text>

//       <Text style={[styles.status, { color: stable ? "#16a34a" : "#dc2626" }]}>
//         {status}
//       </Text>

//       <TouchableOpacity
//         style={[styles.button, !stable && { opacity: 0.5 }]}
//         onPress={handleTare}
//         disabled={!stable}
//       >
//         <Text style={styles.buttonText}>TARE</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// /* =============================
//    STYLES
//    ============================= */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f6f8",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 20,
//   },
//   weight: {
//     fontSize: 48,
//     fontWeight: "800",
//     color: "#2563eb",
//   },
//   status: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   button: {
//     marginTop: 30,
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     backgroundColor: "#2563eb",
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  NativeModules,
  Platform,
  PermissionsAndroid,
} from "react-native";

const { DualNetworking } = NativeModules;

// ESP CONFIG
const ESP_WIFI_SSID = "EDMILK";
const ESP_WIFI_PASS = "12345678";
const ESP_API_URL = "http://192.168.4.1/api/weight";

export default function WeightDisplayScreen() {
  const [weight, setWeight] = useState(0);
  const [stable, setStable] = useState(false);
  const [status, setStatus] = useState("INITIALIZING");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* =============================
     CONNECT TO ESP + START POLLING
     ============================= */
  useEffect(() => {
    // Start the auto-connect loop immediately
    const init = async () => {
      await requestPermissions();
      // Give a small delay for permissions to settle
      setTimeout(connectToEsp, 1000);
    };
    init();
  }, []);
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs location permission to scan for WiFi networks.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const connectToEsp = async () => {
    try {
      setStatus("CONNECTING TO SCALE...");
      const result = await DualNetworking.connectToDeviceWifi(
        ESP_WIFI_SSID,
        ESP_WIFI_PASS
      );
      setStatus("CONNECTED: " + result);

      startPolling();
    } catch (e: any) {
      setStatus("CONNECTION FAILED");
      setTimeout(connectToEsp, 3000);
    }
  };

  /* =============================
     POLLING (500ms)
     ============================= */
  const startPolling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(fetchWeight, 500);
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const fetchWeight = async () => {
    try {
      const data = await DualNetworking.fetchWeight(ESP_API_URL);
      console.log("Using Weight Data:", data);

      let parsedWeight = data;

      if (typeof data === "string") {
        const clean = data.trim();
        if (clean.startsWith("{")) {
          const json = JSON.parse(clean);
          parsedWeight = json.weight ?? json.value;
        }
      }

      const numericWeight = parseFloat(parsedWeight);
      setWeight(numericWeight);
      setStable(numericWeight > 0);
      setStatus(numericWeight > 0 ? "STABLE" : "MEASURING...");
    } catch {
      setStatus("READ ERROR");
      setStable(false);
    }
  };

  /* =============================
     TARE (OPTIONAL)
     ============================= */
  const handleTare = async () => {
    Alert.alert("Info", "Tare handled on device");
  };

  /* =============================
     UI
     ============================= */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Display</Text>

      <Text style={styles.weight}>{weight.toFixed(2)} kg</Text>

      <Text style={[styles.status, { color: stable ? "#16a34a" : "#dc2626" }]}>
        {status}
      </Text>

      <TouchableOpacity
        style={[styles.button, !stable && { opacity: 0.5 }]}
        onPress={handleTare}
        disabled={!stable}
      >
        <Text style={styles.buttonText}>TARE</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  weight: {
    fontSize: 48,
    fontWeight: "800",
    color: "#2563eb",
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: "#2563eb",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
