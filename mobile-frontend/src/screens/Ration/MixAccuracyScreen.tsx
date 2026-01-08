// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { API } from "../../api/api";
// import { SCREEN_NETWORK_MAP } from "@/src/network/ScreenNetworkMap";
// import { resolveNetwork } from "@/src/network/NetworkManager";

// const SCREEN_NAME = "MixAccuracyScreen";

// export default function MixAccuracyScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();

//   // ------------------------
//   // PARAMS
//   // ------------------------
//   const { rationGroupId, userId, groupId } = route.params;

//   // ------------------------
//   // STATE
//   // ------------------------
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ------------------------
//   // LOAD MIX ACCURACY
//   // ------------------------
//   useEffect(() => {
//     nav.setOptions({ title: "Mix Accuracy" });
//     fetchMixAccuracy();
//   }, []);

//   const fetchMixAccuracy = async () => {
//     try {
//       const res = await API.get(`/ration/group/${rationGroupId}/mix-accuracy`);
//       setData(res.data);
//     } catch {
//       Alert.alert("Error", "Failed to load mix accuracy");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------
//   // RENDER ROW
//   // ------------------------
//   const renderItem = ({ item }: { item: any }) => {
//     const accuracy = item.accuracyPercent;

//     let status = "Accurate";
//     let color = "#16A34A";

//     if (accuracy < 95) {
//       status = "Under";
//       color = "#DC2626";
//     } else if (accuracy > 105) {
//       status = "Over";
//       color = "#EA580C";
//     }

//     return (
//       <View style={styles.row}>
//         <Text style={styles.ingName}>
//           {item.rationIngredient.ingredient.name}
//         </Text>

//         <View style={styles.valuesRow}>
//           <Text style={styles.value}>
//             Planned: {item.plannedQty.toFixed(2)} kg
//           </Text>
//           <Text style={styles.value}>
//             Actual: {item.actualQty.toFixed(2)} kg
//           </Text>
//         </View>

//         <View style={styles.footerRow}>
//           <Text style={[styles.accuracy, { color }]}>
//             {accuracy.toFixed(1)}%
//           </Text>
//           <Text style={[styles.status, { color }]}>{status}</Text>
//         </View>
//       </View>
//     );
//   };

//   // ------------------------
//   // UI
//   // ------------------------
//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* DONE */}
//       <TouchableOpacity
//         style={styles.doneBtn}
//         onPress={() => nav.navigate("Ration")}
//       >
//         <Text style={styles.doneText}>Done</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // ------------------------
// // STYLES
// // ------------------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F3F4F6",
//     padding: 16,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   row: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 14,
//     marginBottom: 14,
//     elevation: 3,
//   },
//   ingName: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 6,
//     color: "#111827",
//   },
//   valuesRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 6,
//   },
//   value: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#374151",
//   },
//   footerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   accuracy: {
//     fontSize: 20,
//     fontWeight: "800",
//   },
//   status: {
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   doneBtn: {
//     backgroundColor: "#2563EB",
//     padding: 16,
//     borderRadius: 16,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   doneText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";

export default function MixAccuracyScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();

  const { rationGroupId } = route.params;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ------------------------
  // LOAD MIX ACCURACY
  // ------------------------
  useEffect(() => {
    nav.setOptions({ title: "Mix Accuracy" });
    fetchMixAccuracy();
  }, []);

  const fetchMixAccuracy = async () => {
    try {
      const res = await API.get(`/ration/group/${rationGroupId}/mix-accuracy`);
      setData(res.data);
    } catch {
      Alert.alert("Error", "Failed to load mix accuracy");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // RENDER ROW
  // ------------------------
  const renderItem = ({ item }: { item: any }) => {
    const accuracy = item.accuracyPercent;

    let status = "Accurate";
    let color = "#16A34A"; // green

    if (accuracy < 95) {
      status = "Under";
      color = "#DC2626"; // red
    } else if (accuracy > 105) {
      status = "Over";
      color = "#EA580C"; // orange
    }

    return (
      <View style={styles.row}>
        <Text style={styles.ingName}>
          {item.rationIngredient.ingredient.name}
        </Text>

        <View style={styles.valuesRow}>
          <Text style={styles.value}>
            Planned: {item.plannedQty.toFixed(2)} kg
          </Text>
          <Text style={styles.value}>
            Actual: {item.actualQty.toFixed(2)} kg
          </Text>
        </View>

        <View style={styles.footerRow}>
          <Text style={[styles.accuracy, { color }]}>
            {accuracy.toFixed(1)}%
          </Text>
          <Text style={[styles.status, { color }]}>{status}</Text>
        </View>
      </View>
    );
  };

  // ------------------------
  // UI
  // ------------------------
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.doneBtn}
        onPress={() => nav.navigate("RationGroup")}
      >
        <Text style={styles.doneText}>Done</Text>
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
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },
  ingName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  valuesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accuracy: {
    fontSize: 20,
    fontWeight: "800",
  },
  status: {
    fontSize: 16,
    fontWeight: "700",
  },
  doneBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  doneText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
