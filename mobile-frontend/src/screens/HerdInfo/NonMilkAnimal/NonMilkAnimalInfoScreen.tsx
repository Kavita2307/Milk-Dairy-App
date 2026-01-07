import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../../api/api";
import { Picker } from "@react-native-picker/picker";
import { SCREEN_NETWORK_MAP } from "@/src/network/ScreenNetworkMap";
import { resolveNetwork } from "@/src/network/NetworkManager";

const SCREEN_NAME = "NonMilkAnimalDetailsScreen";
export default function NonMilkAnimalDetailsScreen() {
  const [animalNumber, setAnimalNumber] = useState("");

  /* BASIC */
  const [breed, setBreed] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [ageDays, setAgeDays] = useState("");
  const [lastBodyWeight, setLastBodyWeight] = useState("");

  /* PEDIGREE */
  const [damNo, setDamNo] = useState("");
  const [bullName, setBullName] = useState("");
  const [damPrevYield, setDamPrevYield] = useState("");

  /* HEALTH */
  const [bcs, setBcs] = useState("");
  const [dungScore, setDungScore] = useState("");
  const [congenitalAnomaly, setCongenitalAnomaly] = useState("");
  const [lastDewormingDate, setLastDewormingDate] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [otherConditions, setOtherConditions] = useState("");

  /* DATE PICKERS */
  const [showBirthPicker, setShowBirthPicker] = useState(false);
  const [showDewormPicker, setShowDewormPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId } = route.params;
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    nav.setOptions({ title: "Animal Details" });
  }, [nav]);

  const resetForm = () => {
    setAnimalNumber("");
    setBreed("");
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

  /* AGE CALCULATION */
  const calculateAgeDays = (dateStr: string) => {
    const birth = new Date(dateStr);
    const today = new Date();
    const diff = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );
    setAgeDays(diff.toString());
  };

  /* SAVE */
  const save = async () => {
    const payload = {
      breed,
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
      console.log("Saving animal details:", animalNumber, payload);

      await API.post("/animals", {
        animalNumber,
        groupId,
        userId,
        details: payload,
      });

      Alert.alert("Animal details saved");
      setDetails(payload);
      resetForm();
      Keyboard.dismiss();
      nav.goBack();
    } catch {
      Alert.alert("Failed to save animal details");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Animal Details</Text>

        <Text style={styles.sectionTitle}>Animal Number</Text>
        <TextInput
          style={styles.input}
          value={animalNumber}
          onChangeText={setAnimalNumber}
          placeholder="e.g. 101"
          keyboardType="numeric"
        />

        {/* BASIC */}
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <Text style={styles.label}>Breed</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={breed}
            onValueChange={(value) => setBreed(value)}
          >
            <Picker.Item label="Select Breed" value={null} />
            <Picker.Item label="HF" value="HF" />
            <Picker.Item label="Jersey" value="Jersey" />
            <Picker.Item label="Crossbred" value="Crossbred" />
            <Picker.Item label="Desi" value="Desi" />
            <Picker.Item
              label="Buffalo (High Milk)"
              value="Buffalo High Milk"
            />
            <Picker.Item label="Buffalo (Low Milk)" value="Buffalo Low Milk" />
          </Picker>
        </View>

        <Text style={styles.label}>Birth Date</Text>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setShowBirthPicker(true);
          }}
        >
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
        />

        <Text style={styles.label}>Last Body Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={lastBodyWeight}
          onChangeText={setLastBodyWeight}
        />

        {/* PEDIGREE */}
        <Text style={styles.sectionTitle}>Pedigree</Text>

        <TextInput
          style={styles.input}
          placeholder="Dam No"
          value={damNo}
          onChangeText={setDamNo}
        />
        <TextInput
          style={styles.input}
          placeholder="Bull Name"
          value={bullName}
          onChangeText={setBullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Dam Previous Yield (kg)"
          keyboardType="numeric"
          value={damPrevYield}
          onChangeText={setDamPrevYield}
        />

        {/* HEALTH */}
        <Text style={styles.sectionTitle}>Health</Text>

        <TextInput
          style={styles.input}
          placeholder="BCS (1-5)"
          keyboardType="numeric"
          value={bcs}
          onChangeText={setBcs}
        />
        <TextInput
          style={styles.input}
          placeholder="Dung Score (1-5)"
          keyboardType="numeric"
          value={dungScore}
          onChangeText={setDungScore}
        />
        <TextInput
          style={styles.input}
          placeholder="Congenital Anomaly"
          value={congenitalAnomaly}
          onChangeText={setCongenitalAnomaly}
        />

        <Text style={styles.label}>Last Deworming Date</Text>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setShowDewormPicker(true);
          }}
        >
          <TextInput
            style={styles.input}
            value={lastDewormingDate}
            placeholder="Select Date"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Vaccination (comma separated)"
          value={vaccination}
          onChangeText={setVaccination}
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Other Conditions"
          value={otherConditions}
          onChangeText={setOtherConditions}
          multiline
        />

        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* BIRTH DATE PICKER */}
      {showBirthPicker && (
        <View style={styles.datePickerOverlay}>
          <View style={styles.datePickerBox}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => {
                if (event.type === "dismissed") {
                  setShowBirthPicker(false);
                  return;
                }
                if (date) {
                  setTempDate(date);
                  if (Platform.OS === "android") {
                    const f = date.toISOString().split("T")[0];
                    setBirthDate(f);
                    calculateAgeDays(f);
                    setShowBirthPicker(false);
                  }
                }
              }}
            />
            {Platform.OS === "ios" && (
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
            )}
          </View>
        </View>
      )}

      {/* DEWORM PICKER */}
      {showDewormPicker && (
        <View style={styles.datePickerOverlay}>
          <View style={styles.datePickerBox}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => {
                if (event.type === "dismissed") {
                  setShowDewormPicker(false);
                  return;
                }
                if (date) {
                  setTempDate(date);
                  if (Platform.OS === "android") {
                    setLastDewormingDate(date.toISOString().split("T")[0]);
                    setShowDewormPicker(false);
                  }
                }
              }}
            />
            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() => {
                  setLastDewormingDate(tempDate.toISOString().split("T")[0]);
                  setShowDewormPicker(false);
                }}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  label: { fontWeight: "600", marginBottom: 6 },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 16,
  },
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
  saveBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  datePickerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
  },
  datePickerBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
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
