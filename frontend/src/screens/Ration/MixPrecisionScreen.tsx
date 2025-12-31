import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function MixPrecisionScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { groupId, rationId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mix Precision</Text>

      <Text style={styles.text}>Group ID: {groupId}</Text>
      <Text style={styles.text}>Ration ID: {rationId}</Text>

      {/* Next steps will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  text: { fontSize: 16, marginBottom: 8 },
});
