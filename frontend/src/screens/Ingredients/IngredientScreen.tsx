import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { API } from "../../api/api";

export default function IngredientScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/ingredients").then((res) => setData(res.data));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Ingredients</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }}>
            {item.name} — {item.stockKg} kg
          </Text>
        )}
      />
    </View>
  );
}
