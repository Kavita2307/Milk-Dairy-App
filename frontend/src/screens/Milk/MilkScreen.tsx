import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { API } from "../../api/api";

export default function MilkScreen() {
  const [groupId, setGroupId] = useState("");
  const [shift, setShift] = useState("");
  const [milkLit, setMilkLit] = useState("");

  const submit = () => {
    API.post("/milk", {
      groupId: Number(groupId),
      shift,
      milkLit: Number(milkLit),
    }).then(() => alert("Milk saved"));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Group ID:</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        value={groupId}
        onChangeText={setGroupId}
      />

      <Text>Shift (morning/afternoon/evening):</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        value={shift}
        onChangeText={setShift}
      />

      <Text>Milk (liters):</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        value={milkLit}
        onChangeText={setMilkLit}
      />

      <Button title="Save" onPress={submit} />
    </View>
  );
}
