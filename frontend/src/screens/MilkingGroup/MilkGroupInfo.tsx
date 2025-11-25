import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MilkingGroupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId } = route.params;
  const menuItems = [
    {
      id: 1,
      title: "Ration",
      icon: "full-milk-can",
      route: "Ration",
    },
    {
      id: 2,
      title: "Leftover",
      icon: "3/4full-milk-can",
      route: "Leftover",
    },
    {
      id: 3,
      title: "Milk Production",
      icon: "half-milk-can",
      route: "MilkProduction",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Milking Groups Info</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.groupRow}
            onPress={() =>
              nav.navigate(item.route, { groupId: item.id, userId })
            }
          >
            <Text style={styles.groupText}>{item.title}</Text>
            <Feather name="chevron-right" size={26} color="#0ea5e9" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 24,
  },
  groupRow: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  groupText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
});
