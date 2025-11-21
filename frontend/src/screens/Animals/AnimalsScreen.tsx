import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { API } from "../../api/api";

export default function AnimalsScreen() {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/animals")
      .then((res) => setAnimals(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 15 }}>All Animals</Text>

      <FlatList
        data={animals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              borderWidth: 1,
              marginVertical: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Animal #{item.animalNumber}</Text>
            <Text style={{ fontSize: 14, color: "#555" }}>
              Group: {item.group?.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
