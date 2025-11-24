import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NonMilkingGroupScreen() {
  const nav = useNavigation<any>();

  const data = [
    { id: 4, name: "Group 4 – Starter calf (0–2 months)" },
    { id: 5, name: "Group 5 – Starter calf (3–6 months)" },
    { id: 6, name: "Group 6 – Grower calf (6–12 months)" },
    { id: 7, name: "Group 7 – Heifer (12–24 months)" },
    { id: 8, name: "Group 8 – Dry cow (Far off -60 to -21 days)" },
    { id: 9, name: "Group 9 – Dry cow (Close up -21 to 0 days)" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Non-Milking Groups</Text>

      {data.map((g) => (
        <TouchableOpacity
          key={g.id}
          style={styles.card}
          onPress={() => nav.navigate("GroupAnimals", { groupId: g.id })}
        >
          <Text style={styles.cardText}>{g.name}</Text>
          {/* <Feather name="chevron-right" size={26} color="#0ea5e9" /> */}
        </TouchableOpacity>
      ))}
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
});
