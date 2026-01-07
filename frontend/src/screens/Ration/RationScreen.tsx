// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { API } from "../../api/api";
// import { SCREEN_NETWORK_MAP } from "@/src/network/ScreenNetworkMap";
// import { resolveNetwork } from "@/src/network/NetworkManager";

// const SCREEN_NAME = "RationGroupSetupScreen";

// export default function RationGroupSetupScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();

//   // ------------------------
//   // PARAMS FROM PREVIOUS TAB
//   // ------------------------
//   const { groupId, groupName, date, userId } = route.params;
//   console.log(route.params);
//   // ------------------------
//   // STATE
//   // ------------------------
//   const [animalCount, setAnimalCount] = useState<number>(0);
//   const [rationPercentage, setRationPercentage] = useState<number>(50);
//   const [plannedTmrQty, setPlannedTmrQty] = useState<number>(0);
//   const [loading, setLoading] = useState(false);

//   // ------------------------
//   // CALCULATIONS
//   // ------------------------
//   const offeredTmrQty = plannedTmrQty * (rationPercentage / 100);

//   // ------------------------
//   // LOAD ANIMAL COUNT
//   // ------------------------
//   useEffect(() => {
//     nav.setOptions({ title: `${groupName}` });

//     fetchAnimalCount();
//     createOrGetRationPlan();
//   }, []);

//   const fetchAnimalCount = async () => {
//     try {
//       const res = await API.get(`/animals/count/${groupId}`);
//       setAnimalCount(res.data.count);
//     } catch {
//       Alert.alert("Error", "Failed to fetch animal count");
//     }
//   };

//   // ------------------------
//   // CREATE / GET RATION PLAN
//   // ------------------------
//   const [rationPlanId, setRationPlanId] = useState<number | null>(null);

//   const createOrGetRationPlan = async () => {
//     try {
//       const res = await API.post("/ration/plan", {
//         date,
//         createdBy: userId,
//       });
//       console.log(res.data);
//       setRationPlanId(res.data.id);
//     } catch {
//       Alert.alert("Error", "Failed to create ration plan");
//     }
//   };

//   // ------------------------
//   // SAVE GROUP SETUP
//   // ------------------------
//   const saveGroupSetup = async () => {
//     if (!rationPlanId) return;

//     try {
//       setLoading(true);

//       const res = await API.post("/ration/group", {
//         rationPlanId,
//         groupId,
//         userId,
//         animalCount,
//         rationPercentage,
//         plannedTmrQty,
//       });
//       console.log(res.data);
//       Alert.alert("Success", "Ration group saved");

//       nav.navigate("RationIngredientScreen", {
//         rationGroupId: res.data.id,
//         groupName,
//         animalCount,
//         userId,
//         groupId,
//       });
//     } catch {
//       Alert.alert("Error", "Failed to save ration group");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------
//   // UI
//   // ------------------------
//   return (
//     <View style={styles.container}>
//       {/* GROUP INFO */}
//       <View style={styles.card}>
//         <Text style={styles.label}>Group</Text>
//         <Text style={styles.value}>{groupName}</Text>

//         <Text style={styles.label}>No. of Animals</Text>
//         <Text style={styles.value}>{animalCount}</Text>
//       </View>

//       {/* RATION SETTINGS */}
//       <View style={styles.card}>
//         <Text style={styles.label}>Ration Offered (%)</Text>

//         <View style={styles.row}>
//           <TouchableOpacity
//             style={styles.adjustBtn}
//             onPress={() =>
//               setRationPercentage(Math.max(0, rationPercentage - 5))
//             }
//           >
//             <Text style={styles.adjustText}>−</Text>
//           </TouchableOpacity>

//           <Text style={styles.percentage}>{rationPercentage}%</Text>

//           <TouchableOpacity
//             style={styles.adjustBtn}
//             onPress={() =>
//               setRationPercentage(Math.min(100, rationPercentage + 5))
//             }
//           >
//             <Text style={styles.adjustText}>+</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.label}>Planned TMR (Kg)</Text>
//         <Text style={styles.value}>{plannedTmrQty.toFixed(2)}</Text>

//         <Text style={styles.label}>Total TMR Offered (Kg)</Text>
//         <Text style={styles.highlight}>{offeredTmrQty.toFixed(2)}</Text>
//       </View>

//       {/* SAVE */}
//       <TouchableOpacity
//         style={styles.saveBtn}
//         onPress={saveGroupSetup}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.saveText}>Save & Continue</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// // ------------------------
// // STYLES (MATCHES YOUR APP)
// // ------------------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F3F4F6",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 18,
//     borderRadius: 14,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: 6,
//   },
//   value: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 14,
//   },
//   highlight: {
//     fontSize: 22,
//     fontWeight: "800",
//     color: "#2563EB",
//     marginTop: 6,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 12,
//   },
//   adjustBtn: {
//     backgroundColor: "#E5E7EB",
//     padding: 12,
//     borderRadius: 12,
//     marginHorizontal: 20,
//   },
//   adjustText: {
//     fontSize: 22,
//     fontWeight: "700",
//   },
//   percentage: {
//     fontSize: 26,
//     fontWeight: "800",
//   },
//   saveBtn: {
//     backgroundColor: "#2563EB",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   saveText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";

export default function RationGroupSetupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();

  // ------------------------
  // PARAMS
  // ------------------------
  const { groupId, groupName, date, userId, rationGroupId } =
    route.params || {};

  // ------------------------
  // STATE
  // ------------------------
  const [animalCount, setAnimalCount] = useState<number>(0);
  const [rationPercentage, setRationPercentage] = useState<number>(50);
  const [plannedTmrQty, setPlannedTmrQty] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // ------------------------
  // CALCULATIONS (PPT)
  // ------------------------
  const offeredTmrQty = plannedTmrQty * (rationPercentage / 100);

  // ------------------------
  // LOAD DATA
  // ------------------------
  useEffect(() => {
    nav.setOptions({ title: groupName });
    fetchAnimalCount();
    if (rationGroupId) loadExistingGroup();
  }, []);

  const fetchAnimalCount = async () => {
    try {
      const res = await API.get(`/animals/count/${groupId}`);
      setAnimalCount(res.data.count);
    } catch {
      Alert.alert("Error", "Failed to load animal count");
    }
  };

  const loadExistingGroup = async () => {
    try {
      const res = await API.get(`/ration/group/${rationGroupId}`);
      setAnimalCount(res.data.animalCount);
      setRationPercentage(res.data.rationPercentage);
      setPlannedTmrQty(res.data.plannedTmrQty);
    } catch {
      Alert.alert("Error", "Failed to load ration group");
    }
  };

  // ------------------------
  // SAVE / UPDATE
  // ------------------------
  const saveGroupSetup = async () => {
    setLoading(true);
    try {
      const payload = {
        groupId,
        userId,
        date,
        animalCount,
        rationPercentage,
        plannedTmrQty,
        offeredTmrQty,
      };

      let res;
      if (rationGroupId) {
        res = await API.put(`/ration/group/${rationGroupId}`, payload);
      } else {
        res = await API.post("/ration/group", payload);
      }

      Alert.alert("Success", "Ration group saved");

      nav.navigate("RationIngredientScreen", {
        rationGroupId: res.data.id,
        groupName,
        animalCount,
        userId,
        groupId,
      });
    } catch {
      Alert.alert("Error", "Failed to save ration group");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // UI
  // ------------------------
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Group</Text>
        <Text style={styles.value}>{groupName}</Text>

        <Text style={styles.label}>No. of Animals</Text>
        <Text style={styles.value}>{animalCount}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Ration Offered (%)</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.adjustBtn}
            onPress={() =>
              setRationPercentage(Math.max(0, rationPercentage - 5))
            }
          >
            <Text style={styles.adjustText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.percentage}>{rationPercentage}%</Text>

          <TouchableOpacity
            style={styles.adjustBtn}
            onPress={() =>
              setRationPercentage(Math.min(100, rationPercentage + 5))
            }
          >
            <Text style={styles.adjustText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Planned TMR (Kg)</Text>
        <Text style={styles.value}>{plannedTmrQty.toFixed(2)}</Text>

        <Text style={styles.label}>Total TMR Offered (Kg)</Text>
        <Text style={styles.highlight}>{offeredTmrQty.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={saveGroupSetup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>
            {rationGroupId ? "Update & Continue" : "Save & Continue"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ------------------------
// STYLES
// ------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  highlight: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2563EB",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  adjustBtn: {
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  adjustText: {
    fontSize: 22,
    fontWeight: "700",
  },
  percentage: {
    fontSize: 26,
    fontWeight: "800",
  },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
