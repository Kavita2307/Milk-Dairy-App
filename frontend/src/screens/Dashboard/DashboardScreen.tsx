import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DashboardScreen() {
  const nav = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ED Management</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => nav.navigate("Groups")}
      >
        <Text style={styles.btnText}>Herd Groups</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => nav.navigate("Ingredients")}
      >
        <Text style={styles.btnText}>Ingredient Store</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => nav.navigate("Reports")}
      >
        <Text style={styles.btnText}>Reports</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
