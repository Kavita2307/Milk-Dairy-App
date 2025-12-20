import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import { API } from "../../api/api";
import { useRoute } from "@react-navigation/native";
import { readLoadCell } from "../../api/loadCell";

export default function LeftoverScreen() {
  const route = useRoute<any>();
  const { groupId, userId } = route.params;

  const [weight, setWeight] = useState("0");
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
  // const fetchFromLoadCell = () => {
  //   API.get("/leftover/loadcell/read")
  //     .then((res) => setWeight(String(res.data.weight)))
  //     .catch(() => alert("Failed to read load cell"));
  // };

  const fetchFromLoadCell = async () => {
    try {
      const data = await readLoadCell();

      // Only accept stable weight
      if (!data.stable) {
        alert("Leftover is still measuring… Please wait");
        return;
      }

      // Weight from ESP32 is in KG
      setWeight(data.weight.toFixed(2));
    } catch {
      alert("Weighing machine not connected");
    }
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
    <>
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

            <TouchableOpacity
              onPress={fetchFromLoadCell}
              style={styles.fetchBtn}
            >
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

        {/* <TouchableOpacity style={styles.reallocateBtn}>
        <Text style={styles.reallocateText}>Reallocate</Text>
      </TouchableOpacity> */}
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },

  subTitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "600",
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
