import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../../api/api";

type Section = "basic" | "pedigree" | "health" | null;

export default function AnimalDetailsScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { animalNumber } = route.params;

  const [details, setDetails] = useState<any>({});
  const [editing, setEditing] = useState<Section>(null);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    nav.setOptions({ title: `Animal ${animalNumber}` });
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

  const saveSection = async (section: Section) => {
    let payload: any = {};

    if (section === "basic") {
      payload = {
        ageMonths: editData.ageMonths,
        bodyWeightKg: editData.bodyWeightKg,
        lactationNo: editData.lactationNo,
        dateOfCalving: editData.dateOfCalving,
        milkYield7DayAvg: editData.milkYield7DayAvg,
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
          <Text>Age: {details.ageMonths || "-"}</Text>
          <Text>Weight: {details.bodyWeightKg || "-"} kg</Text>
          <Text>Lactation No: {details.lactationNo || "-"}</Text>
          <Text>Date of Calving: {details.dateOfCalving || "-"}</Text>
          <Text>
            Milk Yield (7 Day Avg): {details.milkYield7DayAvg || "-"} kg
          </Text>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Age (months)"
            value={editData.ageMonths || ""}
            onChangeText={(v) => setEditData({ ...editData, ageMonths: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Body Weight (kg)"
            value={editData.bodyWeightKg || ""}
            onChangeText={(v) => setEditData({ ...editData, bodyWeightKg: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Lactation No"
            value={editData.lactationNo || ""}
            onChangeText={(v) => setEditData({ ...editData, lactationNo: v })}
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
          <Text>Lameness: {details.health?.lameness || "-"}</Text>
          <Text>
            Vaccination: {details.health?.vaccination?.join(", ") || "-"}
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
          <TextInput
            style={styles.input}
            placeholder="Dung Score"
            value={editData.health?.dungScore || ""}
            onChangeText={(v) =>
              setEditData({
                ...editData,
                health: { ...editData.health, dungScore: v },
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
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  editIcon: {
    fontSize: 18,
  },
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
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
