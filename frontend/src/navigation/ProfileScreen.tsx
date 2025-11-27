import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Profile Details</Text> */}

      <Text style={styles.label}>Name : </Text>
      <Text style={styles.labeldata}>{user?.name}</Text>
      <Text style={styles.label}>Email : </Text>
      <Text style={styles.labeldata}>{user?.email}</Text>
      <Text style={styles.label}>User ID : </Text>
      <Text style={styles.labeldata}>{user?.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  labeldata: { fontSize: 18, marginBottom: 15 },
});
