// src/screens/InventoryScreen.tsx
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { API } from "../../api/api";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function InventoryScreen({ navigation }: any) {
  const [items, setItems] = useState<any[]>([]);
  const nav = useNavigation<any>();

  const load = async () => {
    const res = await API.get("/ingredients");
    setItems(res.data);
  };
  useEffect(() => {
    const unsub = nav.addListener("focus", load);
    return unsub;
  }, [nav]);

  return (
    <View style={{ padding: 16 }}>
      <TouchableOpacity
        onPress={() => nav.navigate("AddIngredient")}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+ Add Ingredient</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <View>
              <TouchableOpacity
                key={item.id}
                style={styles.groupRow}
                onPress={() => {
                  nav.navigate("IngredientDetail", {
                    ingredientId: item.id,
                  });
                }}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  groupRow: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  itemText: { flex: 1, fontSize: 18, fontWeight: "500", color: "#1f2937" },
});
