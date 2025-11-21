import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { API } from "../../api/api";

export default function RationScreen() {
  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("");

  const submit = () => {
    API.post("/ration", {
      groupId: Number(groupId),
      rationKg: Number(amount),
    }).then(() => alert("Ration added"));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Group ID:</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        value={groupId}
        onChangeText={setGroupId}
      />

      <Text>Ration (kg):</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        value={amount}
        onChangeText={setAmount}
      />

      <Button title="Submit" onPress={submit} />
    </View>
  );
}
