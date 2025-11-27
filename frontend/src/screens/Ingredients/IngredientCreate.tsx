import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../api/api";

export default function IngredientCreate() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [dryMatter, setDryMatter] = useState("");
  const [initialStock, setInitialStock] = useState("");

  const save = () => {
    Keyboard.dismiss(); // 👈 closes keyboard immediately

    if (!name.trim()) {
      alert("Ingredient name is required.");
      return;
    }

    API.post("/ingredients", {
      name,
      details: {
        pricePerKg: pricePerKg ? parseFloat(pricePerKg) : null,
        dryMatterPct: dryMatter ? parseFloat(dryMatter) : null,
      },
      initialStock: initialStock ? parseFloat(initialStock) : 0,
    })
      .then(() => {
        alert("Ingredient added successfully");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding ingredient");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Ingredient</Text>

      {/* Ingredient Name */}
      <Text style={styles.label}>Ingredient Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g. Feed, Silage"
        style={styles.input}
      />

      {/* Price */}
      <Text style={styles.label}>Price (Rs/kg)</Text>
      <TextInput
        value={pricePerKg}
        onChangeText={setPricePerKg}
        keyboardType="numeric"
        placeholder="Enter price"
        style={styles.input}
      />

      {/* Dry Matter */}
      <Text style={styles.label}>Dry Matter (%)</Text>
      <TextInput
        value={dryMatter}
        onChangeText={setDryMatter}
        keyboardType="numeric"
        placeholder="Enter dry matter %"
        style={styles.input}
      />

      {/* Initial Stock */}
      <Text style={styles.label}>Initial Stock (kg)</Text>
      <TextInput
        value={initialStock}
        onChangeText={setInitialStock}
        keyboardType="numeric"
        placeholder="Optional"
        style={styles.input}
      />

      {/* Save Button */}
      <TouchableOpacity onPress={save} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save Ingredient</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.cancelBtn}
      >
        <Text style={styles.cancelBtnText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  saveBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  cancelBtn: {
    backgroundColor: "#9ca3af",
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  cancelBtnText: {
    color: "#fff",
    textAlign: "center",
  },
});
