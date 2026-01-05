import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export function EditableRow({
  label,
  value,
  isEditing,
  onEdit,
  onChangeText,
  onSave,
  placeholder,
  keyboardType = "default",
  multiline = false,
}: {
  label: string;
  value?: string;
  isEditing: boolean;
  onEdit: () => void;
  onChangeText: (v: string) => void;
  onSave: () => void;
  placeholder?: string;
  keyboardType?: any;
  multiline?: boolean;
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: "600", color: "#374151" }}>
        {label}
      </Text>

      {!isEditing ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, color: "#111827" }}>{value || "—"}</Text>

          <TouchableOpacity onPress={onEdit}>
            <Text style={{ fontSize: 18 }}>✏️</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            multiline={multiline}
            style={{
              backgroundColor: "#F9FAFB",
              borderRadius: 12,
              padding: 14,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              marginTop: 6,
            }}
          />

          <TouchableOpacity
            onPress={onSave}
            style={{
              backgroundColor: "#2563EB",
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
