import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  keyboardType?: "default" | "numeric";
}

export default function InputField({
  label,
  value,
  onChangeText,
  keyboardType,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { fontSize: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
  },
});
