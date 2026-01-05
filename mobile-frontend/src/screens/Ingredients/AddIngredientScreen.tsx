// src/screens/AddIngredientScreen.tsx
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API } from "../../api/api";
import { useNavigation } from "@react-navigation/native";

export default function AddIngredientScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dryMatter, setDryMatter] = useState("");
  const [stock, setStock] = useState("");

  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({ title: `Ingredient's Details` });
  }, []);
  const submit = async () => {
    if (!name.trim()) {
      alert("Enter a valid ingredient name");
      return;
    }
    await API.post("/ingredients", {
      name,
      price: Number(price),
      dryMatter: Number(dryMatter),
      currentStock: Number(stock),
      userId: 1, // from auth later
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Add Ingredients Details</Text>

        <Text style={styles.label}>Ingredient Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="e.g. Feed"
        />

        <Text style={styles.label}>Price (Rs/Kg)</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 500"
        />

        <Text style={styles.label}>Dry Matter (%)</Text>
        <TextInput
          value={dryMatter}
          onChangeText={setDryMatter}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 30"
        />

        <Text style={styles.label}>Available Stock (kg)</Text>
        <TextInput
          value={stock}
          onChangeText={setStock}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 100"
        />

        <TouchableOpacity onPress={submit} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#374151",
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

  datePickerBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    elevation: 4,
  },

  doneBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  doneText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
