import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { API } from "../../api/api";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function IngredientDetailScreen() {
  const route = useRoute<any>();
  const { ingredientId } = route.params;
  const nav = useNavigation();
  const [ingredient, setIngredient] = useState<any>(null);
  const [quantity, setQuantity] = useState("");

  const loadData = async () => {
    const data = await API.get(`/ingredients/${ingredientId}`).then(
      (res) => res.data
    );
    setIngredient(data);
  };

  useEffect(() => {
    nav.setOptions({ title: `Ingredient Details` });
    loadData();
  }, []);

  const handleAddStock = async () => {
    console.log("Adding stock:", { ingredientId, quantity });
    await API.post(`/ingredients/${ingredientId}/add-stock`, {
      ingredientId,
      quantity: Number(quantity),
    });

    setQuantity("");
    loadData(); // refresh data after update
  };

  if (!ingredient) return null;

  return (
    <>
      <View style={styles.detailsBox}>
        <Text style={styles.sectionTitle}>{ingredient.name}</Text>

        <Text style={styles.detailsItem}>Price: Rs {ingredient.price}/kg</Text>
        <Text style={styles.detailsItem}>
          Dry Matter: {ingredient.dryMatter}%
        </Text>
        <Text style={styles.detailsItem}>
          Available Stock: {ingredient.currentStock} kg
        </Text>
        <Text style={styles.detailsItem}>
          Daily Consumption: {ingredient.dailyConsumption ?? "N/A"} kg
        </Text>
        <Text style={styles.detailsItem}>
          Days Left: {ingredient.daysLeft?.toFixed(1) ?? "N/A"}
        </Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Add Quantity (kg)</Text>

        <TextInput
          placeholder="e.g. 50"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddStock} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Add Stock</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#FBBF24",
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  saveBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  detailsBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
    elevation: 3,
  },
  detailsItem: {
    fontSize: 16,
    marginVertical: 4,
    color: "#374151",
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#374151",
  },
});
