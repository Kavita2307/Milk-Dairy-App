// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { readLoadCell } from "@/src/api/loadCell";

// export default function WeighingMachineScreen() {
//   const [weight, setWeight] = useState<number>(0);
//   const [stable, setStable] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [tareWeight, setTareWeight] = useState<number>(0);
//   const isPollingRef = useRef(false);

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   // LOAD WEIGHT

//   const loadWeight = async () => {
//     try {
//       const data = await readLoadCell();

//       setWeight(data.weight);
//       setStable(data.stable);
//     } catch {
//       // SILENT FAIL (no alert)
//       setStable(false);
//     }
//   };

//   // AUTO REFRESH (500ms)

//   useEffect(() => {
//     if (isPollingRef.current) return;
//     isPollingRef.current = true;
//     loadWeight();

//     intervalRef.current = setInterval(loadWeight, 500);

//     return () => {
//       isPollingRef.current = false;
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   // TARE / ZERO

//   const handleTare = async () => {
//     try {
//       setLoading(true);

//       await API.post("/api/weight/tare");

//       // Save current weight as tare
//       setTareWeight(weight);

//       Alert.alert("Success", "Scale tared successfully");
//     } catch {
//       //  Alert.alert("Error", "Weighing machine not connected");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Milk Weighing Machine</Text>

//       {/* WEIGHT DISPLAY */}
//       <View style={styles.weightCard}>
//         <Text style={styles.label}> Weight</Text>
//         <Text style={styles.weightText}>{weight.toFixed(2)} kg</Text>

//         <Text
//           style={[styles.status, { color: stable ? "#16a34a" : "#dc2626" }]}
//         >
//           {stable ? "STABLE" : "MEASURING..."}
//         </Text>
//       </View>

//       {/* BUTTON */}
//       <TouchableOpacity
//         style={[
//           styles.button,
//           { backgroundColor: stable ? "#2563eb" : "#9ca3af" },
//         ]}
//         onPress={handleTare}
//         disabled={!stable || loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>TARE / ZERO</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f6f8",
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   weightCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 24,
//     alignItems: "center",
//     elevation: 4,
//     marginBottom: 30,
//   },
//   label: {
//     fontSize: 14,
//     color: "#6b7280",
//   },
//   weightText: {
//     fontSize: 36,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 10,
//   },
//   netWeightText: {
//     fontSize: 42,
//     fontWeight: "800",
//     color: "#16a34a",
//     marginBottom: 10,
//   },
//   status: {
//     fontSize: 14,
//     fontWeight: "700",
//     marginTop: 8,
//   },
//   button: {
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
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
  ActivityIndicator,
  Alert,
} from "react-native";

import { readLoadCell, tareLoadCell } from "../../api/loadCell";
import { requireWifi } from "@/src/network/wifiOnly";

export default function WeighingMachineScreen() {
  const [weight, setWeight] = useState<number>(0);
  const [stable, setStable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wifiOk, setWifiOk] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // =========================
  // LOAD WEIGHT (Wi-Fi ONLY)
  // =========================
  const loadWeight = async () => {
    const wifi = await requireWifi();

    if (!wifi) {
      setWifiOk(false);
      setStable(false);
      return;
    }

    setWifiOk(true);

    try {
      const data = await readLoadCell();
      setWeight(data.weight);
      setStable(data.stable);
    } catch {
      setStable(false);
    }
  };

  // =========================
  // AUTO REFRESH (500ms)
  // =========================
  useEffect(() => {
    loadWeight();
    intervalRef.current = setInterval(loadWeight, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // =========================
  // TARE (Wi-Fi ONLY)
  // =========================
  const handleTare = async () => {
    const wifi = await requireWifi();

    // if (!wifi) {
    //   Alert.alert(
    //     "Wi-Fi Required",
    //     "Please connect to the weighing machine Wi-Fi network."
    //   );
    //   return;
    // }

    try {
      setLoading(true);
      await tareLoadCell();
      Alert.alert("Success", "Scale tared successfully");
    } catch {
      Alert.alert("Error", "Weighing machine not connected");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Milk Weighing Machine</Text>

      {!wifiOk && (
        <Text style={styles.wifiError}>
          ⚠ Please connect to weighing machine Wi-Fi
        </Text>
      )}

      <View style={styles.weightCard}>
        <Text style={styles.label}>Weight</Text>
        <Text style={styles.weightText}>{weight.toFixed(2)} kg</Text>

        <Text
          style={[styles.status, { color: stable ? "#16a34a" : "#dc2626" }]}
        >
          {stable ? "STABLE" : "MEASURING..."}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: stable ? "#2563eb" : "#9ca3af" },
        ]}
        onPress={handleTare}
        disabled={!stable || loading || !wifiOk}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>TARE / ZERO</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  weightCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 4,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
  },
  weightText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  netWeightText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#16a34a",
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  wifiError: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "#fee2e2",
    padding: 10,
    borderRadius: 8,
  },
});
