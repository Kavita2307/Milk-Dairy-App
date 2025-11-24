import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { API } from "../../api/api";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AnimalDetailsScreen() {
  const [animalNumber, setAnimalNumber] = useState("");
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId } = route.params;

  const save = () => {
    API.post("/animals", { animalNumber, groupId }).then(() => {
      alert("Saved");
      nav.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Animal</Text>

      <Text style={styles.label}>Animal Number</Text>
      <TextInput
        value={animalNumber}
        onChangeText={setAnimalNumber}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={save} style={styles.button}>
        <Text style={styles.buttonText}>Save Animal</Text>
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "600",
  },
});
