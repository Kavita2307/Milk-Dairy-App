// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
// import { API } from "../../api/api";
// import { useRoute } from "@react-navigation/native";

// export default function RationScreen() {
//   const route = useRoute<any>();
//   const { groupId, userId } = route.params;

//   const [ration, setRation] = useState<any>(null);
//   const [ingredients, setIngredients] = useState<any[]>([]);

//   const loadRation = () => {
//     API.get(`/ration/${groupId}`).then((res) => {
//       setRation(res.data.ration);
//       setIngredients(res.data.ingredients);
//     });
//   };

//   useEffect(() => {
//     loadRation();
//   }, []);

//   if (!ration) {
//     return (
//       <View style={{ padding: 20 }}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header Row */}
//       <View style={styles.headerRow}>
//         <View style={styles.headerLeft}>
//           <MaterialCommunityIcons name="food" size={22} color="#0EA5E9" />
//           <Text style={styles.headerTitle}>Feedsection</Text>
//         </View>

//         <TouchableOpacity>
//           <MaterialCommunityIcons
//             name="plus-circle"
//             size={26}
//             color="#10B981"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Feed Section */}
//       <View style={styles.card}>
//         <View style={styles.tableHeader}>
//           <Text style={styles.tableHeadText}>Name</Text>
//           <Text style={styles.tableHeadText}>No</Text>
//           <Text style={styles.tableHeadText}>Kg</Text>
//           <Text style={styles.tableHeadText}>Total</Text>
//         </View>

//         <View style={styles.tableRow}>
//           <Text style={styles.rowText}>{ration.name}</Text>
//           <Text style={styles.rowText}>{ration.no}</Text>
//           <Text style={styles.rowText}>{ration.kg}</Text>
//           <Text style={styles.rowText}>{ration.total}</Text>
//         </View>
//       </View>

//       {/* Ingredients Section */}
//       <View style={styles.headerRow}>
//         <View style={styles.headerLeft}>
//           <MaterialCommunityIcons name="leaf" size={22} color="#10B981" />
//           <Text style={styles.headerTitle}>Ingredients</Text>
//         </View>

//         <TouchableOpacity>
//           <MaterialCommunityIcons
//             name="plus-circle"
//             size={26}
//             color="#10B981"
//           />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={ingredients}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.ingRow}>
//             <Text style={styles.ingText}>{item.name}</Text>
//             <Text style={styles.ingText}>{item.kg}</Text>
//             <Text style={styles.ingText}>{item.total}</Text>
//             <MaterialCommunityIcons name="plus" size={22} color="#0EA5E9" />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: "#F3F4F6" },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
//   headerTitle: { fontSize: 20, fontWeight: "700", color: "#1F2937" },
//   card: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   tableHeader: { flexDirection: "row", justifyContent: "space-between" },
//   tableHeadText: { fontWeight: "700", color: "#334155" },
//   tableRow: { flexDirection: "row", justifyContent: "space-between" },
//   rowText: { width: "25%", color: "#374151" },
//   loadCard: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//     marginTop: 10,
//   },
//   loadRow: { flexDirection: "row", justifyContent: "space-between" },
//   loadLabel: { fontWeight: "600", color: "#374151" },
//   loadValue: { color: "#111827" },
//   bottomInfoCard: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//     marginTop: 10,
//   },
//   iconRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
//   bottomText: { marginLeft: 6, fontWeight: "600", color: "#374151" },
//   bottomValue: { marginLeft: "auto", color: "#111827" },
//   ingRow: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 5,
//   },
//   ingText: { width: "25%", color: "#374151" },
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
  // PARAMS FROM PREVIOUS TAB
  // ------------------------
  const { groupId, groupName, date, userId } = route.params;

  // ------------------------
  // STATE
  // ------------------------
  const [animalCount, setAnimalCount] = useState<number>(0);
  const [rationPercentage, setRationPercentage] = useState<number>(50);
  const [plannedTmrQty, setPlannedTmrQty] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // ------------------------
  // CALCULATIONS
  // ------------------------
  const offeredTmrQty = plannedTmrQty * (rationPercentage / 100);

  // ------------------------
  // LOAD ANIMAL COUNT
  // ------------------------
  useEffect(() => {
    nav.setOptions({ title: `${groupName}` });

    fetchAnimalCount();
    createOrGetRationPlan();
  }, []);

  const fetchAnimalCount = async () => {
    try {
      const res = await API.get(`/animals/count/${groupId}`);
      setAnimalCount(res.data.count);
    } catch {
      Alert.alert("Error", "Failed to fetch animal count");
    }
  };

  // ------------------------
  // CREATE / GET RATION PLAN
  // ------------------------
  const [rationPlanId, setRationPlanId] = useState<number | null>(null);

  const createOrGetRationPlan = async () => {
    try {
      const res = await API.post("/ration/plan", {
        date,
        createdBy: userId,
      });
      setRationPlanId(res.data.id);
    } catch {
      Alert.alert("Error", "Failed to create ration plan");
    }
  };

  // ------------------------
  // SAVE GROUP SETUP
  // ------------------------
  const saveGroupSetup = async () => {
    if (!rationPlanId) return;

    try {
      setLoading(true);

      const res = await API.post("/ration/group", {
        rationPlanId,
        groupId,
        animalCount,
        rationPercentage,
        plannedTmrQty,
      });

      Alert.alert("Success", "Ration group saved");

      nav.navigate("RationIngredientScreen", {
        rationGroupId: res.data.id,
        groupName,
        animalCount,
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
      {/* GROUP INFO */}
      <View style={styles.card}>
        <Text style={styles.label}>Group</Text>
        <Text style={styles.value}>{groupName}</Text>

        <Text style={styles.label}>No. of Animals</Text>
        <Text style={styles.value}>{animalCount}</Text>
      </View>

      {/* RATION SETTINGS */}
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

      {/* SAVE */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={saveGroupSetup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Save & Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ------------------------
// STYLES (MATCHES YOUR APP)
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
    color: "#111827",
    marginBottom: 14,
  },
  highlight: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2563EB",
    marginTop: 6,
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
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
