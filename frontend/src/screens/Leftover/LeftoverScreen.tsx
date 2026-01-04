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
// import { API } from "../../api/api";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { readLoadCell } from "../../api/loadCell";

// export default function LeftoverScreen() {
//   const nav = useNavigation<any>();

//   const route = useRoute<any>();
//   const { groupId, userId, groupTitle } = route.params;
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const [weight, setWeight] = useState("0");
//   const [useLoadCell, setUseLoadCell] = useState(false);
//   const loadCellErrorShown = useRef(false);
//   const isFetchingRef = useRef(false);

//   const readLoadCellWithTimeout = (timeout = 2000) => {
//     return Promise.race([
//       readLoadCell(),
//       new Promise((_, reject) =>
//         setTimeout(() => reject(new Error("timeout")), timeout)
//       ),
//     ]);
//   };

//   useEffect(() => {
//     nav.setOptions({
//       title: groupTitle,
//     });
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [groupTitle, nav]);

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
//       // First immediate read
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

//   // const fetchFromLoadCell = async () => {
//   //   if (intervalRef.current) return;
//   //   loadCellErrorShown.current = false;
//   //   try {
//   //     const data: any = await readLoadCellWithTimeout();

//   //     setWeight(data.weight.toFixed(2));
//   //   } catch {
//   //     if (!loadCellErrorShown.current) {
//   //       loadCellErrorShown.current = true;
//   //       alert("Weighing machine not connected");
//   //     }
//   //     return; // DO NOT START INTERVAL
//   //   }
//   //   intervalRef.current = setInterval(async () => {
//   //     try {
//   //       const data: any = await readLoadCellWithTimeout();

//   //       setWeight(data.weight.toFixed(2));

//   //       if (data.stable) {
//   //         clearInterval(intervalRef.current!);
//   //         intervalRef.current = null;
//   //       }
//   //     } catch {
//   //       clearInterval(intervalRef.current!);
//   //       intervalRef.current = null;
//   //       if (!loadCellErrorShown.current) {
//   //         loadCellErrorShown.current = true;
//   //         alert("Weighing machine not connected");
//   //       }
//   //     }
//   //   }, 500);
//   // };

//   const saveLeftover = () => {
//     if (Number(weight) <= 0) {
//       alert("Please enter valid milk quantity");
//       return;
//     }
//     API.post("/leftover", {
//       groupId,
//       leftoverKg: Number(weight),
//       userId,
//     })
//       .then(() => {
//         alert("Saved successfully");
//         setWeight("0");
//       })
//       .catch(() => alert("Error saving leftover"));
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "android" ? "padding" : "padding"}
//     >
//       {" "}
//       <View style={styles.container}>
//         <Text style={styles.subTitle}>Get weight from wagon</Text>

//         {/* Switch Button */}
//         <TouchableOpacity
//           onPress={() => setUseLoadCell(!useLoadCell)}
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
//             </View>

//             <TouchableOpacity
//               onPress={fetchFromLoadCell}
//               style={styles.fetchBtn}
//             >
//               <Text style={styles.fetchBtnText}>Get Weight</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           /* MANUAL ENTRY MODE */
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
} from "react-native";
import { API } from "../../api/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { readLoadCell } from "../../api/loadCell";
import NetInfo from "@react-native-community/netinfo";
import {
  addToQueue,
  clearQueue,
  getQueue,
} from "../../components/offlineQueue";

export default function LeftoverScreen() {
  const nav = useNavigation<any>();

  const route = useRoute<any>();
  const { groupId, userId, groupTitle } = route.params;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [weight, setWeight] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);
  const loadCellErrorShown = useRef(false);
  const isFetchingRef = useRef(false);

  const readLoadCellWithTimeout = (timeout = 2000) => {
    return Promise.race([
      readLoadCell(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      ),
    ]);
  };

  useEffect(() => {
    nav.setOptions({
      title: groupTitle,
    });
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [groupTitle, nav]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      (state: { isConnected: any; isInternetReachable: any }) => {
        if (state.isConnected && state.isInternetReachable) {
          syncOfflineData();
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const syncOfflineData = async () => {
    const queue = await getQueue();

    if (queue.length === 0) return;

    for (const item of queue) {
      try {
        await API.post("/leftover", item);
      } catch {
        // ❌ Stop sync if any request fails
        return;
      }
    }

    await clearQueue();
    // alert("Offline data synced successfully");
  };

  const fetchFromLoadCell = async () => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    loadCellErrorShown.current = false;

    const readOnce = async () => {
      const data: any = await readLoadCellWithTimeout();
      setWeight(data.weight.toFixed(2));
      return data;
    };

    try {
      // First immediate read
      const data = await readOnce();

      if (data.stable) {
        isFetchingRef.current = false;
        return;
      }

      intervalRef.current = setInterval(async () => {
        try {
          const d = await readOnce();

          if (d.stable) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            isFetchingRef.current = false;
          }
        } catch {
          stopWithError();
        }
      }, 500);
    } catch {
      stopWithError();
    }
  };

  const stopWithError = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isFetchingRef.current = false;

    if (!loadCellErrorShown.current) {
      loadCellErrorShown.current = true;
      alert("Weighing machine not connected");
    }
  };

  // const fetchFromLoadCell = async () => {
  //   if (intervalRef.current) return;
  //   loadCellErrorShown.current = false;
  //   try {
  //     const data: any = await readLoadCellWithTimeout();

  //     setWeight(data.weight.toFixed(2));
  //   } catch {
  //     if (!loadCellErrorShown.current) {
  //       loadCellErrorShown.current = true;
  //       alert("Weighing machine not connected");
  //     }
  //     return; // DO NOT START INTERVAL
  //   }
  //   intervalRef.current = setInterval(async () => {
  //     try {
  //       const data: any = await readLoadCellWithTimeout();

  //       setWeight(data.weight.toFixed(2));

  //       if (data.stable) {
  //         clearInterval(intervalRef.current!);
  //         intervalRef.current = null;
  //       }
  //     } catch {
  //       clearInterval(intervalRef.current!);
  //       intervalRef.current = null;
  //       if (!loadCellErrorShown.current) {
  //         loadCellErrorShown.current = true;
  //         alert("Weighing machine not connected");
  //       }
  //     }
  //   }, 500);
  // };

  // const saveLeftover = () => {
  //   if (Number(weight) <= 0) {
  //     alert("Please enter valid leftover quantity");
  //     return;
  //   }
  //   API.post("/leftover", {
  //     groupId,
  //     leftoverKg: Number(weight),
  //     userId,
  //   })
  //     .then(() => {
  //       alert("Saved successfully");
  //       setWeight("0");
  //     })
  //     .catch(() => alert("Error saving leftover"));
  // };

  const saveLeftover = async () => {
    if (Number(weight) <= 0) {
      alert("Please enter valid leftover quantity");
      return;
    }

    const payload = {
      groupId,
      leftoverKg: Number(weight),
      userId,
      createdAt: new Date().toISOString(),
    };

    const net = await NetInfo.fetch();

    if (!net.isConnected || !net.isInternetReachable) {
      // NO INTERNET → SAVE LOCALLY
      await addToQueue(payload);
      alert("Saved locally. Will sync when internet is available.");
      setWeight("0");
      return;
    }

    // INTERNET AVAILABLE → SAVE DIRECTLY
    API.post("/leftover", payload)
      .then(() => {
        alert("Saved successfully");
        setWeight("0");
      })
      .catch(async () => {
        // fallback safety
        await addToQueue(payload);
        alert("Saved locally. Will sync later.");
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      {" "}
      <View style={styles.container}>
        <Text style={styles.subTitle}>Get weight from wagon</Text>

        {/* Switch Button */}
        <TouchableOpacity
          onPress={() => setUseLoadCell(!useLoadCell)}
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
            </View>

            <TouchableOpacity
              onPress={fetchFromLoadCell}
              style={styles.fetchBtn}
            >
              <Text style={styles.fetchBtnText}>Get Weight</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* MANUAL ENTRY MODE */
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
