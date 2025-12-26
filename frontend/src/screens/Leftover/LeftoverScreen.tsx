// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Keyboard,
//   Animated,
// } from "react-native";
// import { API } from "../../api/api";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { readLoadCell } from "../../api/loadCell";

// export default function LeftoverScreen() {
//   const nav = useNavigation<any>();

//   const route = useRoute<any>();
//   const { groupId, userId, groupTitle } = route.params;
//   //const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const [weight, setWeight] = useState("0");
//   const [useLoadCell, setUseLoadCell] = useState(false);
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);
//   const slideAnim = new Animated.Value(100); // hidden initially
//   useEffect(() => {
//     nav.setOptions({
//       title: groupTitle,
//     });
//     const show = Keyboard.addListener("keyboardDidShow", (e) => {
//       setKeyboardVisible(true);
//       setKeyboardHeight(e.endCoordinates.height);

//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     });

//     const hide = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardVisible(false);

//       Animated.timing(slideAnim, {
//         toValue: 100,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();

//       setKeyboardHeight(0);
//     });

//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, [slideAnim, groupTitle]);
//   // const fetchFromLoadCell = () => {
//   //   if (intervalRef.current) return;

//   //   intervalRef.current = setInterval(async () => {
//   //     try {
//   //       const data = await readLoadCell();

//   //       setWeight(data.weight.toFixed(2));

//   //       if (data.stable) {
//   //         clearInterval(intervalRef.current!);
//   //         intervalRef.current = null;
//   //       }
//   //     } catch {
//   //       clearInterval(intervalRef.current!);
//   //       intervalRef.current = null;
//   //       alert("Weighing machine not connected");
//   //     }
//   //   }, 500);
//   // };

//   // const saveLeftover = () => {
//   //   Keyboard.dismiss();
//   //   if (intervalRef.current) {
//   //     clearInterval(intervalRef.current);
//   //     intervalRef.current = null;
//   //   }
//   //   API.post("/leftover", {
//   //     groupId,
//   //     leftoverKg: Number(weight),
//   //     userId,
//   //   })
//   //     .then(() => alert("Saved successfully"))
//   //     .catch(() => alert("Error saving leftover"));
//   // };
//   const saveLeftover = async () => {
//     Keyboard.dismiss();

//     try {
//       let finalWeight = Number(weight);

//       // Load cell mode → read ONCE
//       if (useLoadCell) {
//         const data = await readLoadCell();

//         // IMPORTANT: allow 0, reject only undefined / NaN
//         if (!data || data.weight === undefined || data.weight === null) {
//           alert("Weighing machine not connected");
//           return;
//         }

//         finalWeight = Number(data.weight);

//         if (isNaN(finalWeight)) {
//           alert("Invalid weight from load cell");
//           return;
//         }

//         finalWeight = Number(finalWeight.toFixed(2));
//         setWeight(finalWeight.toString());
//       }

//       // Prevent saving 0 or negative
//       if (finalWeight <= 0) {
//         alert("Weight must be greater than 0");
//         return;
//       }

//       console.log("Saving leftover:", {
//         groupId,
//         leftoverKg: finalWeight,
//         userId,
//       });

//       await API.post("/leftover", {
//         groupId,
//         leftoverKg: finalWeight,
//         userId,
//       });

//       alert("Saved successfully");
//     } catch (error) {
//       console.error("Save leftover error:", error);
//       alert("Error saving leftover");
//     }
//   };

//   return (
//     <>
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

//             {/* <TouchableOpacity
//               onPress={fetchFromLoadCell}
//               style={styles.fetchBtn}
//             >
//               <Text style={styles.fetchBtnText}>Get Weight</Text>
//             </TouchableOpacity> */}
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
//               // autoFocus={true} // Auto-open keyboard
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
//         <TouchableOpacity onPress={saveLeftover} style={styles.saveBtn}>
//           <Text style={styles.saveBtnText}>Save</Text>
//         </TouchableOpacity>

//         {/* <TouchableOpacity style={styles.reallocateBtn}>
//         <Text style={styles.reallocateText}>Reallocate</Text>
//       </TouchableOpacity> */}
//       </View>
//       {/* ---------- FLOATING RIGHT ARROW BUTTON ---------- */}
//       {keyboardVisible && (
//         <Animated.View
//           style={[
//             styles.arrowContainer,
//             {
//               bottom: keyboardHeight + 20, // <-- FIXED
//               transform: [{ translateY: slideAnim }],
//             },
//           ]}
//         >
//           <TouchableOpacity
//             style={styles.arrowButton}
//             onPress={() => Keyboard.dismiss()}
//           >
//             <Text style={styles.arrowText}>→</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       )}
//     </>
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
//   // ---------- FLOATING ARROW ----------
//   arrowContainer: {
//     position: "absolute",
//     right: 20,
//   },
//   arrowButton: {
//     backgroundColor: "#0EA5E9",
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 30,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   arrowText: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import { API } from "../../api/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { readLoadCell } from "../../api/loadCell";

export default function LeftoverScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId, groupTitle } = route.params;

  const [weight, setWeight] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const slideAnim = new Animated.Value(100);

  useEffect(() => {
    nav.setOptions({ title: groupTitle });

    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);

      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();

      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [groupTitle]);

  // ✅ SAVE LOGIC (MANUAL + LOAD CELL)
  const saveLeftover = async () => {
    Keyboard.dismiss();

    try {
      let finalWeight = Number(weight);

      if (useLoadCell) {
        const data = await readLoadCell();
        console.log("LOAD CELL DATA:", data);

        if (!data || data.weight === undefined || data.weight === null) {
          alert("Weighing machine not connected");
          return;
        }

        finalWeight = Number(data.weight);

        if (isNaN(finalWeight)) {
          alert("Invalid weight from load cell");
          return;
        }

        finalWeight = Number(finalWeight.toFixed(2));
        setWeight(finalWeight.toString());
      }

      if (finalWeight <= 0) {
        alert("Weight must be greater than 0");
        return;
      }

      console.log("SAVING:", {
        groupId,
        leftoverKg: finalWeight,
        userId: Number(userId),
      });

      const res = await API.post("/leftover", {
        groupId,
        leftoverKg: finalWeight,
        userId: Number(userId), // 🔥 IMPORTANT
      });

      console.log("SAVE RESPONSE:", res.data);
      alert("Saved successfully");
    } catch (error: any) {
      console.error("SAVE ERROR:", error?.response?.data || error);
      alert(error?.response?.data?.error || "Error saving leftover");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.subTitle}>Get weight from wagon</Text>

        {/* SWITCH MODE */}
        <TouchableOpacity
          onPress={() => {
            setUseLoadCell(!useLoadCell);
            setWeight("0");
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
            <Text style={styles.label}>Weight from Load Cell</Text>

            <View style={styles.displayBox}>
              <Text style={styles.displayText}>{weight} kg</Text>
            </View>

            <Text style={styles.hintText}>Press Save to capture weight</Text>
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
        <TouchableOpacity onPress={saveLeftover} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* FLOATING KEYBOARD DISMISS */}
      {keyboardVisible && (
        <Animated.View
          style={[
            styles.arrowContainer,
            {
              bottom: keyboardHeight + 20,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => Keyboard.dismiss()}
          >
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },

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
  clearBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  displayBox: {
    padding: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },

  displayText: {
    fontSize: 36,
    fontWeight: "700",
  },

  hintText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 6,
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },
  saveBtnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  arrowContainer: {
    position: "absolute",
    right: 20,
  },
  arrowButton: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 5,
  },
  arrowText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
});
