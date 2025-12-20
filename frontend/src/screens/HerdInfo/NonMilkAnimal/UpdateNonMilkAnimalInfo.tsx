import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { API } from "../../../api/api";

type Section = "basic" | "pedigree" | "health" | null;

export default function UpdateNonMilkAnimalInfo() {
  const route = useRoute<any>();
  const { animalNumber } = route.params;

  const [details, setDetails] = useState<any>({});
  const [editing, setEditing] = useState<Section>(null);
  const [editData, setEditData] = useState<any>({});
  const [showDatePicker, setShowDatePicker] = useState<
    "birth" | "deworm" | null
  >(null);
  const [tempDate, setTempDate] = useState(new Date());

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    const res = await API.get(`/animals/${animalNumber}`);
    setDetails(res.data.details || {});
  };

  const startEdit = (section: Section) => {
    setEditing(section);
    setEditData(details);
  };

  const calculateAgeDays = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : "";
  };

  const saveSection = async (section: Section) => {
    let payload: any = {};

    if (section === "basic") {
      payload = {
        birthDate: editData.birthDate,
        birthWeightKg: editData.birthWeightKg,
        ageDays: calculateAgeDays(editData.birthDate),
        lastBodyWeightKg: editData.lastBodyWeightKg,
      };
    }

    if (section === "pedigree") {
      payload = { pedigree: editData.pedigree };
    }

    if (section === "health") {
      payload = { health: editData.health };
    }

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Animal {animalNumber}</Text>

      {/* ================= BASIC ================= */}
      <SectionHeader title="Basic Information" section="basic" />

      {editing !== "basic" ? (
        <>
          <Text>Birth Date: {details.birthDate || "-"}</Text>
          <Text>Birth Weight: {details.birthWeightKg || "-"} kg</Text>
          <Text>Age (Days): {details.ageDays || "-"}</Text>
          <Text>Last Body Weight: {details.lastBodyWeightKg || "-"} kg</Text>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker("birth")}>
            <TextInput
              style={styles.input}
              editable={false}
              value={editData.birthDate || ""}
              placeholder="Birth Date"
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Birth Weight (kg)"
            value={editData.birthWeightKg || ""}
            onChangeText={(v) => setEditData({ ...editData, birthWeightKg: v })}
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

      {/* ================= PEDIGREE ================= */}
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

      {/* ================= HEALTH ================= */}
      <SectionHeader title="Health Parameters" section="health" />

      {editing !== "health" ? (
        <>
          <Text>BCS: {details.health?.bcs || "-"}</Text>
          <Text>Dung Score: {details.health?.dungScore || "-"}</Text>
          <Text>
            Congenital Anomaly: {details.health?.congenitalAnomaly || "-"}
          </Text>
          <Text>
            Last Deworming: {details.health?.lastDewormingDate || "-"}
          </Text>
          <Text>
            Vaccination: {details.health?.vaccination?.join(", ") || "-"}
          </Text>
          <Text>
            Other Conditions: {details.health?.otherConditions || "-"}
          </Text>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="BCS"
            value={editData.health?.bcs || ""}
            onChangeText={(v) =>
              setEditData({
                ...editData,
                health: { ...editData.health, bcs: v },
              })
            }
          />

          <TouchableOpacity onPress={() => setShowDatePicker("deworm")}>
            <TextInput
              style={styles.input}
              editable={false}
              value={editData.health?.lastDewormingDate || ""}
              placeholder="Last Deworming Date"
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Vaccination (comma separated)"
            value={editData.health?.vaccination || ""}
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

      {/* DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="spinner"
          onChange={(_, d) => {
            if (!d) return;
            setTempDate(d);

            const f = d.toISOString().split("T")[0];

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
          }}
        />
      )}
    </ScrollView>
  );
}
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
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
