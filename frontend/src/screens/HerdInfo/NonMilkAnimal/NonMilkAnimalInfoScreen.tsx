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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../../api/api";

export default function NonMilkAnimalDetailsScreen() {
  const [animalNumber, setAnimalNumber] = useState("");
  /* ================= BASIC ================= */
  const [birthDate, setBirthDate] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [ageDays, setAgeDays] = useState("");
  const [lastBodyWeight, setLastBodyWeight] = useState("");

  /* ================= PEDIGREE ================= */
  const [damNo, setDamNo] = useState("");
  const [bullName, setBullName] = useState("");
  const [damPrevYield, setDamPrevYield] = useState("");

  /* ================= HEALTH ================= */
  const [bcs, setBcs] = useState("");
  const [dungScore, setDungScore] = useState("");
  const [congenitalAnomaly, setCongenitalAnomaly] = useState("");
  const [lastDewormingDate, setLastDewormingDate] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [otherConditions, setOtherConditions] = useState("");

  /* ================= DATE PICKER ================= */
  const [showBirthPicker, setShowBirthPicker] = useState(false);
  const [showDewormPicker, setShowDewormPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  /* ================= KEYBOARD ARROW ================= */
  const slideAnim = new Animated.Value(100);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [details, setDetails] = useState<any>({});

  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId } = route.params;

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

  /* ================= AGE CALCULATION ================= */
  const calculateAgeDays = (dateStr: string) => {
    const birth = new Date(dateStr);
    const today = new Date();
    const diff =
      Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)) ||
      0;
    setAgeDays(diff.toString());
  };

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setAnimalNumber("");
    setBirthDate("");
    setBirthWeight("");
    setAgeDays("");
    setLastBodyWeight("");

    setDamNo("");
    setBullName("");
    setDamPrevYield("");

    setBcs("");
    setDungScore("");
    setCongenitalAnomaly("");
    setLastDewormingDate("");
    setVaccination("");
    setOtherConditions("");
  };

  /* ================= SAVE ================= */
  const save = async () => {
    const payload = {
      birthDate,
      birthWeightKg: birthWeight,
      ageDays,
      lastBodyWeightKg: lastBodyWeight,
      pedigree: {
        damNo,
        bullName,
        damPrevYieldKg: damPrevYield,
      },
      health: {
        bcs,
        dungScore,
        congenitalAnomaly,
        lastDewormingDate,
        vaccination,
        otherConditions,
      },
    };

    try {
      await API.put("/animals/update-details", {
        animalNumber,
        details: payload,
      });

      alert("Animal details saved");
      setDetails(payload);
      resetForm();
      Keyboard.dismiss();
    } catch {
      alert("Failed to save animal details");
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Animal Details</Text>
        <Text style={styles.sectionTitle}>Animal Number</Text>
        <TextInput
          style={styles.input}
          value={animalNumber}
          onChangeText={setAnimalNumber}
          placeholder="e.g. 101"
        />
        {/* BASIC */}
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <Text style={styles.label}>Birth Date</Text>
        <TouchableOpacity onPress={() => setShowBirthPicker(true)}>
          <TextInput
            style={styles.input}
            value={birthDate}
            placeholder="Select Birth Date"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        <Text style={styles.label}>Birth Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={birthWeight}
          onChangeText={setBirthWeight}
          placeholder="e.g. 30"
        />

        <Text style={styles.label}>Last Body Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={lastBodyWeight}
          onChangeText={setLastBodyWeight}
          placeholder="e.g. 30"
        />

        {/* PEDIGREE */}
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

        {/* HEALTH */}
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

        <Text style={styles.label}>Congenital Anomaly</Text>
        <TextInput
          style={styles.input}
          placeholder="Congenital Anomaly"
          value={congenitalAnomaly}
          onChangeText={setCongenitalAnomaly}
        />

        <Text style={styles.label}>Last Deworming Date</Text>
        <TouchableOpacity onPress={() => setShowDewormPicker(true)}>
          <TextInput
            style={styles.input}
            value={lastDewormingDate}
            placeholder="Select Date"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

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

        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* FLOATING ARROW */}
      {keyboardVisible && (
        <Animated.View
          style={[
            styles.arrowContainer,
            {
              bottom: keyboardHeight + 100,
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

      {/* BIRTH DATE PICKER */}
      {showBirthPicker && (
        <View style={styles.datePickerBox}>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            onChange={(_, d) => d && setTempDate(d)}
          />
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => {
              const f = tempDate.toISOString().split("T")[0];
              setBirthDate(f);
              calculateAgeDays(f);
              setShowBirthPicker(false);
            }}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* DEWORM DATE PICKER */}
      {showDewormPicker && (
        <View style={styles.datePickerBox}>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            onChange={(_, d) => d && setTempDate(d)}
          />
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => {
              setLastDewormingDate(tempDate.toISOString().split("T")[0]);
              setShowDewormPicker(false);
            }}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  label: { fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#FBBF24",
    paddingBottom: 4,
  },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  saveBtnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  arrowContainer: { position: "absolute", right: 20 },
  arrowButton: {
    backgroundColor: "#0EA5E9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  arrowText: { color: "#fff", fontSize: 22, fontWeight: "700" },

  datePickerBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    elevation: 5,
  },
  doneBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  doneText: { color: "#fff", textAlign: "center", fontWeight: "700" },
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
});
