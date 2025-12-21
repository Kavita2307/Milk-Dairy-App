import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { API } from "../../api/api";

/* -------------------- */
/* TYPES */
/* -------------------- */

interface WeightResponse {
  weight: number;
  unit: string;
  stable: boolean;
  timestamp: number;
}

/* -------------------- */
/* SCREEN */
/* -------------------- */

export default function WeighingMachineScreen() {
  const [weight, setWeight] = useState(0);
  const [stable, setStable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tareWeight, setTareWeight] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* --------------------
     LOAD WEIGHT
  -------------------- */
  const loadWeight = async () => {
    try {
      const res = await API.get<WeightResponse>("/api/weight");

      setWeight(res.data.weight);
      setStable(res.data.stable);
    } catch (error) {
      console.error("Weight fetch error", error);
    }
  };

  /* --------------------
     AUTO REFRESH (500ms)
  -------------------- */
  useEffect(() => {
    loadWeight();

    intervalRef.current = setInterval(loadWeight, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  /* --------------------
     TARE / ZERO
  -------------------- */
  const handleTare = async () => {
    try {
      setLoading(true);

      await API.post("/api/weight/tare");

      // Save current weight as tare
      setTareWeight(weight);

      Alert.alert("Success", "Scale tared successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to tare scale");
    } finally {
      setLoading(false);
    }
  };

  const netWeight = Math.max(weight - tareWeight, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Milk Weighing Machine</Text>

      {/* WEIGHT DISPLAY */}
      <View style={styles.weightCard}>
        <Text style={styles.label}>Gross Weight</Text>
        <Text style={styles.weightText}>{weight.toFixed(2)} kg</Text>

        <Text style={styles.label}>Net Weight</Text>
        <Text style={styles.netWeightText}>{netWeight.toFixed(2)} kg</Text>

        <Text
          style={[styles.status, { color: stable ? "#16a34a" : "#dc2626" }]}
        >
          {stable ? "STABLE" : "MEASURING..."}
        </Text>
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: stable ? "#2563eb" : "#9ca3af" },
        ]}
        onPress={handleTare}
        disabled={!stable || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>TARE / ZERO</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- */
/* STYLES */
/* -------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  weightCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 4,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
  },
  weightText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  netWeightText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#16a34a",
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});
