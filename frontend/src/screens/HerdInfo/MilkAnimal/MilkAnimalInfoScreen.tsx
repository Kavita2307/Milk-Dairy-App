import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Keyboard,
} from "react-native";
import { API } from "../../../api/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Platform, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AnimalDetailsScreen() {
  const [animalNumber, setAnimalNumber] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [lactationNo, setLactationNo] = useState("");
  const [dateOfCalving, setDateOfCalving] = useState("");
  const [milkYield, setMilkYield] = useState("");

  const [damNo, setDamNo] = useState("");
  const [bullName, setBullName] = useState("");
  const [damPrevYield, setDamPrevYield] = useState("");

  const [bcs, setBcs] = useState("");
  const [dungScore, setDungScore] = useState("");
  const [lameness, setLameness] = useState("");
  const [teatScore, setTeatScore] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [otherConditions, setOtherConditions] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calvingDate, setCalvingDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const [details, setDetails] = useState<any>({});

  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId } = route.params;

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const slideAnim = new Animated.Value(100); // hidden initially

  useEffect(() => {
    nav.setOptions({ title: `Animal Details` });
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

  const resetForm = () => {
    setAnimalNumber("");
    setAge("");
    setWeight("");
    setLactationNo("");
    setDateOfCalving("");
    setMilkYield("");

    setDamNo("");
    setBullName("");
    setDamPrevYield("");

    setBcs("");
    setDungScore("");
    setLameness("");
    setTeatScore("");
    setVaccination("");
    setOtherConditions("");

    setTempDate(new Date());
  };

  const save = async () => {
    const payload = {
      ageMonths: age,
      bodyWeightKg: weight,
      lactationNo,
      dateOfCalving,
      milkYield7DayAvg: milkYield,
      pedigree: {
        damNo,
        bullName,
        damPrevYieldKg: damPrevYield,
      },
      health: {
        bcs,
        dungScore,
        lameness,
        teatScore,
        vaccination: vaccination.split(",").map((v) => v.trim()),
        otherConditions,
      },
    };

    try {
      console.log("Saving animal details:", animalNumber, payload);
      await API.post("/animals", {
        animalNumber,
        groupId,
        userId,
        details: payload,
      });

      alert("Animal details saved");

      setDetails(payload); // keep showing saved details
      resetForm(); //  CLEAR inputs

      Keyboard.dismiss(); // optional UX improvement
      return nav.goBack();
    } catch (err) {
      alert("Failed to save animal details");
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Add Animal Details</Text>
        <Text style={styles.sectionTitle}>Animal Number</Text>
        <TextInput
          value={animalNumber}
          onChangeText={setAnimalNumber}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 101"
        />

        {/* ================= BASIC INFO ================= */}
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <Text style={styles.label}>Age (Months)</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 60"
        />

        <Text style={styles.label}>Body Weight (kg)</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 500"
        />

        <Text style={styles.label}>Lactation No</Text>
        <TextInput
          value={lactationNo}
          onChangeText={setLactationNo}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 3"
        />

        <Text style={styles.label}>Date of Calving</Text>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            value={dateOfCalving}
            placeholder="Select Date of Calving"
            editable={false} // keyboard will NOT open
            pointerEvents="none" // clicks go to TouchableOpacity
            style={styles.input}
          />
        </TouchableOpacity>

        <Text style={styles.label}>Milk Yield (7 Day Avg) kg</Text>
        <TextInput
          value={milkYield}
          onChangeText={setMilkYield}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 30"
        />

        {/* ================= PEDIGREE ================= */}
        <Text style={styles.sectionTitle}>Pedigree</Text>

        <Text style={styles.label}>Dam Name / No</Text>
        <TextInput
          value={damNo}
          onChangeText={setDamNo}
          style={styles.input}
          placeholder="e.g. 23"
        />

        <Text style={styles.label}>Bull Name</Text>
        <TextInput
          value={bullName}
          onChangeText={setBullName}
          style={styles.input}
          placeholder="e.g. Striker"
        />

        <Text style={styles.label}>
          Dam&apos;s Previous Lactation Yield (kg)
        </Text>
        <TextInput
          value={damPrevYield}
          onChangeText={setDamPrevYield}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 10000"
        />

        {/* ================= HEALTH PARAMETERS ================= */}
        <Text style={styles.sectionTitle}>Health Parameters</Text>

        <Text style={styles.label}>Body Condition Score (1-5)</Text>
        <TextInput
          value={bcs}
          onChangeText={setBcs}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 3"
        />

        <Text style={styles.label}>Dung Score (1-5)</Text>
        <TextInput
          value={dungScore}
          onChangeText={setDungScore}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 3"
        />

        <Text style={styles.label}>Lameness Score (1-5)</Text>
        <TextInput
          value={lameness}
          onChangeText={setLameness}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 1"
        />

        <Text style={styles.label}>Teat Score (1-4)</Text>
        <TextInput
          value={teatScore}
          onChangeText={setTeatScore}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 2"
        />

        <Text style={styles.label}>Vaccination Done (comma separated)</Text>
        <TextInput
          value={vaccination}
          onChangeText={setVaccination}
          style={styles.input}
          placeholder="e.g. FMD, HS"
        />

        <Text style={styles.label}>Other Conditions</Text>
        <TextInput
          value={otherConditions}
          onChangeText={setOtherConditions}
          style={[styles.input, { height: 80 }]}
          placeholder="e.g. None"
          multiline
        />

        {/* ================= SAVE ================= */}
        <TouchableOpacity onPress={save} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ---------- FLOATING RIGHT ARROW BUTTON ---------- */}
      {keyboardVisible && (
        <Animated.View
          style={[
            styles.arrowContainer,
            {
              bottom: keyboardHeight + 100, // <-- FIXED
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
      {showDatePicker && (
        <View style={styles.datePickerBox}>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner" // best UX for manual selection
            onChange={(_, selectedDate) => {
              if (selectedDate) {
                setTempDate(selectedDate); // TEMP only, NOT saved yet
              }
            }}
          />

          {/* DONE BUTTON */}
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => {
              const formatted = tempDate.toISOString().split("T")[0];

              setDateOfCalving(formatted); // SAVE date
              setShowDatePicker(false); // CLOSE picker
            }}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 30,
  },
  saveBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  detailsBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1F2937",
  },
  detailsItem: {
    fontSize: 16,
    marginVertical: 4,
    color: "#374151",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#FBBF24",
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
