import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API } from "../../api/api";
import { DailyFeedEfficiencyReport } from "../../types/models";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const groupNames: Record<string, string> = {
  "1": "Group 1 (High Yielder)",
  "2": "Group 2 (Medium Yielder)",
  "3": "Group 3 (Low Yielder)",
  "4": "Group 4 (Calves)",
  "5": "Group 5 (Starter)",
  "6": "Group 6 (Grower)",
  "7": "Group 7 (Heifer)",
  "8": "Group 8 (Dry)",
  "9": "Group 9 (Dry Close Up)",
};

export default function DailyFeedEfficiencyScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<DailyFeedEfficiencyReport | null>(null);
  const route = useRoute<any>();
  const [selectedGroupId, setSelectedGroupId] = useState<string>("1");
  const [groupId, setGroupId] = useState(1);
  const { userId } = route.params;

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // const exportToExcel = async () => {
  //   if (!report) {
  //     alert("No report data to export");
  //     return;
  //   }

  //   const data = Object.entries(report.groups).map(([id, g]) => ({
  //     Group: groupNames[id],
  //     Animals: g.animals,
  //     Milk: g.totalMilk,
  //     AvgMilk: g.avgMilk,
  //     TMRFed: g.tmrFed,
  //     TMRIntake: g.tmrIntake,
  //   }));

  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Daily Report");

  //   const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

  //   const path = `${RNFS.DownloadDirectoryPath}/DailyFeedReport.xlsx`;

  //   await RNFS.writeFile(path, wbout, "ascii");

  //   alert("✅ Excel exported to Downloads folder");
  // };
  // const exportToPDF = async () => {
  //   const file = await pdf.convert({
  //     html: "<h1>Daily Feed Report</h1>",
  //     fileName: "DailyFeedReport",
  //     directory: "Documents",
  //   });

  //   alert(`PDF saved at ${file.filePath}`);
  // };

  const loadReport = async (selectedDate: Date) => {
    try {
      setLoading(true);

      const formattedDate = formatLocalDate(selectedDate);
      console.log("date and userId", formattedDate, userId);
      const response = await API.get("/report/daily-feed-efficiency", {
        params: { userId, groupId, date: formattedDate },
      });
      console.log("response: ", response.data);
      setReport(response.data);
      console.log("REPORT GROUPS:", report?.groups);
    } catch (error) {
      console.error("Failed to load report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport(date);
    const firstGroupId = Object.keys(groupNames)[0];
    if (firstGroupId) {
      setSelectedGroupId(firstGroupId);
    }
    console.log("Default groupId:", selectedGroupId);
  }, [date]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.exportRow}>
        {/* <Button title="Excel" onPress={exportToExcel} /> */}
        {/* <Button title="PDF" onPress={exportToPDF} /> */}
      </View>

      {/* DATE PICKER */}
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>Date: {date.toDateString()}</Text>
        <Button title="Change Date" onPress={() => setShowPicker(true)} />
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDate(selectedDate);
              loadReport(selectedDate);
            }
          }}
        />
      )}

      {loading && <ActivityIndicator size="large" />}

      {report && (
        <>
          {/* SUMMARY */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Daily Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.label}>Total Herd</Text>
              <Text style={styles.value}>{report.totalHerdStrength}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.label}>Total Milk (Ltr)</Text>
              <Text style={styles.value}>{report.totalMilk}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.label}>Feed Cost (₹)</Text>
              <Text style={styles.value}>{report.totalFeedCost}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.label}>Feed / Ltr (₹)</Text>
              <Text style={styles.value}>{report.feedCostPerLiter}</Text>
            </View>
          </View>

          {/* GROUP WISE */}
          <Text style={styles.sectionTitle}>Select Group</Text>

          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedGroupId}
              onValueChange={(value) => {
                setSelectedGroupId(value);
                setGroupId(Number(value));
              }}
              style={styles.picker}
              dropdownIconColor="#333"
            >
              {Object.entries(groupNames).map(([id, name]) => (
                <Picker.Item key={id} label={name} value={id} />
              ))}
            </Picker>
          </View>

          <Text style={styles.sectionTitle}>Group Wise Report</Text>

          {Object.entries(report.groups)
            .filter(([groupId]) => groupId === selectedGroupId)
            .map(([groupId, g]) => (
              <View key={groupId} style={styles.groupCard}>
                <Text style={styles.groupTitle}>{groupNames[groupId]}</Text>

                <View style={styles.row}>
                  <Text style={styles.label}>Animals</Text>
                  <Text style={styles.value}>{g.animals}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Milk (Ltr)</Text>
                  <Text style={styles.value}>{g.totalMilk}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Avg Milk / Cow</Text>
                  <Text style={styles.value}>{g.avgMilk}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>TMR Intake (kg)</Text>
                  <Text style={styles.value}>{g.tmrIntake}</Text>
                </View>
              </View>
            ))}
        </>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f4f6f8",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 5,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  groupCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  label: {
    color: "#555",
    fontSize: 14,
  },
  value: {
    fontWeight: "600",
    fontSize: 14,
  },
  picker: {
    height: 190,
  },
  exportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
