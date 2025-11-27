import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { API } from "../../api/api";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function IngredientDetail() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { id } = route.params;
  const [ing, setIng] = useState<any>(null);

  const load = () => API.get(`/ingredients/${id}`).then((r) => setIng(r.data));
  useEffect(() => {
    load();
  }, []);

  if (!ing) return <Text>Loading...</Text>;

  // compute estimated days: if average daily consumption is X (from consumption history), days = currentStock / X
  // For simplicity, compute average of last 7 consumptions
  const consumptions = ing.consumptions || [];
  const avgDaily = consumptions.length
    ? consumptions.reduce((s: any, c: any) => s + c.quantity, 0) /
      Math.max(consumptions.length, 1)
    : 0;
  const estDays = avgDaily ? (ing.currentStock / avgDaily).toFixed(1) : "—";

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{ing.name}</Text>
      <Text>Price/kg: {ing.details?.pricePerKg ?? "—"}</Text>
      <Text>Dry matter: {ing.details?.dryMatterPct ?? "—"}%</Text>
      <Text>Available stock: {ing.currentStock} kg</Text>
      <Text>Avg consumption: {avgDaily.toFixed(2)} kg</Text>
      <Text>Estimated days: {estDays}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => nav.navigate("AddStock", { id })}
      >
        <Text style={{ color: "#fff" }}>+ Add Stock</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#ef4444" }]}
        onPress={() => nav.navigate("RecordConsumption", { id })}
      >
        <Text style={{ color: "#fff" }}>Record Consumption</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 16, fontWeight: "700" }}>Stock History</Text>
      {ing.stockEntries.map((s: any) => (
        <View key={s.id}>
          <Text>
            {new Date(s.createdAt).toLocaleString()} — +{s.quantity} kg
          </Text>
        </View>
      ))}

      <Text style={{ marginTop: 16, fontWeight: "700" }}>
        Consumption History
      </Text>
      {ing.consumptions.map((c: any) => (
        <View key={c.id}>
          <Text>
            {new Date(c.createdAt).toLocaleString()} — {c.quantity} kg
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#10b981",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 12,
    alignItems: "center",
  },
});
