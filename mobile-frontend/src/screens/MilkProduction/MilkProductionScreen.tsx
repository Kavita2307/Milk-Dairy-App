// import React, { useState, useEffect, useRef } from "react";
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
// import { saveAndQueue } from "../../network/offlineQueue";
// import { SCREEN_NETWORK_MAP } from "../../network/ScreenNetworkMap";

// export default function MilkProductionScreen() {
//   const SCREEN_NAME = "MilkProductionScreen";

//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { groupId, userId, shift, animalNumber } = route.params;

//   const [milkKg, setMilkKg] = useState("0");
//   const [milkLit, setMilkLit] = useState("0");
//   const [useLoadCell, setUseLoadCell] = useState(false);

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const loadCellErrorShown = useRef(false);
//   const isFetchingRef = useRef(false);
//   const [weight, setWeight] = useState<number>(0);
//   const [stable, setStable] = useState<boolean>(false);
//   const [loadingWeight, setLoadingWeight] = useState<boolean>(false);
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

//   const fetchMilkFromLoadCell = async () => {
//     if (isFetchingRef.current) return;

//     isFetchingRef.current = true;
//     loadCellErrorShown.current = false;

//     const readOnce = async () => {
//       const data: any = await readLoadCellWithTimeout();
//       const kg = Number(data.weight.toFixed(2));
//       const litres = Number((kg / 1.03).toFixed(2));

//       setMilkKg(kg.toString());
//       setMilkLit(litres.toString());
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
//   // SAVE MILK (OFFLINE SAFE)
//   // =========================
//   const saveMilk = async () => {
//     if (Number(milkLit) <= 0) {
//       alert("Please enter valid milk quantity");
//       return;
//     }

//     const payload = {
//       groupId,
//       milkLit: Number(milkLit),
//       shift,
//       animalNumber,
//       userId,
//     };

//     // 1️⃣ Always save to offline queue first
//     await saveAndQueue({
//       endpoint: "/milk",
//       payload,
//     });

//     // 2️⃣ Check network preference (Wi-Fi first)
//     const policy = SCREEN_NETWORK_MAP[SCREEN_NAME];
//     const decision = await resolveNetwork(policy);

//     if (!decision.canSend) {
//       alert("Saved offline. Will sync when network is available.");
//       return;
//     }

//     // 3️⃣ Try sending now
//     try {
//       await api.send({
//         endpoint: "/milk",
//         payload,
//       });

//       alert("Milk Saved Successfully");
//       setMilkLit("0");
//       setMilkKg("0");
//     } catch {
//       alert("Saved offline. Will sync automatically.");
//     }
//   };

//   // =========================
//   // NAV TITLE
//   // =========================
//   useEffect(() => {
//     nav.setOptions({
//       title: `${shift}: Animal #${animalNumber}`,
//     });

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [animalNumber, nav, shift]);

//   // =========================
//   // UI
//   // =========================
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "android" ? "padding" : "padding"}
//     >
//       <View style={styles.container}>
//         <Text style={styles.subTitle}>Enter milk production</Text>

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
//             <Text style={styles.label}>Load Cell Reading:</Text>

//             <View style={styles.displayBox}>
//               <Text style={styles.displayLabel}>Weight</Text>
//               <Text style={styles.displayText}>{milkKg} kg</Text>
//             </View>

//             <View style={[styles.displayBox, { marginTop: 10 }]}>
//               <Text style={styles.displayLabel}>Milk (Converted)</Text>
//               <Text style={styles.displayText}>{milkLit} L</Text>
//             </View>

//             <TouchableOpacity
//               onPress={fetchMilkFromLoadCell}
//               style={styles.fetchBtn}
//             >
//               <Text style={styles.fetchBtnText}>Get Milk Weight</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.box}>
//             <Text style={styles.label}>Enter Milk (Litres)</Text>

//             <TextInput
//               style={styles.input}
//               value={milkLit}
//               onChangeText={setMilkLit}
//               keyboardType="numeric"
//             />

//             <TouchableOpacity
//               onPress={() => setMilkLit("0")}
//               style={styles.clearBtn}
//             >
//               <Text style={styles.clearBtnText}>Clear</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <TouchableOpacity
//           onPress={saveMilk}
//           style={[styles.saveBtn, Number(milkLit) <= 0 && { opacity: 0.5 }]}
//           disabled={Number(milkLit) <= 0}
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
//   clearBtn: {
//     marginTop: 12,
//     backgroundColor: "#EF4444",
//     padding: 12,
//     borderRadius: 10,
//   },
//   clearBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
//   saveBtn: {
//     backgroundColor: "#2563EB",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },
// });
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { readLoadCell } from "../../api/loadCell";
import api from "../../api/api";

import { resolveNetwork } from "../../network/NetworkManager";
import { saveAndQueue } from "../../network/offlineQueue";
import { SCREEN_NETWORK_MAP } from "../../network/ScreenNetworkMap";

export default function MilkProductionScreen() {
  const SCREEN_NAME = "MilkProductionScreen";

  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId, shift, animalNumber } = route.params;

  // =========================
  // STATE
  // =========================
  const [milkKg, setMilkKg] = useState("0");
  const [milkLit, setMilkLit] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false);
  const errorShownRef = useRef(false);

  // =========================
  // LOAD CELL (ANDROID STYLE)
  // =========================
  const readWithTimeout = (timeout = 2000) =>
    Promise.race([
      readLoadCell(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      ),
    ]);

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPollingRef.current = false;
  };

  const startPollingLoadCell = async () => {
    if (isPollingRef.current) return;
    isPollingRef.current = true;

    try {
      const readOnce = async () => {
        const data: any = await readWithTimeout();
        const kg = Number(data.weight.toFixed(2));
        const litres = Number((kg / 1.03).toFixed(2));

        setMilkKg(kg.toString());
        setMilkLit(litres.toString());

        return data;
      };

      const first = await readOnce();
      if (first.stable) {
        stopPolling();
        return;
      }

      intervalRef.current = setInterval(async () => {
        try {
          const d = await readOnce();
          if (d.stable) stopPolling();
        } catch {
          stopPolling();
          if (!errorShownRef.current) {
            errorShownRef.current = true;
            alert("Weighing machine not connected (Wi-Fi required)");
          }
        }
      }, 500);
    } catch {
      stopPolling();
      if (!errorShownRef.current) {
        errorShownRef.current = true;
        alert("Weighing machine not connected (Wi-Fi required)");
      }
    }
  };

  // =========================
  // AUTO START / STOP LOAD CELL
  // =========================
  useEffect(() => {
    if (useLoadCell) {
      errorShownRef.current = false;
      startPollingLoadCell();
    } else {
      stopPolling();
    }

    return stopPolling;
  }, [useLoadCell]);

  // =========================
  // SAVE MILK (UNCHANGED)
  // =========================
  const saveMilk = async () => {
    if (Number(milkLit) <= 0) {
      alert("Please enter valid milk quantity");
      return;
    }

    const payload = {
      groupId,
      milkLit: Number(milkLit),
      shift,
      animalNumber,
      userId,
    };

    // 1️⃣ Save offline first (UNCHANGED)
    await saveAndQueue({
      endpoint: "/milk",
      payload,
    });

    // 2️⃣ Network decision (UNCHANGED)
    const policy = SCREEN_NETWORK_MAP[SCREEN_NAME];
    const decision = await resolveNetwork(policy);

    if (!decision.canSend) {
      alert("Saved offline. Will sync when network is available.");
      return;
    }

    // 3️⃣ Send to backend (UNCHANGED)
    try {
      await api.send({
        endpoint: "/milk",
        payload,
      });

      alert("Milk Saved Successfully");
      setMilkKg("0");
      setMilkLit("0");
    } catch {
      alert("Saved offline. Will sync automatically.");
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
  }, [animalNumber, nav, shift]);

  // =========================
  // UI
  // =========================
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      <View style={styles.container}>
        <Text style={styles.subTitle}>Enter milk production</Text>

        <TouchableOpacity
          onPress={() => setUseLoadCell(!useLoadCell)}
          style={styles.switchBtn}
        >
          <Text style={styles.switchBtnText}>
            {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
          </Text>
        </TouchableOpacity>

        {useLoadCell ? (
          <View style={styles.box}>
            <Text style={styles.label}>Load Cell Reading</Text>

            <View style={styles.displayBox}>
              <Text style={styles.displayLabel}>Weight</Text>
              <Text style={styles.displayText}>{milkKg} kg</Text>
            </View>

            <View style={[styles.displayBox, { marginTop: 10 }]}>
              <Text style={styles.displayLabel}>Milk</Text>
              <Text style={styles.displayText}>{milkLit} L</Text>
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
// STYLES
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
  displayLabel: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },
});
