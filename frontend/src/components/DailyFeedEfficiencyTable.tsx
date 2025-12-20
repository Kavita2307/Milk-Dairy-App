import React from "react";
import { View, Text } from "react-native";
import { tableStyles as s } from "../styles/reportTable.styles";

const Cell = ({ value, style = {} }: any) => (
  <Text style={[s.cell, style]}>{value}</Text>
);

export const DailyFeedEfficiencyTable = ({ report }: any) => {
  return (
    <View style={s.table}>
      {/* TITLE */}
      <View style={s.row}>
        <Cell
          value={`1. Daily Feed Efficiency - Date: ${report.date}`}
          style={[s.titleCell]}
        />
      </View>

      {/* HEADER INFO */}
      <View style={s.row}>
        <Cell value="Total Milking Cows" style={s.header} />
        <Cell value={report.totalMilkingCows} />
        <Cell value="TMR DM (%)" style={s.header} />
        <Cell value="50%" />
      </View>

      {/* GROUP HEADER */}
      <View style={s.row}>
        <Cell value="" />
        <Cell value="Group 1 (High Milk Yielders)" style={s.header} />
        <Cell value="Group 2 (Medium Milk Yielders)" style={s.header} />
        <Cell value="Group 3 (Low Milk Yielders)" style={s.header} />
      </View>

      {/* DATA ROWS */}
      <View style={s.row}>
        <Cell value="No of Milking Cows" />
        <Cell value={report.totalMilkingCows} />
        <Cell value="Logic same as Group 1" />
        <Cell value="Logic same as Group 1" />
      </View>

      <View style={s.row}>
        <Cell value="Total TMR Fed (kg)" />
        <Cell value={report.totalTMRFedKg} />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={s.row}>
        <Cell value="Leftover (kg)" />
        <Cell value={report.leftoverKg} />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={s.row}>
        <Cell value="Leftover (%)" />
        <Cell value={report.leftoverPercent} />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={s.row}>
        <Cell value="Avg TMR Intake (Per Cow, kg)" />
        <Cell value={report.avgTMRIntakePerCow} />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={s.row}>
        <Cell value="Avg DM Intake (Per Cow, kg)" />
        <Cell value={report.avgDMIntakePerCow} />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={s.row}>
        <Cell value="Total Milk (Ltr)" />
        <Cell value={report.totalMilkLtr} />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={s.row}>
        <Cell value="Group Avg (Ltr)" />
        <Cell value={report.groupAvgMilk} />
        <Cell value="" />
        <Cell value="" />
      </View>

      {/* HIGHLIGHT ROWS */}
      <View style={[s.row, s.blueRow]}>
        <Cell value="DMI / Ltr Milk (g)" />
        <Cell value={report.dmiPerLtrMilk} />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={[s.row, s.blueRow]}>
        <Cell value="TMR Cost (Rs/kg)" />
        <Cell value="15" />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={[s.row, s.blueRow]}>
        <Cell value="Feeding Cost (Rs/day/cow)" />
        <Cell value={report.feedingCostPerCow} />
        <Cell value="" />
        <Cell value="" />
      </View>

      <View style={[s.row, s.blueRow]}>
        <Cell value="Feeding Cost (Rs/Ltr)" />
        <Cell value={report.feedingCostPerLtr} />
        <Cell value="" />
        <Cell value="" />
      </View>
    </View>
  );
};
