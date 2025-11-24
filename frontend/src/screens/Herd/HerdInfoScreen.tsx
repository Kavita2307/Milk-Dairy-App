import React from "react";
import type { ComponentProps } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const menuItems: {
  id: string;
  title: string;
  icon: IconName;
  route: string;
}[] = [
  { id: "0", title: "Milking Group", icon: "cow", route: "MilkingGroups" },
  {
    id: "1",
    title: "Non-Milking Group",
    icon: "cow-off",
    route: "NonMilkingGroups",
  },
];
export default function HerdInfoScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Herd Information</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.route)}
            style={styles.menuItem}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={30}
              color="#0284C7"
              style={{ width: 40 }}
            />

            <Text style={styles.menuTitle}>{item.title}</Text>

            <Feather name="chevron-right" size={28} color="#0284C7" />
          </TouchableOpacity>
        )}
      />

      {/* Milking */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("MilkingGroup")}
        style={styles.card}
      >
        <Text style={styles.cardText}>Milking Group</Text>
        <Feather name="chevron-right" size={26} color="#0ea5e9" />
      </TouchableOpacity> */}

      {/* Non Milking */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("NonMilkingGroup")}
        style={styles.card}
      >
        <Text style={styles.cardText}>Non-Milking Group</Text>
        <Feather name="chevron-right" size={26} color="#0ea5e9" />
      </TouchableOpacity> */}
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
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  cardText: {
    flex: 1,
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "600",
  },
});
