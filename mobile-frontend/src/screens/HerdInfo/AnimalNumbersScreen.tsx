// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { API } from "../../api/api";

// export default function AnimalNumbersScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { groupId, groupTitle, userId } = route.params;
//   const [loading, setLoading] = useState(false);

//   const [animals, setAnimals] = useState<any[]>([]);
//   const [animalNumber, setAnimalNumber] = useState("");

//   // Fetch animals for this group
//   const loadAnimals = () => {
//     console.log("Loading animals for group:", groupId);
//     API.get("/animals").then((res) => {
//       setAnimals(res.data.filter((a: any) => a.groupId === groupId));
//     });
//   };
//   useEffect(() => {
//     loadAnimals();

//     nav.setOptions({
//       title: groupTitle || `Group ${groupId}`,
//     });
//   }, [groupId, groupTitle]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Animal List</Text>

//       {/* Add Button */}
//       <TouchableOpacity
//         onPress={() => {
//           if (groupId < 4) {
//             nav.navigate("MilkAnimalInfo", {
//               groupId,
//               userId,
//             });
//           } else {
//             nav.navigate("NonMilkAnimalInfo", {
//               groupId,
//               userId,
//             });
//           }
//         }}
//         style={styles.addButton}
//       >
//         <Text style={styles.addButtonText}>➕ Add New Animal</Text>
//       </TouchableOpacity>

//       {/* Animal List */}
//       <FlatList
//         data={animals}
//         keyExtractor={(i) => i.id.toString()}
//         renderItem={({ item }) => (
//           <View>
//             <TouchableOpacity
//               key={item.id}
//               style={styles.groupRow}
//               onPress={() => {
//                 if (groupId < 4) {
//                   nav.navigate("UpdateMilkAnimalInfo", {
//                     animalNumber: item.animalNumber,
//                     groupId,
//                     userId,
//                   });
//                 } else {
//                   nav.navigate("UpdateNonMilkAnimalInfo", {
//                     animalNumber: item.animalNumber,
//                     groupId,
//                     userId,
//                   });
//                 }
//               }}
//             >
//               <Text style={styles.itemText}>Animal #{item.animalNumber}</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 25,
//     backgroundColor: "#f3f4f6",
//     padding: 20,
//     color: "black",
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "600",
//     marginBottom: 16,
//     paddingLeft: 8,
//   },
//   addButton: {
//     backgroundColor: "#10B981",
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   addButtonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   groupRow: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     elevation: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//   },
//   formBox: {
//     marginBottom: 20,
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     backgroundColor: "#fafafa",
//   },
//   label: { marginBottom: 8, fontWeight: "600" },
//   input: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     marginBottom: 12,
//   },

//   saveBtn: {
//     flex: 1,
//     backgroundColor: "#2563eb",
//     padding: 14,
//     borderRadius: 10,
//   },
//   saveBtnText: { color: "#fff", textAlign: "center", fontWeight: "600" },

//   cancelBtn: {
//     flex: 1,
//     backgroundColor: "#9ca3af",
//     padding: 14,
//     borderRadius: 10,
//   },
//   cancelBtnText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//   },

//   itemContainer: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   itemText: { flex: 1, fontSize: 18, fontWeight: "500", color: "#1f2937" },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { API } from "../../api/api";

export default function AnimalNumbersScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, groupTitle, userId } = route.params;

  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    loadAnimals();
    nav.setOptions({ title: groupTitle || `Group ${groupId}` });
  }, [groupId]);

  const loadAnimals = async () => {
    const res = await API.get("/animals");
    setAnimals(res.data.filter((a: any) => a.groupId === groupId));
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>Animal List</Text>

      {/* ✅ ADD NEW ANIMAL (UNCHANGED UI) */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (groupId < 4) {
            nav.navigate("MilkAnimalInfo", { groupId, userId });
          } else {
            nav.navigate("NonMilkAnimalInfo", { groupId, userId });
          }
        }}
      >
        <Text style={styles.addButtonText}>➕ Add New Animal</Text>
      </TouchableOpacity>

      {/* EMPTY STATE */}
      {animals.length === 0 && (
        <View style={styles.emptyBox}>
          <MaterialCommunityIcons name="cow-off" size={60} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>No animals added</Text>
          <Text style={styles.emptyText}>
            Tap on “Add New Animal” to get started
          </Text>
        </View>
      )}

      {/* ANIMAL LIST */}
      <FlatList
        data={animals}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              if (groupId < 4) {
                nav.navigate("UpdateMilkAnimalInfo", {
                  animalNumber: item.animalNumber,
                  groupId,
                  userId,
                });
              } else {
                nav.navigate("UpdateNonMilkAnimalInfo", {
                  animalNumber: item.animalNumber,
                  groupId,
                  userId,
                });
              }
            }}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="cow" size={26} color="#2563EB" />
            </View>

            <Text style={styles.itemText}>Animal #{item.animalNumber}</Text>

            <Feather name="chevron-right" size={22} color="#94A3B8" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    paddingLeft: 8,
    color: "#1F2937",
  },

  /* ✅ SAME AS YOUR ORIGINAL */
  addButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  /* LIST CARD */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },

  /* EMPTY STATE */
  emptyBox: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    color: "#334155",
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },
});
