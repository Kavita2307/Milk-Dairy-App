// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// import { useNavigation, useRoute } from "@react-navigation/native";

// import { readLoadCell } from "../../api/loadCell";
// import api from "../../api/api";

// import { resolveNetwork } from "../../network/NetworkManager";
// import { SCREEN_NETWORK_MAP } from "../../network/ScreenNetworkMap";
// import { saveAndQueue } from "../../network/offlineQueue";

// export default function LeftoverScreen() {
//   const SCREEN_NAME = "LeftoverScreen";

//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { groupId, userId, groupTitle } = route.params;

//   const [weight, setWeight] = useState("0");
//   const [useLoadCell, setUseLoadCell] = useState(false);

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const loadCellErrorShown = useRef(false);
//   const isFetchingRef = useRef(false);

//   // =========================
//   // LOAD CELL HELPERS
//   // =========================
//   const readLoadCellWithTimeout = (timeout = 2000) => {
//     return Promise.race([
//       readLoadCell(),
//       new Promise((_, reject) =>
//         setTimeout(() => reject(new Error("timeout")), timeout)
//       ),
//     ]);
//   };

//   const stopWithError = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     isFetchingRef.current = false;

//     if (!loadCellErrorShown.current) {
//       loadCellErrorShown.current = true;
//       alert("Weighing machine not connected");
//     }
//   };

//   const fetchFromLoadCell = async () => {
//     if (isFetchingRef.current) return;

//     isFetchingRef.current = true;
//     loadCellErrorShown.current = false;

//     const readOnce = async () => {
//       const data: any = await readLoadCellWithTimeout();
//       setWeight(data.weight.toFixed(2));
//       return data;
//     };

//     try {
//       const data = await readOnce();

//       if (data.stable) {
//         isFetchingRef.current = false;
//         return;
//       }

//       intervalRef.current = setInterval(async () => {
//         try {
//           const d = await readOnce();
//           if (d.stable) {
//             clearInterval(intervalRef.current!);
//             intervalRef.current = null;
//             isFetchingRef.current = false;
//           }
//         } catch {
//           stopWithError();
//         }
//       }, 500);
//     } catch {
//       stopWithError();
//     }
//   };

//   // =========================
//   // SAVE LEFTOVER (OFFLINE SAFE)
//   // =========================
//   const saveLeftover = async () => {
//     if (Number(weight) <= 0) {
//       alert("Please enter valid leftover quantity");
//       return;
//     }

//     const payload = {
//       groupId,
//       leftoverKg: Number(weight),
//       userId,
//     };

//     // 1️⃣ Save locally first
//     await saveAndQueue({
//       endpoint: "/leftover",
//       payload,
//     });

//     // 2️⃣ Check network preference (Wi-Fi first)
//     const policy = SCREEN_NETWORK_MAP[SCREEN_NAME];
//     const decision = await resolveNetwork(policy);

//     if (!decision.canSend) {
//       alert("Saved offline. Will sync when network is available.");
//       setWeight("0");
//       return;
//     }

//     // 3️⃣ Try sending now
//     try {
//       await api.send({
//         endpoint: "/leftover",
//         payload,
//       });

//       alert("Saved successfully");
//       setWeight("0");
//     } catch {
//       alert("Saved offline. Will sync automatically.");
//     }
//   };

//   // =========================
//   // NAV TITLE
//   // =========================
//   useEffect(() => {
//     nav.setOptions({ title: groupTitle });

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [groupTitle, nav]);

//   // =========================
//   // UI
//   // =========================
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "android" ? "padding" : "padding"}
//     >
//       <View style={styles.container}>
//         <Text style={styles.subTitle}>Get weight from wagon</Text>

//         <TouchableOpacity
//           onPress={() => setUseLoadCell(!useLoadCell)}
//           style={styles.switchBtn}
//         >
//           <Text style={styles.switchBtnText}>
//             {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
//           </Text>
//         </TouchableOpacity>

//         {useLoadCell ? (
//           <View style={styles.box}>
//             <Text style={styles.label}>Partial Tara, Weight:</Text>

//             <View style={styles.displayBox}>
//               <Text style={styles.displayText}>{weight} kg</Text>
//             </View>

//             <TouchableOpacity
//               onPress={fetchFromLoadCell}
//               style={styles.fetchBtn}
//             >
//               <Text style={styles.fetchBtnText}>Get Weight</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.box}>
//             <Text style={styles.label}>Enter Weight (kg)</Text>

//             <TextInput
//               style={styles.input}
//               value={weight}
//               onChangeText={setWeight}
//               keyboardType="numeric"
//             />

//             <TouchableOpacity
//               onPress={() => setWeight("0")}
//               style={styles.clearBtn}
//             >
//               <Text style={styles.clearBtnText}>Clear</Text>
//             </TouchableOpacity>
//           </View>
//         )}

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

// // =========================
// // STYLES
// // =========================
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
//   switchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
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
//   displayText: { fontSize: 36, fontWeight: "700" },
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
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { API } from "../../api/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { readLoadCell } from "../../api/loadCell";

export default function LeftoverScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId, groupTitle } = route.params;

  const [weight, setWeight] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);
  const [isStable, setIsStable] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false);

  /* =============================
     NETWORK CHECK (ANDROID LOGIC)
     ============================= */
  const checkNetwork = async () => {
    const state = await NetInfo.fetch();

    const wifiOn = state.type === "wifi" && state.isConnected;
    const mobileOn =
      state.isConnected &&
      state.details &&
      "cellularGeneration" in state.details;

    return wifiOn && mobileOn;
  };

  /* =============================
     LOAD CELL POLLING
     ============================= */
  const fetchFromLoadCell = async () => {
    if (isFetchingRef.current) return;

    const networkOk = await checkNetwork();
    if (!networkOk) {
      Alert.alert(
        "Network Required",
        "Please turn ON both Wi-Fi and Mobile Data"
      );
      return;
    }

    isFetchingRef.current = true;
    setIsStable(false);

    intervalRef.current = setInterval(async () => {
      try {
        const data: any = await readLoadCell();
        const kg = Number(data.weight);

        if (isNaN(kg)) return;

        setWeight(kg.toFixed(2));

        if (data.stable) {
          setIsStable(true);
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          isFetchingRef.current = false;
        }
      } catch {
        stopWithError();
      }
    }, 500);
  };

  const stopWithError = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isFetchingRef.current = false;
    Alert.alert("Error", "Weighing machine not connected");
  };

  /* =============================
     SAVE LEFTOVER
     ============================= */
  const saveLeftover = async () => {
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
      nav.goBack();
    } catch {
      Alert.alert("Error", "Error saving leftover");
    }
  };

  /* =============================
     CLEANUP
     ============================= */
  useEffect(() => {
    nav.setOptions({ title: groupTitle });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [groupTitle, nav]);

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
                {isStable ? "STABLE" : "UNSTABLE"}
              </Text>
            </View>

            <TouchableOpacity
              onPress={fetchFromLoadCell}
              style={styles.fetchBtn}
            >
              <Text style={styles.fetchBtnText}>Get Weight</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* MANUAL MODE */
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

  fetchBtn: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 10,
  },
  fetchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },
  saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },
});
