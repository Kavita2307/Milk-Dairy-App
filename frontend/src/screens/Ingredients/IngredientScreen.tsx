import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../api/api";

export default function InventoryScreen() {
  const nav = useNavigation();
  const [items, setItems] = useState<any[]>([]);

  const load = () => API.get("/ingredients").then((r) => setItems(r.data));
  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        onPress={() => nav.navigate("IngredientCreate")}
        style={styles.addBtn}
      >
        <Text style={{ color: "#fff" }}>+ ADD NEW</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => nav.navigate("IngredientDetail", { id: item.id })}
            style={styles.row}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.currentStock} kg</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
});
