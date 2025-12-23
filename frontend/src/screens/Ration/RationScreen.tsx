import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { API } from "../../api/api";
import { useRoute } from "@react-navigation/native";

export default function RationScreen() {
  const route = useRoute<any>();
  const { groupId, userId } = route.params;

  const [ration, setRation] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const loadRation = () => {
    API.get(`/ration/${groupId}`).then((res) => {
      setRation(res.data.ration);
      setIngredients(res.data.ingredients);
    });
  };

  useEffect(() => {
    loadRation();
  }, []);

  if (!ration) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="food" size={22} color="#0EA5E9" />
          <Text style={styles.headerTitle}>Feedsection</Text>
        </View>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="plus-circle"
            size={26}
            color="#10B981"
          />
        </TouchableOpacity>
      </View>

      {/* Feed Section */}
      <View style={styles.card}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeadText}>Name</Text>
          <Text style={styles.tableHeadText}>No</Text>
          <Text style={styles.tableHeadText}>Kg</Text>
          <Text style={styles.tableHeadText}>Total</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowText}>{ration.name}</Text>
          <Text style={styles.rowText}>{ration.no}</Text>
          <Text style={styles.rowText}>{ration.kg}</Text>
          <Text style={styles.rowText}>{ration.total}</Text>
        </View>
      </View>

      {/* Load Info */}
      <View style={styles.loadCard}>
        <View style={styles.loadRow}>
          <Text style={styles.loadLabel}>This Load</Text>
          <Text style={styles.loadValue}>{ration.thisLoad}</Text>
        </View>

        <View style={styles.loadRow}>
          <Text style={styles.loadLabel}>Last Load</Text>
          <Text style={styles.loadValue}>{ration.lastLoad}</Text>
        </View>

        <View style={styles.loadRow}>
          <Text style={styles.loadLabel}>Diff</Text>
          <Text style={styles.loadValue}>{ration.diff}</Text>
        </View>
      </View>

      {/* Ration Size & Days */}
      <View style={styles.bottomInfoCard}>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons
            name="percent-outline"
            size={20}
            color="#0EA5E9"
          />
          <Text style={styles.bottomText}>Ration Size</Text>
          <Text style={styles.bottomValue}>{ration.rationSize}</Text>
        </View>

        <View style={styles.iconRow}>
          <Feather name="calendar" size={20} color="#0EA5E9" />
          <Text style={styles.bottomText}>Days</Text>
          <Text style={styles.bottomValue}>{ration.days}</Text>
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="leaf" size={22} color="#10B981" />
          <Text style={styles.headerTitle}>Ingredients</Text>
        </View>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="plus-circle"
            size={26}
            color="#10B981"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingRow}>
            <Text style={styles.ingText}>{item.name}</Text>
            <Text style={styles.ingText}>{item.kg}</Text>
            <Text style={styles.ingText}>{item.total}</Text>
            <MaterialCommunityIcons name="plus" size={22} color="#0EA5E9" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#F3F4F6" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#1F2937" },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  tableHeader: { flexDirection: "row", justifyContent: "space-between" },
  tableHeadText: { fontWeight: "700", color: "#334155" },
  tableRow: { flexDirection: "row", justifyContent: "space-between" },
  rowText: { width: "25%", color: "#374151" },
  loadCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
  },
  loadRow: { flexDirection: "row", justifyContent: "space-between" },
  loadLabel: { fontWeight: "600", color: "#374151" },
  loadValue: { color: "#111827" },
  bottomInfoCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
  },
  iconRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  bottomText: { marginLeft: 6, fontWeight: "600", color: "#374151" },
  bottomValue: { marginLeft: "auto", color: "#111827" },
  ingRow: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  ingText: { width: "25%", color: "#374151" },
});
