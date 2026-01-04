import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { API } from "../../api/api";
import { useRoute } from "@react-navigation/native";

/* -------------------- */
/* TYPES */
/* -------------------- */

interface CowMilkRow {
  date: string;
  milk: number;
}

interface CowWiseMilkReport {
  cowNo: string;
  from: string;
  to: string;
  rows: CowMilkRow[];
  avg7Day: number;
}

/* -------------------- */
/* UTIL */
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

export default function CowWiseMilkReportScreen() {
  const route = useRoute<any>();
  const { userId } = route.params;

  const [fromDate, setFromDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    return d;
  });
  const [toDate, setToDate] = useState<Date>(new Date());

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [cowNo, setCowNo] = useState<string>("1");
  const [manualCowNo, setManualCowNo] = useState("");

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<CowWiseMilkReport | null>(null);
  const [cowList, setCowList] = useState<string[]>([]);
  const loadCowNumbers = async () => {
    try {
      const res = await API.get("/report/cow-numbers", {
        params: { userId },
      });

      setCowList(res.data.cows || []);
      console.log("Animal Number:", res.data.cows);
    } catch (error) {
      console.error("Failed to load cow numbers", error);
    }
  };

  useEffect(() => {
    loadCowNumbers();
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);

      const res = await API.get<CowWiseMilkReport>("/report/cow-wise-milk", {
        params: {
          userId,
          cowNo,
          from: formatLocalDate(fromDate),
          to: formatLocalDate(toDate),
        },
      });

      setReport(res.data);
    } catch (error) {
      console.error("Cow report error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Cow Wise Milk Yield Report</Text>

      {/* DATE FILTER */}
      <View style={styles.filterRow}>
        <Button
          title={`From: ${fromDate.toDateString()}`}
          onPress={() => setShowFromPicker(true)}
        />
        <Button
          title={`To: ${toDate.toDateString()}`}
          onPress={() => setShowToPicker(true)}
        />
      </View>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          onChange={(_, d) => {
            setShowFromPicker(false);
            if (d) setFromDate(d);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          onChange={(_, d) => {
            setShowToPicker(false);
            if (d) setToDate(d);
          }}
        />
      )}

      {/* COW SELECT */}
      <Text style={styles.sectionTitle}>Select Cow No</Text>

      <View style={styles.dropdown}>
        <Picker
          selectedValue={cowNo}
          onValueChange={(v) => {
            setCowNo(v);
            setManualCowNo("");
          }}
        >
          {cowList.map((c) => (
            <Picker.Item key={c} label={`Animal Number: ${c}`} value={c} />
          ))}
          {cowList.length === 0 && (
            <Text style={{ color: "red", textAlign: "center" }}>
              No cows found
            </Text>
          )}
        </Picker>
      </View>

      {/* MANUAL INPUT */}
      <TextInput
        placeholder="Or enter cow number"
        value={manualCowNo}
        onChangeText={(v) => {
          setManualCowNo(v);
          if (v) setCowNo(v);
        }}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="View Report" onPress={loadReport} />

      {loading && <ActivityIndicator size="large" />}

      {/* REPORT TABLE */}
      {report && (
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={styles.cellHeader}>Date</Text>
            <Text style={styles.cellHeader}>Milk Yield (Ltr)</Text>
          </View>

          {report.rows.map((r) => (
            <View key={r.date} style={styles.row}>
              <Text style={styles.cell}>{r.date}</Text>
              <Text style={styles.cell}>{r.milk}</Text>
            </View>
          ))}

          <View style={styles.rowFooter}>
            <Text style={styles.cellFooter}>7 Day Avg</Text>
            <Text style={styles.cellFooter}>{report.avg7Day}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

/* -------------------- */
/* STYLES */
/* -------------------- */

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 8,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 12,
  },
  rowHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 0.5,
  },
  rowFooter: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#f0f0f0",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  cellHeader: {
    flex: 1,
    fontWeight: "700",
    textAlign: "center",
  },
  cellFooter: {
    flex: 1,
    fontWeight: "700",
    textAlign: "center",
  },
});
