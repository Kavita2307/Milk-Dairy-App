import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";

export default function RationIngredientScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();

  // ------------------------
  // PARAMS FROM STEP 1
  // ------------------------
  const { rationGroupId, groupName, animalCount } = route.params;

  // ------------------------
  // STATE
  // ------------------------
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null);
  const [qtyPerAnimal, setQtyPerAnimal] = useState<string>("0");
  const [mixTime, setMixTime] = useState<string>("0");
  const [addedIngredients, setAddedIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ------------------------
  // CALCULATIONS
  // ------------------------
  const totalQty = Number(qtyPerAnimal) * Number(animalCount);

  const dmKg = selectedIngredient
    ? totalQty * (selectedIngredient.dmPercent / 100)
    : 0;

  // ------------------------
  // LOAD INGREDIENT STORE
  // ------------------------
  useEffect(() => {
    nav.setOptions({ title: `${groupName} – Ingredients` });
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const res = await API.get("/ingredients");
      setIngredients(res.data);
    } catch {
      Alert.alert("Error", "Failed to load ingredients");
    }
  };

  // ------------------------
  // ADD INGREDIENT
  // ------------------------
  const addIngredient = async () => {
    if (!selectedIngredient) {
      Alert.alert("Select ingredient");
      return;
    }

    if (Number(qtyPerAnimal) <= 0) {
      Alert.alert("Enter valid quantity per animal");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/ration/ingredient", {
        rationGroupId,
        ingredientId: selectedIngredient.id,
        qtyPerAnimal: Number(qtyPerAnimal),
        animalCount: Number(animalCount),
        dmPercent: Number(selectedIngredient.dm),
        mixTimeMinutes: Number(mixTime),
      });
      console.log(res.data);
      setAddedIngredients([...addedIngredients, res.data]);

      // reset input
      setQtyPerAnimal("0");
      setMixTime("0");
      setSelectedIngredient(null);
    } catch {
      Alert.alert("Error", "Failed to add ingredient");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // UI
  // ------------------------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      <ScrollView>
        <View style={styles.container}>
          {/* INGREDIENT SELECT */}
          <View style={styles.card}>
            <Text style={styles.label}>Select Ingredient</Text>

            <FlatList
              data={ingredients}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.ingBtn,
                    selectedIngredient?.id === item.id && styles.ingSelected,
                  ]}
                  onPress={() => setSelectedIngredient(item)}
                >
                  <Text style={styles.ingText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* INPUT */}
          {selectedIngredient && (
            <View style={styles.card}>
              <Text style={styles.label}>Qty per Animal (Kg)</Text>
              <TextInput
                value={qtyPerAnimal}
                onChangeText={setQtyPerAnimal}
                keyboardType="numeric"
                style={styles.input}
              />

              <Text style={styles.label}>Mix Time (Minutes)</Text>
              <TextInput
                value={mixTime}
                onChangeText={setMixTime}
                keyboardType="numeric"
                style={styles.input}
              />

              <Text style={styles.info}>
                Qty for Group: {totalQty.toFixed(2)} Kg
              </Text>

              <Text style={styles.info}>
                DM Contribution: {dmKg.toFixed(2)} Kg
              </Text>

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

            {addedIngredients.map((item, index) => (
              <View key={index} style={styles.listRow}>
                <Text style={styles.listText}>
                  {item.ingredientId} – {item.totalQty} Kg
                </Text>
              </View>
            ))}
          </View>

          {/* CONTINUE */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() =>
              nav.navigate("PrepareTmrScreen", {
                rationGroupId,
              })
            }
          >
            <Text style={styles.saveText}>Prepare TMR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ------------------------
// STYLES
// ------------------------
const styles = StyleSheet.create({
  scrollcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  ingBtn: {
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  ingSelected: {
    backgroundColor: "#2563EB",
  },
  ingText: {
    color: "#111827",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 4,
  },
  addBtn: {
    backgroundColor: "#10B981",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "700",
  },
  listRow: {
    paddingVertical: 6,
  },
  listText: {
    fontSize: 14,
    fontWeight: "600",
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
