import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";

export default function RecordConsumption() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params; // ingredientId

  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  const save = () => {
    const qty = parseFloat(quantity);

    if (!qty || qty <= 0) {
      alert("Enter a valid quantity");
      return;
    }

    API.post(`/ingredients/${id}/consume`, {
      quantity: qty,
      note,
    })
      .then(() => {
        alert("Consumption recorded");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        alert("Error recording consumption");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Consumption</Text>

      <Text style={styles.label}>Quantity (kg)</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Enter quantity"
        style={styles.input}
      />

      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
        style={styles.input}
      />

      <TouchableOpacity onPress={save} style={styles.button}>
        <Text style={styles.buttonText}>Save Consumption</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#6b7280",
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
  },
  cancelButtonText: {
    textAlign: "center",
    color: "#fff",
  },
});
