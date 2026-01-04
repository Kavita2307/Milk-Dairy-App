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
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { API } from "../../../api/api";
import { Picker } from "@react-native-picker/picker";

type Section = "basic" | "pedigree" | "health" | null;
type PickerType = "birth" | "deworm" | null;

export default function UpdateNonMilkAnimalInfo() {
  const route = useRoute<any>();
  const { animalNumber } = route.params;

  const [details, setDetails] = useState<any>({});
  const [editing, setEditing] = useState<Section>(null);
  const [editData, setEditData] = useState<any>({});

  // DATE PICKER
  const [showDatePicker, setShowDatePicker] = useState<PickerType>(null);
  const [tempDate, setTempDate] = useState(new Date());

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    const res = await API.get(`/animals/${animalNumber}`);
    const d = res.data.details || {};

    // normalize vaccination
    if (d.health?.vaccination && !Array.isArray(d.health.vaccination)) {
      d.health.vaccination = d.health.vaccination
        .split(",")
        .map((v: string) => v.trim());
    }

    setDetails(d);
  };

  const startEdit = (section: Section) => {
    setEditing(section);
    setEditData(details);
  };

  const calculateAgeDays = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
    return diff >= 0 ? diff : "";
  };

  const saveSection = async (section: Section) => {
    let payload: any = {};

    if (section === "basic") {
      payload = {
        breed: editData.breed,
        birthDate: editData.birthDate,
        birthWeightKg: editData.birthWeightKg,
        ageDays: calculateAgeDays(editData.birthDate),
        lastBodyWeightKg: editData.lastBodyWeightKg,
      };
    }

    if (section === "pedigree") payload = { pedigree: editData.pedigree };
    if (section === "health") payload = { health: editData.health };

    await API.put("/animals/update-details", {
      animalNumber,
      details: payload,
    });

    setEditing(null);
    setShowDatePicker(null);
    loadDetails();
  };

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: Section;
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={() => startEdit(section)}>
        <Text style={styles.editIcon}>✏️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Animal {animalNumber}</Text>

        {/* BASIC */}
        <SectionHeader title="Basic Information" section="basic" />

        {editing !== "basic" ? (
          <>
            <Text>Breed: {details.breed || "-"}</Text>
            <Text>Birth Date: {details.birthDate || "-"}</Text>
            <Text>Birth Weight: {details.birthWeightKg || "-"} kg</Text>
            <Text>Age (Days): {details.ageDays || "-"}</Text>
            <Text>Last Body Weight: {details.lastBodyWeightKg || "-"} kg</Text>
          </>
        ) : (
          <>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={editData.breed}
                onValueChange={(value) =>
                  setEditData({ ...editData, breed: value })
                }
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
                <Picker.Item
                  label="Buffalo (Low Milk)"
                  value="Buffalo Low Milk"
                />
              </Picker>
            </View>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setShowDatePicker("birth");
              }}
            >
              <TextInput
                style={styles.input}
                editable={false}
                placeholder="Birth Date"
                value={editData.birthDate || ""}
                pointerEvents="none"
              />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Birth Weight (kg)"
              value={editData.birthWeightKg || ""}
              onChangeText={(v) =>
                setEditData({ ...editData, birthWeightKg: v })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Last Body Weight (kg)"
              value={editData.lastBodyWeightKg || ""}
              onChangeText={(v) =>
                setEditData({ ...editData, lastBodyWeightKg: v })
              }
            />

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => saveSection("basic")}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </>
        )}

        {/* PEDIGREE */}
        <SectionHeader title="Pedigree" section="pedigree" />

        {editing !== "pedigree" ? (
          <>
            <Text>Dam No: {details.pedigree?.damNo || "-"}</Text>
            <Text>Bull Name: {details.pedigree?.bullName || "-"}</Text>
            <Text>
              Dam Previous Yield: {details.pedigree?.damPrevYieldKg || "-"} kg
            </Text>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Dam No"
              value={editData.pedigree?.damNo || ""}
              onChangeText={(v) =>
                setEditData({
                  ...editData,
                  pedigree: { ...editData.pedigree, damNo: v },
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Bull Name"
              value={editData.pedigree?.bullName || ""}
              onChangeText={(v) =>
                setEditData({
                  ...editData,
                  pedigree: { ...editData.pedigree, bullName: v },
                })
              }
            />
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => saveSection("pedigree")}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </>
        )}

        {/* HEALTH */}
        <SectionHeader title="Health Parameters" section="health" />

        {editing !== "health" ? (
          <>
            <Text>BCS: {details.health?.bcs || "-"}</Text>
            <Text>Dung Score: {details.health?.dungScore || "-"}</Text>
            <Text>
              Vaccination:{" "}
              {Array.isArray(details.health?.vaccination)
                ? details.health.vaccination.join(", ")
                : details.health?.vaccination || "-"}
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setShowDatePicker("deworm");
              }}
            >
              <TextInput
                style={styles.input}
                editable={false}
                placeholder="Last Deworming Date"
                value={editData.health?.lastDewormingDate || ""}
                pointerEvents="none"
              />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Vaccination (comma separated)"
              value={
                Array.isArray(editData.health?.vaccination)
                  ? editData.health.vaccination.join(", ")
                  : editData.health?.vaccination || ""
              }
              onChangeText={(v) =>
                setEditData({
                  ...editData,
                  health: {
                    ...editData.health,
                    vaccination: v.split(",").map((x) => x.trim()),
                  },
                })
              }
            />

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => saveSection("health")}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* DATE PICKER */}
      {showDatePicker && (
        <View style={styles.datePickerOverlay}>
          <View style={styles.datePickerBox}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                if (event.type === "dismissed") {
                  setShowDatePicker(null);
                  return;
                }

                if (selectedDate) {
                  setTempDate(selectedDate);
                  const f = selectedDate.toISOString().split("T")[0];

                  if (Platform.OS === "android") {
                    if (showDatePicker === "birth") {
                      setEditData({ ...editData, birthDate: f });
                    }
                    if (showDatePicker === "deworm") {
                      setEditData({
                        ...editData,
                        health: {
                          ...editData.health,
                          lastDewormingDate: f,
                        },
                      });
                    }
                    setShowDatePicker(null);
                  }
                }
              }}
            />

            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => {
                  const f = tempDate.toISOString().split("T")[0];

                  if (showDatePicker === "birth") {
                    setEditData({ ...editData, birthDate: f });
                  }
                  if (showDatePicker === "deworm") {
                    setEditData({
                      ...editData,
                      health: {
                        ...editData.health,
                        lastDewormingDate: f,
                      },
                    });
                  }

                  setShowDatePicker(null);
                }}
              >
                <Text style={styles.saveText}>Done</Text>
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
  container: { padding: 20, backgroundColor: "#F3F4F6" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  editIcon: { fontSize: 18 },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginTop: 6,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 16,
  },
  saveText: {
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
});
