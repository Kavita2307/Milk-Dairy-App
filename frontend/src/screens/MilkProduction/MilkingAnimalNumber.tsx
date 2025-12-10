import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { API } from "../../api/api";

export default function MilkingAnimalNumber() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId } = route.params;

  const [animals, setAnimals] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [animalNumber, setAnimalNumber] = useState("");

  // Fetch animals for this group
  const loadAnimals = () => {
    API.get("/animals").then((res) => {
      setAnimals(res.data.filter((a: any) => a.groupId === groupId));
    });
  };
  useEffect(() => {
    loadAnimals();
  }, [groupId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Animal List</Text>

      {/* Animal List */}
      <FlatList
        data={animals}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              key={item.id}
              style={styles.groupRow}
              onPress={() => {
                nav.navigate("ProductionShift", {
                  animalNumber: item.animalNumber,
                  groupId,
                  userId,
                });
              }}
            >
              <Text style={styles.itemText}>Animal #{item.animalNumber}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#f3f4f6",
    padding: 20,
    color: "black",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    paddingLeft: 8,
  },
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
  formBox: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },
  label: { marginBottom: 8, fontWeight: "600" },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
  },
  saveBtnText: { color: "#fff", textAlign: "center", fontWeight: "600" },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#9ca3af",
    padding: 14,
    borderRadius: 10,
  },
  cancelBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  itemText: { flex: 1, fontSize: 18, fontWeight: "500", color: "#1f2937" },
});
