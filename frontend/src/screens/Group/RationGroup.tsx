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

export default function RationGroupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId } = route.params;
  const menuItems = [
    {
      id: 1,
      title: "Group 1 (High Yielder)",
      icon: "full-milk-can",
      route: "Ration",
    },
    {
      id: 2,
      title: "Group 2 (Medium Yielder)",
      icon: "3/4full-milk-can",
      route: "Ration",
    },
    {
      id: 3,
      title: "Group 3 (Low Yielder)",
      icon: "half-milk-can",
      route: "Ration",
    },
    {
      id: 4,
      title: "Group 4 – Starter calf (0–2 months)",
      route: "Ration",
    },
    {
      id: 5,
      title: "Group 5 – Starter calf (3–6 months)",
      route: "Ration",
    },
    {
      id: 6,
      title: "Group 6 – Grower calf (6–12 months)",
      route: "Ration",
    },
    {
      id: 7,
      title: "Group 7 – Heifer (12–24 months)",
      route: "Ration",
    },
    {
      id: 8,
      title: "Group 8 – Dry cow (Far off -60 to -21 days)",
      route: "Ration",
    },
    {
      id: 9,
      title: "Group 9 – Dry cow (Close up -21 to 0 days)",
      route: "Ration",
    },
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Milking Groups</Text> */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.groupRow}
            onPress={() =>
              nav.navigate(item.route, {
                groupId: item.id,
                userId,
                groupTitle: item.title,
              })
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
    paddingTop: 25,
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
