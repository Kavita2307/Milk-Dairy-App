import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { API } from "../../api/api";
import { useRoute } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

interface Row {
  date: string;
  group1: number;
  group2: number;
  group3: number;
}

export default function GroupWiseDailyMilkAvgScreen() {
  const { userId } = useRoute<any>().params;

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);

      const res = await API.get("/report/group-wise-daily-milk-avg", {
        params: { userId },
      });

      setRows(res.data.data || []);
    } catch (e) {
      Alert.alert("Error", "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  const chartRows = rows.filter((r) => r.date !== "7 Day Avg");

  const labels = chartRows.map((r) =>
    new Date(r.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    })
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Milk Avg (Ltr, Group Wise)</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {/* TABLE */}
          <View style={styles.table}>
            <View style={styles.rowHeader}>
              <Text style={styles.cellHeader}>Date</Text>
              <Text style={styles.cellHeader}>Group 1</Text>
              <Text style={styles.cellHeader}>Group 2</Text>
              <Text style={styles.cellHeader}>Group 3</Text>
            </View>

            {rows.map((r) => (
              <View key={r.date} style={styles.row}>
                <Text style={styles.cell}>{r.date}</Text>
                <Text style={styles.cell}>{r.group1}</Text>
                <Text style={styles.cell}>{r.group2}</Text>
                <Text style={styles.cell}>{r.group3}</Text>
              </View>
            ))}
          </View>

          {/* GRAPH */}
          <LineChart
            data={{
              labels,
              datasets: [
                { data: chartRows.map((r) => r.group1) },
                { data: chartRows.map((r) => r.group2) },
                { data: chartRows.map((r) => r.group3) },
              ],
              legend: ["Group 1", "Group 2", "Group 3"],
            }}
            width={screenWidth - 16}
            height={260}
            yAxisSuffix=" L"
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: () => "#000",
              labelColor: () => "#555",
            }}
            bezier
            onDataPointClick={({ value, index, dataset }) => {
              Alert.alert(
                "Milk Avg",
                `Date: ${labels[index]}\nValue: ${value} L`
              );
            }}
          />
        </>
      )}
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  /* SCREEN */
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#1f2937",
  },

  /* TABLE */
  table: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3,
    overflow: "hidden",
  },

  rowHeader: {
    flexDirection: "row",
    backgroundColor: "#e8f0fe",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
  },

  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#e5e7eb",
  },

  lastRow: {
    backgroundColor: "#f3f4f6",
  },

  cellHeader: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
    color: "#111827",
  },

  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#374151",
  },

  cellBold: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  /* CHART */
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 3,
    marginBottom: 20,
  },

  chartTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1f2937",
  },

  /* LOADING */
  loaderContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
