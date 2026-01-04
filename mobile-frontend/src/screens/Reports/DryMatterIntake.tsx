import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { API } from "../../api/api";
import { useRoute } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

/* -------------------- */
/* TYPES */
/* -------------------- */

interface DailyDmiRow {
  date: string;
  group1: number;
  group2: number;
  group3: number;
}

interface DailyAverageDmiResponse {
  from: string;
  to: string;
  data: DailyDmiRow[];
}

/* -------------------- */
/* UTIL: LOCAL DATE */
/* -------------------- */

const formatLocalDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/* -------------------- */
/* SCREEN */
/* -------------------- */

export default function DailyAverageDMIScreen() {
  const [labels, setLabels] = useState<string[]>([]);
  const [g1, setG1] = useState<number[]>([]);
  const [g2, setG2] = useState<number[]>([]);
  const [g3, setG3] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute<any>();

  const { userId } = route.params;

  useEffect(() => {
    loadReport();
  }, []);

  const safeNumber = (value: unknown): number =>
    typeof value === "number" && isFinite(value) ? value : 0;
  const formatChartDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const loadReport = async () => {
    try {
      setLoading(true);

      const toDate = new Date();
      const fromDate = new Date();
      fromDate.setDate(toDate.getDate() - 6);

      const from = formatLocalDate(fromDate);
      const to = formatLocalDate(toDate);

      const res = await API.get<DailyAverageDmiResponse>(
        "/report/daily-average-dmi",
        { params: { from, to, userId } }
      );
      console.log("daily-average-dmi controller hit");
      console.log("FROM:", fromDate, "TO:", toDate);

      const rows = res.data.data || [];
      console.log("rows: ", rows);
      setLabels(rows.map((r) => formatChartDate(r.date)));
      //setLabels(rows.map((r) => new Date(r.date).getDate().toString()));

      setG1(rows.map((r) => safeNumber(r.group1)));
      setG2(rows.map((r) => safeNumber(r.group2)));
      setG3(rows.map((r) => safeNumber(r.group3)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Average DMI of Milking Groups (kg)</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: g1,
                color: () => "#2979FF",
                strokeWidth: 2,
              },
              {
                data: g2,
                color: () => "#FF9800",
                strokeWidth: 2,
              },
              {
                data: g3,
                color: () => "#4CAF50",
                strokeWidth: 2,
              },
            ],
            legend: ["Group 1", "Group 2", "Group 3"],
          }}
          width={screenWidth - 16}
          height={280}
          yAxisSuffix=" kg"
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 1,
            color: () => "#000",
            labelColor: () => "#555",
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#000",
            },
          }}
          bezier
          style={styles.chart}
          onDataPointClick={({ value, index }) => {
            Alert.alert(
              "DMI Detail",
              `Date: ${labels[index]}\nValue: ${value} kg`
            );
          }}
        />
      )}
    </ScrollView>
  );
}

/* -------------------- */
/* STYLES */
/* -------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 10,
    textAlign: "center",
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8,
  },
});
