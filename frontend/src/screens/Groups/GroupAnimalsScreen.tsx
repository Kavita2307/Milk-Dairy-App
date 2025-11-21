import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { API } from "../../api/api";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function GroupAnimalsScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { groupId } = route.params;

  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    API.get("/animals").then((res) => {
      setAnimals(res.data.filter((a: any) => a.groupId === groupId));
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Animals in Group #{groupId}</Text>

      <Button
        title="Add Animal"
        onPress={() => nav.navigate("AddAnimal", { groupId })}
      />

      <FlatList
        data={animals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderWidth: 1, marginTop: 10 }}>
            <Text>#{item.animalNumber}</Text>
          </View>
        )}
      />
    </View>
  );
}
