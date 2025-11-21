import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import InputField from "../../components/InputField";
import { API } from "../../api/api";

export default function LeftoverScreen() {
  const [groupId, setGroupId] = useState("");
  const [leftoverKg, setLeftoverKg] = useState("");

  const submit = () => {
    if (!groupId || !leftoverKg) {
      return Alert.alert("Error", "All fields are required");
    }

    API.post("/leftover", {
      groupId: Number(groupId),
      leftoverKg: Number(leftoverKg),
    })
      .then(() => Alert.alert("Success", "Leftover added"))
      .catch(() => Alert.alert("Error", "Failed to submit"));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Leftover Entry</Text>

      <InputField
        label="Group ID"
        value={groupId}
        onChangeText={setGroupId}
        keyboardType="numeric"
      />
      <InputField
        label="Leftover (kg)"
        value={leftoverKg}
        onChangeText={setLeftoverKg}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={submit} />
    </View>
  );
}
