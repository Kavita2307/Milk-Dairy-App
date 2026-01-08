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
import { useAuth } from "../../context/AuthContext";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const menuItems: {
  id: string;
  title: string;
  icon: IconName;
  route: string;
  color: string;
}[] = [
  {
    id: "0",
    title: "Herd Information",
    icon: "cow",
    route: "Herd Information",
    color: "#16A34A",
  },
  {
    id: "1",
    title: "Ration",
    icon: "food",
    route: "RationGroup",
    color: "#EA580C",
  },
  {
    id: "2",
    title: "Milk Production",
    icon: "cup-water",
    route: "MilkGroup",
    color: "#0284C7",
  },
  {
    id: "3",
    title: "Leftover",
    icon: "food-off",
    route: "LeftoverGroup",
    color: "#DC2626",
  },
  {
    id: "6",
    title: "Ingredients Store",
    icon: "cart",
    route: "Inventory",
    color: "#7C3AED",
  },
  {
    id: "7",
    title: "Report",
    icon: "file-chart",
    route: "Reports",
    color: "#0F766E",
  },
  {
    id: "8",
    title: "Weight Display",
    icon: "monitor-dashboard",
    route: "Display",
    color: "#9333EA",
  },
  {
    id: "9",
    title: "Test Screen",
    icon: "flask",
    route: "TestScreen",
    color: "#DB2777",
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  return (
    <View style={styles.screen}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate(item.route, { userId: user?.id })
            }
            style={styles.card}
          >
            {/* Icon */}
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: `${item.color}20` },
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color={item.color}
              />
            </View>

            {/* Title */}
            <View style={styles.textWrapper}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              {/* <Text style={styles.menuSub}>Tap to open</Text> */}
            </View>

            <Feather name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 14,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  textWrapper: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  menuSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
});
