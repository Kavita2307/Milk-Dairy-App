import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.header}>
      <Text style={styles.username}>👤 {user?.name || user?.email}</Text>

      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#cacdd4ff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: { color: "#fff", fontSize: 16, fontWeight: "600" },
  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "600" },
});
