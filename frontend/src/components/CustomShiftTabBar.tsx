import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabRow}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[
              styles.tabButton,
              focused ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.tabLabel,
                focused ? styles.activeText : styles.inactiveText,
              ]}
            >
              {options.title || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    padding: 6,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 4,
    marginVertical: 2,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#FEF3C7",
  },
  inactiveTab: {
    backgroundColor: "#FFFBEB",
  },

  tabLabel: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  activeText: {
    color: "#B45309", // deep ocean blue
  },
  inactiveText: {
    color: "#F59E0B", // sky blue 400
  },
});
