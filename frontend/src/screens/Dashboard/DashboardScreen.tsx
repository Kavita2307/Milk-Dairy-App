import React from "react";
import type { ComponentProps } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/src/context/AuthContext";
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const menuItems: {
  id: string;
  title: string;
  icon: IconName;
  route: string;
}[] = [
  { id: "0", title: "Herd Info", icon: "cow", route: "Herd Info" },
  {
    id: "1",
    title: "Milking Groups",
    icon: "cow",
    route: "MilkingGroups",
  },
  {
    id: "2",
    title: "Non-Milking Groups",
    icon: "cow-off",
    route: "Non-MilkingGroups",
  },
  { id: "3", title: "Rations", icon: "file-document", route: "Rations" },
  { id: "4", title: "Leftover", icon: "delete", route: "Leftover" },
  { id: "5", title: "DM Correction", icon: "tune", route: "DM Correction" },
  { id: "6", title: "Stock", icon: "cart", route: "Stock" },
  { id: "7", title: "Display", icon: "exit-to-app", route: "Display" },
];

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Dashboard</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(item.route, { userId: user?.id })
            }
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 16,
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
  container: { flex: 1, padding: 20, justifyContent: "center" },
  heading: { fontSize: 28, marginBottom: 20, textAlign: "center" },
  button: {
    marginVertical: 10,
    backgroundColor: "#2d6cdf",
    padding: 15,
    borderRadius: 10,
  },
  btnText: { fontSize: 20, color: "#fff", textAlign: "center" },
});
