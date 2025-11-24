import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";

export default function AnimalNumbersScreen() {
  const route = useRoute<any>();
  const { groupId } = route.params;
  const nav = useNavigation<any>();

  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    API.get("/animals").then((res) => {
      setAnimals(res.data.filter((a: any) => a.groupId === groupId));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Animal Numbers</Text>

      <TouchableOpacity
        onPress={() => nav.navigate("AnimalDetails", { groupId })}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>➕ Add New Animal</Text>
      </TouchableOpacity>

      <FlatList
        data={animals}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Animal #{item.animalNumber}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    // basic shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elevation for Android
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
