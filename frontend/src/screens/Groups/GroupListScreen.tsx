import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../api/api";

export default function GroupListScreen() {
  const [groups, setGroups] = useState([]);
  const nav = useNavigation<any>();

  useEffect(() => {
    API.get("/groups").then((res) => setGroups(res.data));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Groups</Text>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 15,
              borderWidth: 1,
              marginBottom: 10,
              borderRadius: 10,
            }}
            onPress={() => nav.navigate("GroupAnimals", { groupId: item.id })}
          >
            <Text style={{ fontSize: 16 }}>
              {item.name} ({item.category})
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
