import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";

export default function RationScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();

  const { groupId, groupName, date, userId } = route.params;

  /* ---------------- STATE ---------------- */
  const [animalCount, setAnimalCount] = useState(0);
  const [rationPercentage, setRationPercentage] = useState(50);
  const [plannedTmrQty, setPlannedTmrQty] = useState(0);
  const [rationGroupId, setRationGroupId] = useState<number | null>(null);

  const [ingredients, setIngredients] = useState<any[]>([]);
  const [addedIngredients, setAddedIngredients] = useState<any[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null);

  const [qtyPerAnimal, setQtyPerAnimal] = useState("0");
  const [mixTime, setMixTime] = useState("0");
  const [loading, setLoading] = useState(false);

  const offeredTmrQty = plannedTmrQty * (rationPercentage / 100);

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    nav.setOptions({ title: groupName });
    loadAnimalCount();
    loadIngredientStore();
  }, []);

  const loadAnimalCount = async () => {
    const res = await API.get(`/animals/count/${groupId}`);
    setAnimalCount(res.data.count);
  };

  const loadIngredientStore = async () => {
    const res = await API.get("/ingredients");
    setIngredients(res.data);
  };

  const loadAddedIngredients = async (id: number) => {
    const res = await API.get(`/ration/group/${id}/ingredients`);
    setAddedIngredients(res.data);
  };

  /* ---------------- SAVE GROUP ---------------- */
  const saveGroup = async () => {
    try {
      setLoading(true);
      const res = await API.post("/ration/group", {
        groupId,
        userId,
        date,
        animalCount,
        rationPercentage,
        plannedTmrQty,
        offeredTmrQty,
      });

      setRationGroupId(res.data.id);
      loadAddedIngredients(res.data.id);
      Alert.alert("Saved", "Group summary saved");
    } catch {
      Alert.alert("Error", "Failed to save group");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ADD INGREDIENT ---------------- */
  const addIngredient = async () => {
    if (!selectedIngredient || !rationGroupId) {
      Alert.alert("Save group first");
      return;
    }

    const totalQty = Number(qtyPerAnimal) * animalCount;
    const dmPercent = selectedIngredient?.detail?.dryMatter || 0;

    try {
      setLoading(true);
      await API.post("/ration/ingredient", {
        rationGroupId,
        ingredientId: selectedIngredient.id,
        qtyPerAnimal: Number(qtyPerAnimal),
        animalCount,
        totalQty,
        dmPercent,
        mixTimeMinutes: Number(mixTime),
        userId,
        groupId,
      });

      setQtyPerAnimal("0");
      setMixTime("0");
      setSelectedIngredient(null);
      loadAddedIngredients(rationGroupId);
    } catch {
      Alert.alert("Error", "Failed to add ingredient");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <View style={styles.container}>
      {/* LEFT – GROUP SUMMARY */}
      <View style={styles.card}>
        <Text style={styles.section}>Group Summary</Text>
        <Text>No. of Animals: {animalCount}</Text>

        <Text>Ration %</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setRationPercentage(rationPercentage - 5)}
          >
            <Text style={styles.adjust}>−</Text>
          </TouchableOpacity>
          <Text style={styles.big}>{rationPercentage}%</Text>
          <TouchableOpacity
            onPress={() => setRationPercentage(rationPercentage + 5)}
          >
            <Text style={styles.adjust}>+</Text>
          </TouchableOpacity>
        </View>

        <Text>Planned TMR (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={plannedTmrQty.toString()}
          onChangeText={(v) => setPlannedTmrQty(Number(v))}
        />

        <Text>Total Offered: {offeredTmrQty.toFixed(2)} kg</Text>

        <TouchableOpacity style={styles.saveBtn} onPress={saveGroup}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* MIDDLE – INGREDIENTS */}
      <View style={styles.card}>
        <Text style={styles.section}>Ingredients</Text>

        <FlatList
          data={ingredients}
          horizontal
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.ingBtn,
                selectedIngredient?.id === item.id && styles.selected,
              ]}
              onPress={() => setSelectedIngredient(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {selectedIngredient && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Qty per animal"
              keyboardType="numeric"
              value={qtyPerAnimal}
              onChangeText={setQtyPerAnimal}
            />
            <TextInput
              style={styles.input}
              placeholder="Mix time (min)"
              keyboardType="numeric"
              value={mixTime}
              onChangeText={setMixTime}
            />

            <TouchableOpacity style={styles.addBtn} onPress={addIngredient}>
              <Text style={styles.btnText}>Add Ingredient</Text>
            </TouchableOpacity>
          </>
        )}

        {addedIngredients.map((i) => (
          <Text key={i.id}>
            {i.ingredient.name} – {i.totalQty} kg
          </Text>
        ))}
      </View>

      {/* BOTTOM – MIX TMR */}
      <TouchableOpacity
        style={styles.mixBtn}
        disabled={!rationGroupId}
        onPress={() =>
          nav.navigate("PrepareTmrScreen", {
            rationGroupId,
            userId,
            groupId,
          })
        }
      >
        <Text style={styles.mixText}>MIX TMR</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F3F4F6" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  section: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  adjust: { fontSize: 26, marginHorizontal: 20 },
  big: { fontSize: 24, fontWeight: "800" },
  input: { borderWidth: 1, borderRadius: 10, padding: 10, marginVertical: 6 },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  addBtn: {
    backgroundColor: "#10B981",
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  mixBtn: { backgroundColor: "#F97316", padding: 18, borderRadius: 16 },
  btnText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  mixText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  ingBtn: {
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  selected: { backgroundColor: "#93C5FD" },
});
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

// export default function RationScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();

//   const { groupId, userId, groupName } = route.params;

//   const [summary, setSummary] = useState<any>(null);
//   const [ingredients, setIngredients] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadRation();
//   }, []);

//   const loadRation = async () => {
//     try {
//       const animalRes = await API.get(`/animals/count/${groupId}`);
//       const rationRes = await API.get(`/ration/group/latest/${groupId}`);
//       const ingRes = await API.get(
//         `/ration/group/${rationRes.data.id}/ingredients`
//       );
//       console.log("Ration Res:", rationRes.data);
//       console.log("Animal Res:", animalRes.data);
//       console.log("Ingredients Res:", ingRes.data);
//       setSummary({
//         ...rationRes.data,
//         animalCount: animalRes.data.count,
//       });

//       setIngredients(ingRes.data);
//     } catch {
//       Alert.alert("Error", "Failed to load ration");
//       setSummary(null);
//       setIngredients([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* FEED SECTION */}
//       <View style={styles.card}>
//         <Text style={styles.section}>Feed</Text>

//         {!summary ? (
//           <ActivityIndicator />
//         ) : (
//           <>
//             <View style={styles.rowHeader}>
//               <Text style={styles.col}>Name</Text>
//               <Text style={styles.col}>No</Text>
//               <Text style={styles.col}>Kg</Text>
//               <Text style={styles.col}>Total</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.col}>{groupName}</Text>
//               <Text style={styles.col}>{summary.animalCount}</Text>
//               <Text style={styles.col}>{summary.plannedTmrQty}</Text>
//               <Text style={styles.col}>{summary.offeredTmrQty}</Text>
//             </View>

//             <View style={styles.divider} />

//             <Text>Last Load: {summary.lastLoad ?? 0}</Text>
//             <Text>This Load: {summary.offeredTmrQty}</Text>
//             <Text>Diff: {summary.offeredTmrQty - (summary.lastLoad ?? 0)}</Text>
//             <Text>Ration %: {summary.rationPercentage}%</Text>
//             <Text>Days: {summary.days ?? 1}</Text>
//           </>
//         )}
//       </View>

//       {/* INGREDIENTS */}
//       <View style={styles.card}>
//         <Text style={styles.section}>Ingredients</Text>
//         {!summary ? (
//           <ActivityIndicator />
//         ) : (
//           <>
//             <View style={styles.rowHeader}>
//               <Text style={[styles.col, { flex: 2 }]}>Name</Text>
//               <Text style={styles.col}>Kg</Text>
//               <Text style={styles.col}>Total</Text>
//             </View>

//             <FlatList
//               data={ingredients}
//               keyExtractor={(i) => i.id.toString()}
//               renderItem={({ item }) => (
//                 <View style={styles.row}>
//                   <Text style={[styles.col, { flex: 2 }]}>
//                     {item.ingredient.name}
//                   </Text>
//                   <Text style={styles.col}>{item.qtyPerAnimal}</Text>
//                   <Text style={styles.col}>{item.totalQty}</Text>
//                 </View>
//               )}
//             />
//           </>
//         )}
//       </View>

//       {/* MIX TMR */}
//       <TouchableOpacity
//         style={styles.mixBtn}
//         onPress={() =>
//           nav.navigate("PrepareTmrScreen", {
//             rationGroupId: summary.id,
//             userId,
//             groupId,
//           })
//         }
//       >
//         <Text style={styles.mixText}>MIX TMR</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 12, backgroundColor: "#F3F4F6" },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 10,
//   },
//   section: { fontSize: 16, fontWeight: "800", marginBottom: 6 },
//   rowHeader: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     marginBottom: 6,
//   },
//   row: { flexDirection: "row", paddingVertical: 4 },
//   col: { flex: 1, fontWeight: "600" },
//   divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 6 },
//   mixBtn: {
//     backgroundColor: "#0ea5e9",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
//   },
//   mixText: { color: "#fff", fontSize: 18, fontWeight: "800" },
// });
