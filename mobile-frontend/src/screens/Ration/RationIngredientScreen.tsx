// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { API } from "../../api/api";
// import { SCREEN_NETWORK_MAP } from "@/src/network/ScreenNetworkMap";
// import { resolveNetwork } from "@/src/network/NetworkManager";

// const SCREEN_NAME = "RationIngredientScreen";

// export default function RationIngredientScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();

//   // ------------------------
//   // PARAMS FROM STEP 1
//   // ------------------------
//   const { rationGroupId, groupName, animalCount, userId, groupId } =
//     route.params;

//   // ------------------------
//   // STATE
//   // ------------------------
//   const [ingredients, setIngredients] = useState<any[]>([]);
//   const [selectedIngredient, setSelectedIngredient] = useState<any>(null);
//   const [qtyPerAnimal, setQtyPerAnimal] = useState<string>("0");
//   const [mixTime, setMixTime] = useState<string>("0");
//   const [addedIngredients, setAddedIngredients] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ------------------------
//   // CALCULATIONS
//   // ------------------------
//   const totalQty = Number(qtyPerAnimal) * Number(animalCount);
//   const getDryMatter = (ingredient: any): number => {
//     if (!ingredient?.detail) return 0;

//     // detail might be string or object
//     const detail =
//       typeof ingredient.detail === "string"
//         ? JSON.parse(ingredient.detail)
//         : ingredient.detail;

//     return Number(detail.dryMatter || 0);
//   };
//   const dmPercent = selectedIngredient ? getDryMatter(selectedIngredient) : 0;

//   const dmKg = totalQty * (dmPercent / 100);

//   // ------------------------
//   // LOAD INGREDIENT STORE
//   // ------------------------
//   useEffect(() => {
//     nav.setOptions({ title: `${groupName} – Ingredients` });
//     fetchIngredients();
//   }, []);

//   const fetchIngredients = async () => {
//     try {
//       const res = await API.get("/ingredients");
//       setIngredients(res.data);
//     } catch {
//       Alert.alert("Error", "Failed to load ingredients");
//     }
//   };

//   // ------------------------
//   // ADD INGREDIENT
//   // ------------------------
//   const addIngredient = async () => {
//     if (!selectedIngredient) {
//       Alert.alert("Select ingredient");
//       return;
//     }

//     try {
//       setLoading(true);

//       await API.post("/ration/ingredient", {
//         rationGroupId,
//         ingredientId: selectedIngredient.id,
//         userId,
//         groupId,
//         qtyPerAnimal: Number(qtyPerAnimal),
//         animalCount: Number(animalCount),
//         dmPercent: getDryMatter(selectedIngredient),
//         mixTimeMinutes: Number(mixTime),
//       });

//       setQtyPerAnimal("0");
//       setMixTime("0");
//       setSelectedIngredient(null);
//     } catch {
//       Alert.alert("Failed to add ingredient");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------
//   // UI
//   // ------------------------
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "android" ? "padding" : "padding"}
//     >
//       <ScrollView>
//         <View style={styles.container}>
//           {/* INGREDIENT SELECT */}
//           <View style={styles.card}>
//             <Text style={styles.label}>Select Ingredient</Text>

//             <FlatList
//               data={ingredients}
//               horizontal
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.ingBtn,
//                     selectedIngredient?.id === item.id && styles.ingSelected,
//                   ]}
//                   onPress={() => setSelectedIngredient(item)}
//                 >
//                   <Text style={styles.ingText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//               showsHorizontalScrollIndicator={false}
//             />
//           </View>

//           {/* INPUT */}
//           {selectedIngredient && (
//             <View style={styles.card}>
//               <Text style={styles.label}>Qty per Animal (Kg)</Text>
//               <TextInput
//                 value={qtyPerAnimal}
//                 onChangeText={setQtyPerAnimal}
//                 keyboardType="numeric"
//                 style={styles.input}
//               />

//               <Text style={styles.label}>Mix Time (Minutes)</Text>
//               <TextInput
//                 value={mixTime}
//                 onChangeText={setMixTime}
//                 keyboardType="numeric"
//                 style={styles.input}
//               />

//               <Text style={styles.info}>
//                 Qty for Group: {totalQty.toFixed(2)} Kg
//               </Text>

//               <Text style={styles.info}>
//                 DM Contribution: {dmKg.toFixed(2)} Kg
//               </Text>

//               <TouchableOpacity
//                 style={styles.addBtn}
//                 onPress={addIngredient}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.addText}>Add Ingredient</Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           )}

//           {/* ADDED INGREDIENTS */}
//           <View style={styles.card}>
//             <Text style={styles.label}>Added Ingredients</Text>

//             {addedIngredients.map((item, index) => (
//               <View key={index} style={styles.listRow}>
//                 <Text style={styles.listText}>
//                   {item.ingredientId} – {item.totalQty} Kg
//                 </Text>
//               </View>
//             ))}
//           </View>

//           {/* CONTINUE */}
//           <TouchableOpacity
//             style={styles.saveBtn}
//             onPress={() =>
//               nav.navigate("PrepareTmrScreen", {
//                 rationGroupId,
//                 userId,
//                 groupId,
//               })
//             }
//           >
//             <Text style={styles.saveText}>Prepare TMR</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// // ------------------------
// // STYLES
// // ------------------------
// const styles = StyleSheet.create({
//   scrollcontainer: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#F3F4F6",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#F3F4F6",
//     padding: 16,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 14,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   ingBtn: {
//     backgroundColor: "#E5E7EB",
//     padding: 10,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   ingSelected: {
//     backgroundColor: "#2563EB",
//   },
//   ingText: {
//     color: "#111827",
//     fontWeight: "600",
//   },
//   input: {
//     backgroundColor: "#F9FAFB",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   info: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginVertical: 4,
//   },
//   addBtn: {
//     backgroundColor: "#10B981",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   addText: {
//     color: "#fff",
//     fontWeight: "700",
//   },
//   listRow: {
//     paddingVertical: 6,
//   },
//   listText: {
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   saveBtn: {
//     backgroundColor: "#2563EB",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
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
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";

export default function RationIngredientScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();

  const { rationGroupId, groupName, animalCount, userId, groupId } =
    route.params;

  const [ingredients, setIngredients] = useState<any[]>([]);
  const [addedIngredients, setAddedIngredients] = useState<any[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null);

  const [qtyPerAnimal, setQtyPerAnimal] = useState("0");
  const [mixTime, setMixTime] = useState("0");
  const [loading, setLoading] = useState(false);

  // ------------------------
  // CALCULATIONS (PPT)
  // ------------------------
  const totalQty = Number(qtyPerAnimal || 0) * Number(animalCount || 0);

  const dmPercent = selectedIngredient?.detail?.dryMatter || 0;
  const dmKg = totalQty * (dmPercent / 100);

  // ------------------------
  // LOAD DATA
  // ------------------------
  useEffect(() => {
    nav.setOptions({ title: `${groupName} – Ingredients` });
    loadIngredientStore();
    loadAddedIngredients();
  }, []);

  const loadIngredientStore = async () => {
    const res = await API.get("/ingredients");
    setIngredients(res.data);
  };

  const loadAddedIngredients = async () => {
    const res = await API.get(`/ration/group/${rationGroupId}/ingredients`);
    setAddedIngredients(res.data);
  };

  // ------------------------
  // ADD INGREDIENT
  // ------------------------
  const addIngredient = async () => {
    if (!selectedIngredient) {
      Alert.alert("Select ingredient");
      return;
    }

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

      loadAddedIngredients();
    } catch {
      Alert.alert("Failed to add ingredient");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // UI
  // ------------------------
  return (
    <View style={styles.container}>
      {/* INGREDIENT STORE */}
      <View style={styles.card}>
        <Text style={styles.label}>Ingredient Store</Text>
        <FlatList
          data={ingredients}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.ingBtn,
                selectedIngredient?.id === item.id && styles.selected,
              ]}
              onPress={() => setSelectedIngredient(item)}
            >
              <Text style={styles.ingText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* INPUT CARD */}
      {selectedIngredient && (
        <View style={styles.card}>
          <Text style={styles.label}>Qty per Animal (Kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={qtyPerAnimal}
            onChangeText={setQtyPerAnimal}
          />

          <Text style={styles.label}>Mix Time (Minutes)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={mixTime}
            onChangeText={setMixTime}
          />

          <Text style={styles.info}>Group Qty: {totalQty.toFixed(2)} Kg</Text>
          <Text style={styles.info}>DM Contribution: {dmKg.toFixed(2)} Kg</Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={addIngredient}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.addText}>Add Ingredient</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* ADDED INGREDIENTS */}
      <View style={styles.card}>
        <Text style={styles.label}>Added Ingredients</Text>
        {addedIngredients.map((item: any) => (
          <View key={item.id} style={styles.listRow}>
            <Text>
              {item.ingredient.name} – {item.totalQty} Kg
            </Text>
          </View>
        ))}
      </View>

      {/* CONTINUE */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() =>
          nav.navigate("PrepareTmrScreen", {
            rationGroupId,
            userId,
            groupId,
          })
        }
      >
        <Text style={styles.nextText}>Prepare TMR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F3F4F6" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  label: { fontWeight: "700", marginBottom: 8 },
  ingBtn: {
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  selected: { backgroundColor: "#2563EB" },
  ingText: { fontWeight: "600" },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  info: { fontWeight: "600", marginVertical: 4 },
  addBtn: {
    backgroundColor: "#10B981",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  addText: { color: "#fff", fontWeight: "700" },
  listRow: { paddingVertical: 6 },
  nextBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  nextText: { color: "#fff", fontWeight: "700" },
});
