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
  const [animalAge, setanimalAge] = useState("");
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, animalNumber } = route.params;
  const { userId } = route.params;
  // const save = () => {
  //   API.post("/animals", { animalNumber, groupId, userId, animalAge }).then(
  //     () => {
  //       alert("Saved");
  //       nav.goBack();
  //     }
  //   );
  // };
  const save = () => {
    API.put("/animals/update-age", {
      animalNumber,
      groupId,
      userId,
      age: animalAge,
    }).then(() => {
      alert("Saved");
      nav.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Animal Details</Text>

      <Text style={styles.label}>Animal Age</Text>
      <TextInput
        value={animalAge}
        onChangeText={setanimalAge}
        style={styles.input}
      />

      <TouchableOpacity onPress={save} style={styles.button}>
        <Text style={styles.buttonText}>Save Details</Text>
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
