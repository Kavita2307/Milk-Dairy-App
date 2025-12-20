import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { API } from "../../api/api";
import { readLoadCell } from "../../api/loadCell";

export default function MilkProductionScreen() {
  const route = useRoute<any>();
  const { groupId, userId, shift, animalNumber } = route.params;

  const [milkLit, setMilkLit] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const slideAnim = new Animated.Value(100); // hidden initially

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);

      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();

      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [slideAnim]);

  // const fetchMilkFromLoadCell = () => {
  //   API.get("/milk/loadcell/read")
  //     .then((res) => setMilkLit(String(res.data.weight)))
  //     .catch(() => alert("Failed to read load cell"));
  // };

  const fetchMilkFromLoadCell = async () => {
    try {
      const data = await readLoadCell();

      // Only accept stable weight
      if (!data.stable) {
        alert("Milk is still measuring… Please wait");
        return;
      }

      // Weight from ESP32 is in KG
      setMilkLit(data.weight.toFixed(2));
    } catch {
      alert("Weighing machine not connected");
    }
  };

  const saveMilk = () => {
    console.log("milk: ", milkLit);
    API.post("/milk", {
      groupId,
      milkLit: Number(milkLit),
      shift,
      animalNumber,
    })
      .then(() => alert("Milk Saved Successfully"))
      .catch(() => alert("Error saving milk data"));
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.subTitle}>Enter milk production</Text>

        {/* SWITCH MODE */}
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
            <Text style={styles.label}>Load Cell Reading:</Text>

            <View style={styles.displayBox}>
              <Text style={styles.displayText}>{milkLit} L</Text>
            </View>

            <TouchableOpacity
              onPress={fetchMilkFromLoadCell}
              style={styles.fetchBtn}
            >
              <Text style={styles.fetchBtnText}>Get Milk Weight</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* MANUAL ENTRY MODE */
          <View style={styles.box}>
            <Text style={styles.label}>Enter Milk (Litres)</Text>

            <TextInput
              style={styles.input}
              value={milkLit}
              onChangeText={setMilkLit}
              keyboardType="numeric"
              placeholder="Enter milk quantity"
            />

            <TouchableOpacity
              onPress={() => setMilkLit("0")}
              style={styles.clearBtn}
            >
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SAVE BUTTON */}
        <TouchableOpacity onPress={saveMilk} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- FLOATING RIGHT ARROW BUTTON ---------- */}
      {keyboardVisible && (
        <Animated.View
          style={[
            styles.arrowContainer,
            {
              bottom: keyboardHeight + 20, // <-- FIXED
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => Keyboard.dismiss()}
          >
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },

  subTitle: {
    textAlign: "center",
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
  switchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

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

  displayBox: {
    padding: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
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
    marginTop: 15,
  },
  fetchBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  clearBtn: {
    marginTop: 12,
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 10,
  },
  clearBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  saveBtnText: { textAlign: "center", color: "#fff", fontWeight: "700" },

  // ---------- FLOATING ARROW ----------
  arrowContainer: {
    position: "absolute",
    right: 20,
  },
  arrowButton: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  arrowText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
});
