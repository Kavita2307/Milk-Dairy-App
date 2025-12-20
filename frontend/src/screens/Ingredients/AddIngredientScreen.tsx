// src/screens/AddIngredientScreen.tsx
import {
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API } from "../../api/api";
import { useNavigation } from "@react-navigation/native";

export default function AddIngredientScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dryMatter, setDryMatter] = useState("");
  const [stock, setStock] = useState("");

  const nav = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const slideAnim = new Animated.Value(100); // hidden initially

  useEffect(() => {
    nav.setOptions({ title: `Ingredient's Details` });
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
  }, []);
  const submit = async () => {
    if (!name.trim()) {
      alert("Enter a valid ingredient name");
      return;
    }
    await API.post("/ingredients", {
      name,
      price: Number(price),
      dryMatter: Number(dryMatter),
      currentStock: Number(stock),
      userId: 1, // from auth later
    });

    navigation.goBack();
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Add Ingredients Details</Text>

        <Text style={styles.label}>Ingredient Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="e.g. Feed"
        />

        <Text style={styles.label}>Price (Rs/Kg)</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 500"
        />

        <Text style={styles.label}>Dry Matter (%)</Text>
        <TextInput
          value={dryMatter}
          onChangeText={setDryMatter}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 30"
        />

        <Text style={styles.label}>Available Stock (kg)</Text>
        <TextInput
          value={stock}
          onChangeText={setStock}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 100"
        />

        <TouchableOpacity onPress={submit} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ---------- FLOATING RIGHT ARROW BUTTON ---------- */}
      {keyboardVisible && (
        <Animated.View
          style={[
            styles.arrowContainer,
            {
              bottom: keyboardHeight + 0, // <-- FIXED
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  saveBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  // ---------- FLOATING ARROW ----------
  arrowContainer: {
    position: "absolute",
    right: 20,
  },
  arrowButton: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  datePickerBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    elevation: 4,
  },

  doneBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  doneText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
