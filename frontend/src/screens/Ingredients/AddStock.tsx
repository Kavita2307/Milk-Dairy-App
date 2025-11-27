import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { API } from "../../api/api";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function AddStock() {
  const route = useRoute<any>();
  const nav = useNavigation();
  const { id } = route.params;
  const [qty, setQty] = useState("");

  const save = () => {
    const quantity = parseFloat(qty);
    if (!quantity || quantity <= 0) return alert("Invalid qty");
    API.post(`/ingredients/${id}/add-stock`, { quantity }).then(() => {
      alert("Stock added");
      nav.goBack();
    });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Quantity (kg)</Text>
      <TextInput
        value={qty}
        onChangeText={setQty}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 12, marginVertical: 12 }}
      />
      <TouchableOpacity
        onPress={save}
        style={{ backgroundColor: "#10b981", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: "#fff" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
