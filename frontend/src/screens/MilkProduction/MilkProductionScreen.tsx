// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Animated,
//   Keyboard,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { API } from "../../api/api";
// import { readLoadCell } from "../../api/loadCell";

// export default function MilkProductionScreen() {
//   const nav = useNavigation<any>();

//   const route = useRoute<any>();
//   const { groupId, userId, shift, animalNumber } = route.params;

//   const [milkLit, setMilkLit] = useState("0");
//   const [useLoadCell, setUseLoadCell] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);
//   const slideAnim = new Animated.Value(100); // hidden initially

//   useEffect(() => {
//     nav.setOptions({
//       title: `${shift}:Animal #${animalNumber}`,
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
//   }, [slideAnim, animalNumber]);

//   // const fetchMilkFromLoadCell = () => {
//   //   API.get("/milk/loadcell/read")
//   //     .then((res) => setMilkLit(String(res.data.weight)))
//   //     .catch(() => alert("Failed to read load cell"));
//   // };

//   // const fetchMilkFromLoadCell = async () => {
//   //   try {
//   //     const data = await readLoadCell();

//   //     // Only accept stable weight
//   //     if (!data.stable) {
//   //       alert("Milk is still measuring… Please wait");
//   //       return;
//   //     }

//   //     // Weight from ESP32 is in KG
//   //     setMilkLit(data.weight.toFixed(2));
//   //   } catch {
//   //     alert("Weighing machine not connected");
//   //   }
//   // };
//   const fetchMilkFromLoadCell = () => {
//     if (intervalRef.current) return;

//     intervalRef.current = setInterval(async () => {
//       try {
//         const data = await readLoadCell();

//         setMilkLit(data.weight.toFixed(2));

//         if (data.stable) {
//           clearInterval(intervalRef.current!);
//           intervalRef.current = null;
//         }
//       } catch {
//         clearInterval(intervalRef.current!);
//         intervalRef.current = null;
//         alert("Weighing machine not connected");
//       }
//     }, 500);
//   };

//   const saveMilk = () => {
//     console.log("milk: ", milkLit);
//     API.post("/milk", {
//       groupId,
//       milkLit: Number(milkLit),
//       shift,
//       animalNumber,
//       userId,
//     })
//       .then(() => alert("Milk Saved Successfully"))
//       .catch(() => alert("Error saving milk data"));
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <Text style={styles.subTitle}>Enter milk production</Text>

//         {/* SWITCH MODE */}
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
//             <Text style={styles.label}>Load Cell Reading:</Text>

//             <View style={styles.displayBox}>
//               <Text style={styles.displayText}>{milkLit} L</Text>
//             </View>

//             <TouchableOpacity
//               onPress={fetchMilkFromLoadCell}
//               style={styles.fetchBtn}
//             >
//               {/* <Text style={styles.fetchBtnText}>Get Milk Weight</Text> */}
//             </TouchableOpacity>
//           </View>
//         ) : (
//           /* MANUAL ENTRY MODE */
//           <View style={styles.box}>
//             <Text style={styles.label}>Enter Milk (Litres)</Text>

//             <TextInput
//               style={styles.input}
//               value={milkLit}
//               onChangeText={setMilkLit}
//               keyboardType="numeric"
//               placeholder="Enter milk quantity"
//             />

//             <TouchableOpacity
//               onPress={() => setMilkLit("0")}
//               style={styles.clearBtn}
//             >
//               <Text style={styles.clearBtnText}>Clear</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* SAVE BUTTON */}
//         <TouchableOpacity onPress={saveMilk} style={styles.saveBtn}>
//           <Text style={styles.saveBtnText}>Save</Text>
//         </TouchableOpacity>
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

// // ---------- STYLES ----------
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

//   label: {
//     fontSize: 18,
//     fontWeight: "600",
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

//   displayBox: {
//     padding: 20,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 12,
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
  Animated,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";
import { readLoadCell } from "../../api/loadCell";

export default function MilkProductionScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId, shift, animalNumber } = route.params;

  const [milkKg, setMilkKg] = useState("0");
  const [milkLit, setMilkLit] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const slideAnim = new Animated.Value(100);
  const MILK_DENSITY = 1.03; // kg per litre
  const kgToLitres = (kg: number) => {
    return Number((kg / MILK_DENSITY).toFixed(2));
  };
  useEffect(() => {
    nav.setOptions({
      title: `${shift}: Animal #${animalNumber}`,
    });

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
  }, [animalNumber]);

  // SAVE MILK (MANUAL + LOAD CELL)
  const saveMilk = async () => {
    Keyboard.dismiss();

    try {
      let finalLitres = Number(milkLit);

      // Load cell → read ONCE on Save
      if (useLoadCell) {
        const data = await readLoadCell();

        if (!data || data.weight === null) {
          alert("Weighing machine not connected");
          return;
        }

        const weightKg = Number(data.weight);

        if (isNaN(weightKg) || weightKg <= 0) {
          alert("Invalid milk weight from load cell");
          return;
        }

        const litres = kgToLitres(weightKg);

        setMilkKg(weightKg.toFixed(2));
        setMilkLit(litres.toString());

        finalLitres = litres;
      }

      // Prevent saving 0 or negative milk
      if (finalLitres <= 0) {
        alert("Milk must be greater than 0");
        return;
      }

      await API.post("/milk", {
        groupId,
        milkLit: finalLitres,
        shift,
        animalNumber,
        userId: Number(userId),
      });

      alert("Milk saved successfully");
    } catch (error) {
      console.error(error);
      alert("Error saving milk data");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.subTitle}>Enter milk production</Text>

        {/* SWITCH MODE */}
        <TouchableOpacity
          onPress={() => {
            setUseLoadCell(!useLoadCell);
            setMilkLit("0");
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
            <Text style={styles.label}>Milk from Load Cell</Text>

            <View style={styles.displayBox}>
              <Text style={styles.displayText}>{milkKg} kg</Text>
            </View>

            <Text style={styles.hintText}>
              Press Save to capture milk quantity
            </Text>
          </View>
        ) : (
          /* MANUAL MODE */
          <View style={styles.box}>
            <Text style={styles.label}>Enter Milk (Litres)</Text>

            <TextInput
              style={styles.input}
              value={milkLit}
              onChangeText={setMilkLit}
              keyboardType="numeric"
              placeholder="Enter milk (litres)"
            />

            <TouchableOpacity
              onPress={() => setMilkLit("0")}
              style={styles.clearBtn}
            >
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SAVE */}
        <TouchableOpacity onPress={saveMilk} style={styles.saveBtn}>
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

  displayBox: {
    padding: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
  },

  displayText: {
    fontSize: 36,
    fontWeight: "700",
  },
  litreText: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
  },

  hintText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 6,
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

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  saveBtnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
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
  },
  arrowText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
});
