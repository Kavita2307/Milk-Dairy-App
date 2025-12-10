import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import { API } from "../../api/api";
import { useRoute } from "@react-navigation/native";

export default function LeftoverScreen() {
  const route = useRoute<any>();
  const { groupId, userId } = route.params;

  const [weight, setWeight] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);

  const fetchFromLoadCell = () => {
    API.get("/leftover/loadcell/read")
      .then((res) => setWeight(String(res.data.weight)))
      .catch(() => alert("Failed to read load cell"));
  };

  const saveLeftover = () => {
    Keyboard.dismiss();
    API.post("/leftover", {
      groupId,
      leftoverKg: Number(weight),
      userId,
    })
      .then(() => alert("Saved successfully"))
      .catch(() => alert("Error saving leftover"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Get weight from wagon</Text>

      {/* Switch Button */}
      <TouchableOpacity
        onPress={() => setUseLoadCell(!useLoadCell)}
        style={styles.switchBtn}
      >
        <Text style={styles.switchBtnText}>
          {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
        </Text>
      </TouchableOpacity>

      {/* LOAD CELL MODE */}
      {useLoadCell ? (
        <View style={styles.box}>
          <Text style={styles.label}>Partial Tara, Weight:</Text>

          <View style={styles.displayBox}>
            <Text style={styles.displayText}>{weight} kg</Text>
          </View>

          <TouchableOpacity onPress={fetchFromLoadCell} style={styles.fetchBtn}>
            <Text style={styles.fetchBtnText}>Get Weight</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* MANUAL ENTRY MODE */
        <View style={styles.box}>
          <Text style={styles.label}>Enter Weight (kg)</Text>

          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            autoFocus={true} // Auto-open keyboard
            placeholder="Enter weight"
          />

          <TouchableOpacity
            onPress={() => setWeight("0")}
            style={styles.clearBtn}
          >
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SAVE */}
      <TouchableOpacity onPress={saveLeftover} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reallocateBtn}>
        <Text style={styles.reallocateText}>Reallocate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },

  subTitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },

  switchBtn: {
    backgroundColor: "#0EA5E9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  switchBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "#F9FAFB",
  },

  clearBtn: {
    marginTop: 12,
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 10,
  },
  clearBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  displayBox: {
    padding: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  displayText: {
    fontSize: 36,
    fontWeight: "700",
  },

  fetchBtn: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 10,
  },
  fetchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },
  saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },

  reallocateBtn: {
    backgroundColor: "#6B7280",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  reallocateText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
});
