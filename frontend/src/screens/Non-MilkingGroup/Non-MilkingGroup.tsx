import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NonMilkingGroupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId } = route.params;
  const menuItems = [
    {
      id: 4,
      title: "Group 4 – Starter calf (0–2 months)",
      route: "Non-MilkGroupInfo",
    },
    {
      id: 5,
      title: "Group 5 – Starter calf (3–6 months)",
      route: "Non-MilkGroupInfo",
    },
    {
      id: 6,
      title: "Group 6 – Grower calf (6–12 months)",
      route: "Non-MilkGroupInfo",
    },
    {
      id: 7,
      title: "Group 7 – Heifer (12–24 months)",
      route: "Non-MilkGroupInfo",
    },
    {
      id: 8,
      title: "Group 8 – Dry cow (Far off -60 to -21 days)",
      route: "Non-MilkGroupInfo",
    },
    {
      id: 9,
      title: "Group 9 – Dry cow (Close up -21 to 0 days)",
      route: "Non-MilkGroupInfo",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Non-Milking Groups</Text>

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
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    // Basic shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    // Elevation for Android
    elevation: 1,
  },
  cardText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
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
