// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   TextInput,
//   Dimensions,
//   Button,
//   ScrollView,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { API } from "../../api/api";
// import { LineChart } from "react-native-chart-kit";
// import DailyFeedEfficiencyTable from "../../components/DailyFeedEfficiencyTable";
// // import * as Print from "expo-print";
// // import * as Sharing from "expo-sharing";
// // import * as FileSyste m from "expo-file-system";
// // import XLSX from "xlsx";
// // import RNFS from "react-native-fs";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const screenWidth = Dimensions.get("window").width;

// export default function DailyFeedEfficiency() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { userId } = route.params;
//   const [report, setReport] = useState<any>(null);
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const formatDate = (date: Date) => {
//     return date.toISOString().split("T")[0]; // YYYY-MM-DD
//   };
//   const loadReport = async () => {
//     const data = await API.post("/reports/daily-feed-efficiency", {
//       date: "2025-12-12",
//       tmrDmPercent: 50,
//       tmrCostPerKg: 15,
//     });
//     setReport(data);
//   };
//   const loadReportByDate = async (date: Date) => {
//     const data = await API.post("/reports/daily-feed-efficiency", {
//       groupId: 1,
//       date: formatDate(date),
//       tmrDmPercent: 50,
//       tmrCostPerKg: 15,
//     });

//     setReport(data);
//   };
//   useEffect(() => {
//     // loadReport();
//     loadReportByDate(selectedDate);
//   }, []);

//   /* ---------- PDF EXPORT ---------- */
//   // const exportPDF = async () => {
//   //   const html = `
//   //     <h1>Daily Feed Efficiency</h1>
//   //     <p>Date: ${report.date}</p>
//   //     <p>Total Milking Cows: ${report.totalMilkingCows}</p>
//   //     <p>Avg DM Intake/Cow: ${report.avgDMIntakePerCow}</p>
//   //     <p>DMI/Ltr Milk: ${report.dmiPerLtrMilk} g</p>
//   //     <p>Feeding Cost/Ltr: ₹${report.feedingCostPerLtr}</p>
//   //   `;

//   //   // const file = await RNHTMLtoPDF.convert({
//   //   //   html,
//   //   //   fileName: "daily_feed_efficiency",
//   //   //   base64: true,
//   //   // });
//   //   const { uri } = await Print.printToFileAsync({ html });
//   //   await Sharing.shareAsync(uri);

//   //   alert("PDF Exported: " + uri);
//   // };

//   /* ---------- EXCEL EXPORT ---------- */
//   // const exportExcel = async () => {
//   //   const ws = XLSX.utils.json_to_sheet([report]);
//   //   const wb = XLSX.utils.book_new();
//   //   XLSX.utils.book_append_sheet(wb, ws, "Report");

//   //   const excelData = XLSX.write(wb, {
//   //     type: "base64",
//   //     bookType: "xlsx",
//   //   });

//   //   const uri = FileSystem.documentDirectory + "daily_feed_efficiency.xlsx";

//   //   await FileSystem.writeAsStringAsync(uri, base64, {
//   //     encoding: FileSystem.EncodingType.Base64,
//   //   });

//   //   await Sharing.shareAsync(uri);
//   // };

//   // if (!report) return <Text>Loading...</Text>;

//   return (
//     // <ScrollView style={{ padding: 16 }}>
//     //   <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//     //     Daily Feed Efficiency
//     //   </Text>

//     //   <Text style={{ fontWeight: "bold" }}>Select Date</Text>

//     //   <Button
//     //     title={formatDate(selectedDate)}
//     //     onPress={() => setShowPicker(true)}
//     //   />
//     //   <Text>Total Milking Cows: {report.totalMilkingCows}</Text>
//     //   <Text>Avg TMR Intake/Cow: {report.avgTMRIntakePerCow} kg</Text>
//     //   <Text>Avg DM Intake/Cow: {report.avgDMIntakePerCow} kg</Text>
//     //   <Text>Total Milk: {report.totalMilkLtr} Ltr</Text>
//     //   <Text>DMI/Ltr Milk: {report.dmiPerLtrMilk} g</Text>
//     //   <Text>Feeding Cost/Ltr: ₹{report.feedingCostPerLtr}</Text>

//     //   {/* -------- GRAPH -------- */}
//     //   <LineChart
//     //     data={{
//     //       labels: ["DM Intake", "Milk Avg", "Cost/Ltr"],
//     //       datasets: [
//     //         {
//     //           data: [
//     //             report.avgDMIntakePerCow,
//     //             report.groupAvgMilk,
//     //             report.feedingCostPerLtr,
//     //           ],
//     //         },
//     //       ],
//     //     }}
//     //     width={screenWidth - 32}
//     //     height={220}
//     //     chartConfig={{
//     //       backgroundColor: "#ffffff",
//     //       backgroundGradientFrom: "#ffffff",
//     //       backgroundGradientTo: "#ffffff",
//     //       decimalPlaces: 2,
//     //       color: () => `#2e7d32`,
//     //       labelColor: () => "#000",
//     //     }}
//     //     style={{ marginVertical: 16 }}
//     //   />

//     //   {/* <Button title="Export PDF" onPress={exportPDF} /> */}
//     //   <View style={{ height: 10 }} />
//     //   {/* <Button title="Export Excel" onPress={exportExcel} /> */}
//     //   {showPicker && (
//     //     <DateTimePicker
//     //       value={selectedDate}
//     //       mode="date"
//     //       display="default"
//     //       onChange={(event, date) => {
//     //         setShowPicker(false);
//     //         if (date) {
//     //           setSelectedDate(date);
//     //           loadReportByDate(date);
//     //         }
//     //       }}
//     //     />
//     //   )}
//     // </ScrollView>
//     <ScrollView>
//       {report && <DailyFeedEfficiencyTable report={report} />}
//     </ScrollView>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API } from "../../api/api";
import { DailyFeedEfficiencyTable } from "../../components/DailyFeedEfficiencyTable";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const DailyFeedEfficiency = () => {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const loadReport = async (date: Date) => {
    try {
      setLoading(true);
      const response = await API.post("/reports/daily-feed-efficiency", {
        groupId: 1,
        date: formatDate(date),
        tmrDmPercent: 50,
        tmrCostPerKg: 15,
      });
      setReport(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport(selectedDate);
  }, []);

  return (
    <ScrollView style={{ padding: 10 }}>
      {/* DATE PICKER */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Select Date</Text>
        <Button
          title={formatDate(selectedDate)}
          onPress={() => setShowPicker(true)}
        />

        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowPicker(false);
              if (date) {
                setSelectedDate(date);
                loadReport(date);
              }
            }}
          />
        )}
      </View>

      {loading && <ActivityIndicator size="large" />}

      {/* REPORT TABLE */}
      {report && <DailyFeedEfficiencyTable report={report} />}
    </ScrollView>
  );
};

export default DailyFeedEfficiency;
