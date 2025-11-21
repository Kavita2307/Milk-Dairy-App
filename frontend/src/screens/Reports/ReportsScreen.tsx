import React from "react";
import { View, Text } from "react-native";

export default function ReportsScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Reports</Text>
      <Text>Daily Feed Efficiency</Text>
      <Text>Milk Yield</Text>
      <Text>Dry Matter Intake</Text>
      <Text>Mix Accuracy</Text>
    </View>
  );
}
