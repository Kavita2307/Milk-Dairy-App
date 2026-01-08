// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import NetInfo from "@react-native-community/netinfo";
// import { API } from "../../api/api";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { readLoadCell } from "../../api/loadCell";

// export default function LeftoverScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { groupId, userId, groupTitle } = route.params;

//   const [weight, setWeight] = useState("0");
//   const [useLoadCell, setUseLoadCell] = useState(false);
//   const [isStable, setIsStable] = useState(false);

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const isFetchingRef = useRef(false);

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
//   const fetchFromLoadCell = async () => {
//     if (isFetchingRef.current) return;

//     const networkOk = await checkNetwork();
//     if (!networkOk) {
//       Alert.alert(
//         "Network Required",
//         "Please turn ON both Wi-Fi and Mobile Data"
//       );
//       return;
//     }

//     isFetchingRef.current = true;
//     setIsStable(false);

//     intervalRef.current = setInterval(async () => {
//       try {
//         const data: any = await readLoadCell();
//         const kg = Number(data.weight);

//         if (isNaN(kg)) return;

//         setWeight(kg.toFixed(2));

//         if (data.stable) {
//           setIsStable(true);
//           clearInterval(intervalRef.current!);
//           intervalRef.current = null;
//           isFetchingRef.current = false;
//         }
//       } catch {
//         stopWithError();
//       }
//     }, 500);
//   };

//   const stopWithError = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     isFetchingRef.current = false;
//     Alert.alert("Error", "Weighing machine not connected");
//   };

//   /* =============================
//      SAVE LEFTOVER
//      ============================= */
//   const saveLeftover = async () => {
//     if (useLoadCell && !isStable) {
//       Alert.alert("Wait", "Please wait until weight is stable");
//       return;
//     }

//     const kg = Number(weight);
//     if (kg <= 0) {
//       Alert.alert("Invalid", "Please enter valid weight");
//       return;
//     }

//     try {
//       await API.post("/leftover", {
//         groupId,
//         leftoverKg: kg,
//         userId,
//       });

//       Alert.alert("Success", "Saved successfully");
//       setWeight("0");
//       nav.goBack();
//     } catch {
//       Alert.alert("Error", "Error saving leftover");
//     }
//   };

//   /* =============================
//      CLEANUP
//      ============================= */
//   useEffect(() => {
//     nav.setOptions({ title: groupTitle });

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [groupTitle, nav]);

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "android" ? "padding" : "padding"}
//     >
//       <View style={styles.container}>
//         <Text style={styles.subTitle}>Get weight from wagon</Text>

//         {/* SWITCH */}
//         <TouchableOpacity
//           onPress={() => {
//             setUseLoadCell(!useLoadCell);
//             setWeight("0");
//             setIsStable(false);
//           }}
//           style={styles.switchBtn}
//         >
//           <Text style={styles.switchBtnText}>
//             {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
//           </Text>
//         </TouchableOpacity>

//         {/* LOAD CELL MODE */}
//         {useLoadCell ? (
//           <View style={styles.box}>
//             <Text style={styles.label}>Partial Tara, Weight:</Text>

//             <View style={styles.displayBox}>
//               <Text style={styles.displayText}>{weight} kg</Text>
//               <Text style={styles.hintText}>
//                 {isStable ? "STABLE" : "UNSTABLE"}
//               </Text>
//             </View>

//             <TouchableOpacity
//               onPress={fetchFromLoadCell}
//               style={styles.fetchBtn}
//             >
//               <Text style={styles.fetchBtnText}>Get Weight</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           /* MANUAL MODE */
//           <View style={styles.box}>
//             <Text style={styles.label}>Enter Weight (kg)</Text>

//             <TextInput
//               style={styles.input}
//               value={weight}
//               onChangeText={setWeight}
//               keyboardType="numeric"
//               placeholder="Enter weight"
//             />

//             <TouchableOpacity
//               onPress={() => setWeight("0")}
//               style={styles.clearBtn}
//             >
//               <Text style={styles.clearBtnText}>Clear</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* SAVE */}
//         <TouchableOpacity
//           onPress={saveLeftover}
//           style={[styles.saveBtn, Number(weight) <= 0 && { opacity: 0.5 }]}
//           disabled={Number(weight) <= 0}
//         >
//           <Text style={styles.saveBtnText}>Save</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },

//   subTitle: {
//     textAlign: "center",
//     color: "#6B7280",
//     marginBottom: 20,
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   switchBtn: {
//     backgroundColor: "#0EA5E9",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   switchBtnText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "700",
//   },

//   box: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     marginBottom: 20,
//   },

//   label: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: 10,
//   },

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

//   clearBtn: {
//     marginTop: 12,
//     backgroundColor: "#EF4444",
//     padding: 12,
//     borderRadius: 10,
//   },
//   clearBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

//   displayBox: {
//     padding: 20,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 12,
//     marginBottom: 15,
//     alignItems: "center",
//   },

//   displayText: {
//     fontSize: 36,
//     fontWeight: "700",
//   },

//   hintText: {
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#2563EB",
//   },

//   fetchBtn: {
//     backgroundColor: "#10B981",
//     padding: 12,
//     borderRadius: 10,
//   },
//   fetchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

//   saveBtn: {
//     backgroundColor: "#2563EB",
//     padding: 15,
//     borderRadius: 10,
//   },
//   saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },
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
import { useAuth } from "../../context/AuthContext";

const { DualNetworking } = NativeModules;

// =========================
// ESP CONFIG (FROM TESTSCREEN)
// =========================
const ESP_WIFI_SSID = "EDMILK";
const ESP_WIFI_PASS = "12345678";
const ESP_API_URL = "http://192.168.4.1/api/weight";

export default function LeftoverScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId, groupTitle } = route.params;

  const token = useAuth();

  const [weight, setWeight] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);
  const [isStable, setIsStable] = useState(false);
  const [status, setStatus] = useState("");

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    } catch (e) {
      setStatus("CONNECTION FAILED");
      setTimeout(connectToEsp, 3000);
    }
  };

  // =========================
  // POLLING (TESTSCREEN)
  // =========================
  const startPolling = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);

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

      setWeight(kg.toFixed(2));
      setIsStable(kg > 0);
      setStatus(kg > 0 ? "STABLE" : "MEASURING...");
    } catch {
      setStatus("READ ERROR");
      setIsStable(false);
    }
  };

  // =========================
  // SAVE LEFTOVER (API.POST)
  // =========================
  const saveLeftover = async () => {
    if (token == null) {
      Alert.alert("Error", "User not authenticated");
      return;
    }
    if (useLoadCell && !isStable) {
      Alert.alert("Wait", "Please wait until weight is stable");
      return;
    }

    const kg = Number(weight);
    if (kg <= 0) {
      Alert.alert("Invalid", "Please enter valid weight");
      return;
    }

    try {
      await API.post("/leftover", {
        groupId,
        leftoverKg: kg,
        userId,
      });

      Alert.alert("Success", "Saved successfully");
      setWeight("0");
      setIsStable(false);
      nav.goBack();
    } catch {
      Alert.alert("Error", "Error saving leftover");
    }
  };

  // =========================
  // NAV TITLE
  // =========================
  useEffect(() => {
    nav.setOptions({ title: groupTitle });
    return stopPolling;
  }, [groupTitle]);

  // =========================
  // UI (UNCHANGED MANUAL FLOW)
  // =========================
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      <View style={styles.container}>
        <Text style={styles.subTitle}>Get weight from wagon</Text>

        {/* SWITCH */}
        <TouchableOpacity
          onPress={() => {
            setUseLoadCell(!useLoadCell);
            setWeight("0");
            setIsStable(false);
          }}
          style={styles.switchBtn}
        >
          <Text style={styles.switchBtnText}>
            {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
          </Text>
        </TouchableOpacity>

        {/* LOAD CELL MODE */}
        {useLoadCell ? (
          <View style={styles.box}>
            <Text style={styles.label}>Partial Tara, Weight:</Text>

            <View style={styles.displayBox}>
              <Text style={styles.displayText}>{weight} kg</Text>
              <Text style={styles.hintText}>
                {isStable ? "STABLE" : status || "MEASURING"}
              </Text>
            </View>
          </View>
        ) : (
          /* MANUAL MODE (UNCHANGED) */
          <View style={styles.box}>
            <Text style={styles.label}>Enter Weight (kg)</Text>

            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="Enter weight"
            />

            <TouchableOpacity
              onPress={() => setWeight("0")}
              style={styles.clearBtn}
            >
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SAVE */}
        <TouchableOpacity
          onPress={saveLeftover}
          style={[styles.saveBtn, Number(weight) <= 0 && { opacity: 0.5 }]}
          disabled={Number(weight) <= 0}
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
    color: "#6B7280",
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "600",
  },

  switchBtn: {
    backgroundColor: "#0EA5E9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  switchBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },

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

  clearBtn: {
    marginTop: 12,
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 10,
  },
  clearBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  displayBox: {
    padding: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  displayText: {
    fontSize: 36,
    fontWeight: "700",
  },

  hintText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },
  saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },
});
