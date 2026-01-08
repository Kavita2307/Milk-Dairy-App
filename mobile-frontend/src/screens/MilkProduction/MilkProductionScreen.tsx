// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Keyboard,
//   Alert,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import NetInfo from "@react-native-community/netinfo";
// import { API } from "../../api/api";
// import { readLoadCell } from "../../api/loadCell";

// export default function MilkProductionScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { groupId, userId, shift, animalNumber } = route.params;

//   const [milkKg, setMilkKg] = useState("0");
//   const [milkLit, setMilkLit] = useState("0");
//   const [useLoadCell, setUseLoadCell] = useState(false);
//   const [isStable, setIsStable] = useState(false);

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const MILK_DENSITY = 1.03;

//   const kgToLitres = (kg: number) => Number((kg / MILK_DENSITY).toFixed(2));

//   /* =============================
//      NETWORK CHECK (ANDROID LOGIC)
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
//      LOAD CELL POLLING
//      ============================= */
//   const fetchMilkFromLoadCell = async () => {
//     const networkOk = await checkNetwork();

//     if (!networkOk) {
//       Alert.alert(
//         "Network Required",
//         "Please turn ON both Wi-Fi and Mobile Data"
//       );
//       return;
//     }

//     if (intervalRef.current) return;

//     setIsStable(false);

//     intervalRef.current = setInterval(async () => {
//       try {
//         const data = await readLoadCell();

//         const weightKg = Number(data.weight);
//         if (isNaN(weightKg)) return;

//         setMilkKg(weightKg.toFixed(2));
//         setMilkLit(kgToLitres(weightKg).toString());

//         if (data.stable) {
//           setIsStable(true);
//           clearInterval(intervalRef.current!);
//           intervalRef.current = null;
//         }
//       } catch {
//         clearInterval(intervalRef.current!);
//         intervalRef.current = null;
//         Alert.alert("Error", "Weighing machine not connected");
//       }
//     }, 500);
//   };

//   /* =============================
//      SAVE MILK
//      ============================= */
//   const saveMilk = async () => {
//     Keyboard.dismiss();

//     if (useLoadCell && !isStable) {
//       Alert.alert("Wait", "Please wait until weight is stable");
//       return;
//     }

//     const finalLitres = Number(milkLit);

//     if (finalLitres <= 0) {
//       Alert.alert("Invalid", "Milk must be greater than 0");
//       return;
//     }

//     try {
//       await API.post("/milk", {
//         groupId,
//         milkLit: finalLitres,
//         shift,
//         animalNumber,
//         userId: Number(userId),
//       });

//       Alert.alert("Success", "Milk saved successfully");
//       nav.goBack();
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Error saving milk data");
//     }
//   };

//   /* =============================
//      CLEANUP
//      ============================= */
//   useEffect(() => {
//     nav.setOptions({
//       title: `${shift}: Animal #${animalNumber}`,
//     });

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [animalNumber]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.subTitle}>Enter milk production</Text>

//       <TouchableOpacity
//         onPress={() => {
//           setUseLoadCell(!useLoadCell);
//           setMilkKg("0");
//           setMilkLit("0");
//           setIsStable(false);
//         }}
//         style={styles.switchBtn}
//       >
//         <Text style={styles.switchBtnText}>
//           {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
//         </Text>
//       </TouchableOpacity>

//       {useLoadCell ? (
//         <View style={styles.box}>
//           <Text style={styles.label}>Milk from Load Cell</Text>

//           <View style={styles.displayBox}>
//             <Text style={styles.displayText}>{milkKg} kg</Text>
//             <Text style={styles.litreText}>{milkLit} litres</Text>
//             <Text style={styles.hintText}>
//               {isStable ? "STABLE" : "UNSTABLE"}
//             </Text>
//           </View>

//           <TouchableOpacity
//             onPress={fetchMilkFromLoadCell}
//             style={styles.fetchBtn}
//           >
//             <Text style={styles.fetchBtnText}>Get Milk Weight</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.box}>
//           <Text style={styles.label}>Enter Milk (Litres)</Text>

//           <TextInput
//             style={styles.input}
//             value={milkLit}
//             onChangeText={setMilkLit}
//             keyboardType="numeric"
//           />
//         </View>
//       )}

//       <TouchableOpacity onPress={saveMilk} style={styles.saveBtn}>
//         <Text style={styles.saveBtnText}>Save</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // =========================
// // STYLES
// // =========================
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },
//   subTitle: {
//     textAlign: "center",
//     marginBottom: 20,
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1F2937",
//   },
//   switchBtn: {
//     backgroundColor: "#0EA5E9",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   switchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
//   box: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     marginBottom: 20,
//   },
//   label: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     padding: 14,
//     borderRadius: 10,
//     fontSize: 20,
//     fontWeight: "700",
//     textAlign: "center",
//     backgroundColor: "#F9FAFB",
//   },
//   displayBox: {
//     padding: 20,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   displayText: { fontSize: 36, fontWeight: "700" },
//   displayLabel: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
//   fetchBtn: {
//     backgroundColor: "#10B981",
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   fetchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
//   saveBtn: {
//     backgroundColor: "#2563EB",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },
//   litreText: { fontSize: 24, fontWeight: "600", marginTop: 10 },
//   hintText: { fontSize: 16, fontWeight: "600", marginTop: 6, color: "#555" },
// });
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  NativeModules,
  PermissionsAndroid,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";

const { DualNetworking } = NativeModules;

// =========================
// ESP CONFIG (FROM TESTSCREEN)
// =========================
const ESP_WIFI_SSID = "EDMILK";
const ESP_WIFI_PASS = "12345678";
const ESP_API_URL = "http://192.168.4.1/api/weight";

// Milk density constant
const MILK_DENSITY = 1.03;

export default function MilkProductionScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId, shift, animalNumber } = route.params;

  const [milkKg, setMilkKg] = useState("0");
  const [milkLit, setMilkLit] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);
  const [isStable, setIsStable] = useState(false);
  const [status, setStatus] = useState("");

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const kgToLitres = (kg: number) => Number((kg / MILK_DENSITY).toFixed(2));

  // =========================
  // CONNECT TO ESP (TESTSCREEN)
  // =========================
  useEffect(() => {
    if (!useLoadCell) {
      stopPolling();
      return;
    }

    const init = async () => {
      await requestPermissions();
      // Give a small delay for permissions to settle
      setTimeout(connectToEsp, 1000);
    };
    init();
    return stopPolling;
  }, [useLoadCell]);

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
      await DualNetworking.connectToDeviceWifi(ESP_WIFI_SSID, ESP_WIFI_PASS);
      setStatus("CONNECTED");
      startPolling();
    } catch {
      setStatus("CONNECTION FAILED");
      setTimeout(connectToEsp, 3000);
    }
  };

  // =========================
  // POLLING (TESTSCREEN)
  // =========================
  const startPolling = () => {
    if (pollingRef.current) return;
    pollingRef.current = setInterval(readWeight, 500);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const readWeight = async () => {
    try {
      const raw = await DualNetworking.fetchWeight(ESP_API_URL);

      let parsed = raw;

      if (typeof raw === "string") {
        const clean = raw.trim();
        if (clean.startsWith("{")) {
          const json = JSON.parse(clean);
          parsed = json.weight ?? json.value;
        }
      }

      const kg = Number(parsed);
      if (isNaN(kg)) return;

      const litres = kgToLitres(kg);

      setMilkKg(kg.toFixed(2));
      setMilkLit(litres.toString());
      setIsStable(kg > 0);
      setStatus(kg > 0 ? "STABLE" : "MEASURING...");
    } catch {
      setIsStable(false);
      setStatus("READ ERROR");
    }
  };

  // =========================
  // SAVE MILK (API.POST ONLY)
  // =========================
  const saveMilk = async () => {
    if (useLoadCell && !isStable) {
      Alert.alert("Wait", "Please wait until weight is stable");
      return;
    }

    const litres = Number(milkLit);
    if (litres <= 0) {
      Alert.alert("Invalid", "Milk must be greater than 0");
      return;
    }

    try {
      await API.post("/milk", {
        groupId,
        milkLit: litres,
        shift,
        animalNumber,
        userId,
      });

      Alert.alert("Success", "Milk saved successfully");
      setMilkKg("0");
      setMilkLit("0");
      setIsStable(false);
      nav.goBack();
    } catch {
      Alert.alert("Error", "Error saving milk data");
    }
  };

  // =========================
  // NAV TITLE
  // =========================
  useEffect(() => {
    nav.setOptions({
      title: `${shift}: Animal #${animalNumber}`,
    });
    return stopPolling;
  }, [animalNumber, shift]);

  // =========================
  // UI (MANUAL FLOW UNCHANGED)
  // =========================
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      <View style={styles.container}>
        <Text style={styles.subTitle}>Enter milk production</Text>

        <TouchableOpacity
          onPress={() => {
            setUseLoadCell(!useLoadCell);
            setMilkKg("0");
            setMilkLit("0");
            setIsStable(false);
          }}
          style={styles.switchBtn}
        >
          <Text style={styles.switchBtnText}>
            {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
          </Text>
        </TouchableOpacity>

        {useLoadCell ? (
          <View style={styles.box}>
            <Text style={styles.label}>Milk from Load Cell</Text>

            <View style={styles.displayBox}>
              <Text style={styles.displayText}>{milkKg} kg</Text>
              <Text style={styles.litreText}>{milkLit} litres</Text>
              <Text style={styles.hintText}>
                {isStable ? "STABLE" : status || "MEASURING"}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.box}>
            <Text style={styles.label}>Enter Milk (Litres)</Text>

            <TextInput
              style={styles.input}
              value={milkLit}
              onChangeText={setMilkLit}
              keyboardType="numeric"
              placeholder="Enter milk"
            />
          </View>
        )}

        <TouchableOpacity
          onPress={saveMilk}
          style={[styles.saveBtn, Number(milkLit) <= 0 && { opacity: 0.5 }]}
          disabled={Number(milkLit) <= 0}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// =========================
// STYLES (UNCHANGED)
// =========================
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },

  subTitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },

  switchBtn: {
    backgroundColor: "#0EA5E9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  switchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 20,
  },

  label: { fontSize: 18, fontWeight: "600", marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "#F9FAFB",
  },

  displayBox: {
    padding: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
  },

  displayText: { fontSize: 36, fontWeight: "700" },

  litreText: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
  },

  hintText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    color: "#2563EB",
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },
  saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },
});
