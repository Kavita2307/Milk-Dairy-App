import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { API } from "../../api/api";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function AddAnimalScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { groupId } = route.params;

  const [animalNumber, setAnimalNumber] = useState("");

  const save = () => {
    API.post("/animals", { animalNumber, groupId }).then(() => {
      alert("Animal added");
      nav.goBack();
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Animal Number:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        value={animalNumber}
        onChangeText={setAnimalNumber}
      />
      <Button title="Save" onPress={save} />
    </View>
  );
}
