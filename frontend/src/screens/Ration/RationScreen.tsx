// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
// import { API } from "../../api/api";
// import { useRoute } from "@react-navigation/native";

// export default function RationScreen() {
//   const route = useRoute<any>();
//   const { groupId, userId } = route.params;

//   const [ration, setRation] = useState<any>(null);
//   const [ingredients, setIngredients] = useState<any[]>([]);

//   const loadRation = () => {
//     API.get(`/ration/${groupId}`).then((res) => {
//       setRation(res.data.ration);
//       setIngredients(res.data.ingredients);
//     });
//   };

//   useEffect(() => {
//     loadRation();
//   }, []);

//   if (!ration) {
//     return (
//       <View style={{ padding: 20 }}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header Row */}
//       <View style={styles.headerRow}>
//         <View style={styles.headerLeft}>
//           <MaterialCommunityIcons name="food" size={22} color="#0EA5E9" />
//           <Text style={styles.headerTitle}>Feedsection</Text>
//         </View>

//         <TouchableOpacity>
//           <MaterialCommunityIcons
//             name="plus-circle"
//             size={26}
//             color="#10B981"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Feed Section */}
//       <View style={styles.card}>
//         <View style={styles.tableHeader}>
//           <Text style={styles.tableHeadText}>Name</Text>
//           <Text style={styles.tableHeadText}>No</Text>
//           <Text style={styles.tableHeadText}>Kg</Text>
//           <Text style={styles.tableHeadText}>Total</Text>
//         </View>

//         <View style={styles.tableRow}>
//           <Text style={styles.rowText}>{ration.name}</Text>
//           <Text style={styles.rowText}>{ration.no}</Text>
//           <Text style={styles.rowText}>{ration.kg}</Text>
//           <Text style={styles.rowText}>{ration.total}</Text>
//         </View>
//       </View>

//       {/* Load Info */}
//       <View style={styles.loadCard}>
//         <View style={styles.loadRow}>
//           <Text style={styles.loadLabel}>This Load</Text>
//           <Text style={styles.loadValue}>{ration.thisLoad}</Text>
//         </View>

//         <View style={styles.loadRow}>
//           <Text style={styles.loadLabel}>Last Load</Text>
//           <Text style={styles.loadValue}>{ration.lastLoad}</Text>
//         </View>

//         <View style={styles.loadRow}>
//           <Text style={styles.loadLabel}>Diff</Text>
//           <Text style={styles.loadValue}>{ration.diff}</Text>
//         </View>
//       </View>

//       {/* Ration Size & Days */}
//       <View style={styles.bottomInfoCard}>
//         <View style={styles.iconRow}>
//           <MaterialCommunityIcons
//             name="percent-outline"
//             size={20}
//             color="#0EA5E9"
//           />
//           <Text style={styles.bottomText}>Ration Size</Text>
//           <Text style={styles.bottomValue}>{ration.rationSize}</Text>
//         </View>

//         <View style={styles.iconRow}>
//           <Feather name="calendar" size={20} color="#0EA5E9" />
//           <Text style={styles.bottomText}>Days</Text>
//           <Text style={styles.bottomValue}>{ration.days}</Text>
//         </View>
//       </View>

//       {/* Ingredients Section */}
//       <View style={styles.headerRow}>
//         <View style={styles.headerLeft}>
//           <MaterialCommunityIcons name="leaf" size={22} color="#10B981" />
//           <Text style={styles.headerTitle}>Ingredients</Text>
//         </View>

//         <TouchableOpacity>
//           <MaterialCommunityIcons
//             name="plus-circle"
//             size={26}
//             color="#10B981"
//           />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={ingredients}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.ingRow}>
//             <Text style={styles.ingText}>{item.name}</Text>
//             <Text style={styles.ingText}>{item.kg}</Text>
//             <Text style={styles.ingText}>{item.total}</Text>
//             <MaterialCommunityIcons name="plus" size={22} color="#0EA5E9" />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: "#F3F4F6" },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
//   headerTitle: { fontSize: 20, fontWeight: "700", color: "#1F2937" },
//   card: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   tableHeader: { flexDirection: "row", justifyContent: "space-between" },
//   tableHeadText: { fontWeight: "700", color: "#334155" },
//   tableRow: { flexDirection: "row", justifyContent: "space-between" },
//   rowText: { width: "25%", color: "#374151" },
//   loadCard: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//     marginTop: 10,
//   },
//   loadRow: { flexDirection: "row", justifyContent: "space-between" },
//   loadLabel: { fontWeight: "600", color: "#374151" },
//   loadValue: { color: "#111827" },
//   bottomInfoCard: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//     marginTop: 10,
//   },
//   iconRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
//   bottomText: { marginLeft: 6, fontWeight: "600", color: "#374151" },
//   bottomValue: { marginLeft: "auto", color: "#111827" },
//   ingRow: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 5,
//   },
//   ingText: { width: "25%", color: "#374151" },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { API } from "../../api/api";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function RationScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { groupId, groupTitle } = route.params;

  const [ration, setRation] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [kg, setKg] = useState("");

  useEffect(() => {
    loadData();
    navigation.setOptions({ title: `${groupTitle}` });
  }, []);

  const loadData = async () => {
    try {
      const r = await API.get(`/ration/${groupId}`);
      const h = await API.get(`/ration/history/${groupId}`);

      setRation(r.data?.ration || null);
      setIngredients(r.data?.ingredients || []);
      setHistory(h.data?.history || []);
    } catch (e) {
      console.error(e);
      setIngredients([]);
      setHistory([]);
    }
  };

  if (!ration) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Loading ration…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* ================= SECTION 1: BASIC ================= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Feed Summary</Text>

        <InfoRow label="Feed Name" value={ration.name} />
        <InfoRow label="Animals" value={ration.no} />
        <InfoRow label="Kg / Animal" value={`${ration.kg} kg`} />
        <InfoRow label="Total Feed" value={`${ration.total} kg`} />

        <Divider />

        <InfoRow
          icon="percent-outline"
          label="Ration Size"
          value={`${ration.rationSize}%`}
        />
        <InfoRow icon="calendar" label="Days" value={`${ration.days} days`} />
      </View>

      {/* ================= SECTION 2: HISTORY ================= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last 7 Days Feed History</Text>

        {Array.isArray(history) && history.length > 0 ? (
          history.map((h, i) => (
            <View key={i} style={styles.historyRow}>
              <Text style={styles.historyDate}>
                {new Date(h.createdAt).toDateString()}
              </Text>
              <Text style={styles.historyValue}>{h.total} kg</Text>
            </View>
          ))
        ) : (
          <Text style={styles.muted}>No history available</Text>
        )}
      </View>

      {/* ================= SECTION 3: INGREDIENTS ================= */}
      <View style={styles.card}>
        <Text style={styles.title}>Ingredients</Text>

        {ingredients.map((ing) => {
          const dryMatter = ((ing.quantity * ing.dm) / 100).toFixed(2);

          return (
            <View key={ing.consumptionId} style={styles.row}>
              <View>
                <Text style={styles.name}>{ing.name}</Text>
                <Text>Per Animal: {ing.quantity} kg</Text>
                <Text>Dry Matter: {dryMatter} kg</Text>
              </View>
              <Feather
                name="edit"
                size={18}
                onPress={() => {
                  setEditing(ing);
                  setKg(String(ing.quantity));
                }}
              />
            </View>
          );
        })}
      </View>
      {/* EDIT MODAL */}
      {editing && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{editing.name}</Text>

          <TextInput
            style={styles.input}
            placeholder="Per animal kg"
            value={kg}
            keyboardType="numeric"
            onChangeText={setKg}
          />
          <Text>
            Dry Matter: {((Number(kg || 0) * editing.dm) / 100).toFixed(2)} kg
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => setEditing(null)}
              style={styles.cancel}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await API.put(`/ration/ingredient/${editing.consumptionId}`, {
                  kg: Number(kg),
                });
                setEditing(null);
                loadData();
              }}
              style={styles.save}
            >
              <Text style={{ color: "#fff" }}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* ================= SECTION 4: MIX PRECISION ================= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mix Precision</Text>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Start Mixing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ================= REUSABLE ================= */

const InfoRow = ({ label, value, icon }: any) => (
  <View style={styles.infoRow}>
    {icon && (
      <MaterialCommunityIcons
        name={icon}
        size={18}
        color="#2563EB"
        style={{ marginRight: 6 }}
      />
    )}
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  infoLabel: {
    flex: 1,
    color: "#374151",
    fontWeight: "600",
  },

  infoValue: {
    color: "#111827",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  historyDate: {
    color: "#374151",
  },

  historyValue: {
    fontWeight: "700",
    color: "#111827",
  },

  ingCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },

  ingName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  ingSub: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  primaryBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  primaryBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },

  muted: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
  modalOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 14,
    padding: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  modalLabel: {
    fontWeight: "600",
    marginTop: 10,
    color: "#374151",
  },

  modalValue: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  cancelBtn: {
    backgroundColor: "#9CA3AF",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
  },

  deleteBtn: {
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 6,
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  /* ================= INGREDIENT ROW ================= */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },

  subText: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  /* ================= BUTTONS ================= */
  mixBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#2563EB",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },

  mixText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  /* ================= MODAL ================= */
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(15,23,42,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  input: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    fontWeight: "700",
    backgroundColor: "#FFFFFF",
  },

  dmText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  /* ================= MODAL ACTIONS ================= */
  actions: {
    flexDirection: "row",
    marginTop: 24,
    gap: 10,
  },

  cancel: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#94A3B8",
    alignItems: "center",
  },

  delete: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#EF4444",
    alignItems: "center",
  },

  save: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },

  /* ================= EMPTY ================= */
  emptyText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 20,
    fontWeight: "600",
  },
});
