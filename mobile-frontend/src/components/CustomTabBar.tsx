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
    backgroundColor: "#F0F9FF",
    padding: 6,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#2217b9ff",
  },
  inactiveTab: {
    backgroundColor: "#F0F9FF",
  },

  tabLabel: {
    fontSize: 14,
    fontWeight: "700",
  },

  activeText: {
    color: "white", // deep ocean blue
  },
  inactiveText: {
    color: "#38BDF8", // sky blue 400
  },
});
