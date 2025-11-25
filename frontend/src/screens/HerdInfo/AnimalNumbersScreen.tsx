// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { API } from "../../api/api";

// export default function AnimalNumbersScreen() {
//   const route = useRoute<any>();
//   const { groupId } = route.params;
//   const { userId } = route.params;
//   console.log("animalNumberScreen: ", groupId, userId);
//   const nav = useNavigation<any>();

//   const [animals, setAnimals] = useState<any[]>([]);

//   useEffect(() => {
//     API.get("/animals").then((res) => {
//       setAnimals(res.data.filter((a: any) => a.groupId === groupId));
//     });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Animal Numbers</Text>

//       <TouchableOpacity
//         onPress={() =>
//           nav.navigate("AnimalNumberInfoScreen", { groupId, userId })
//         }
//         style={styles.addButton}
//       >
//         <Text style={styles.addButtonText}>➕ Add New Animal</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={animals}
//         keyExtractor={(i) => i.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <Text style={styles.itemText}>Animal #{item.animalNumber}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "transparent",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//   },
//   addButton: {
//     backgroundColor: "#10B981",
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   addButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   itemContainer: {
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     // basic shadow for iOS
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     // elevation for Android
//     elevation: 2,
//   },
//   itemText: {
//     fontSize: 18,
//     fontWeight: "500",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { API } from "../../api/api";

export default function AnimalNumbersScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, userId } = route.params;

  const [animals, setAnimals] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [animalNumber, setAnimalNumber] = useState("");

  // Fetch animals for this group
  const loadAnimals = () => {
    API.get("/animals").then((res) => {
      setAnimals(res.data.filter((a: any) => a.groupId === groupId));
    });
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  const saveAnimal = () => {
    if (!animalNumber.trim()) {
      alert("Enter a valid animal number");
      return;
    }

    API.post("/animals", {
      animalNumber,
      groupId,
      userId,
    }).then(() => {
      setAnimalNumber("");
      setShowForm(false);
      loadAnimals(); // reload list
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Animal Numbers</Text>

      {/* Add Button */}
      {!showForm && (
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>➕ Add New Animal</Text>
        </TouchableOpacity>
      )}

      {/* Input Form */}
      {showForm && (
        <View style={styles.formBox}>
          <Text style={styles.label}>Animal Number</Text>

          <TextInput
            value={animalNumber}
            onChangeText={setAnimalNumber}
            style={styles.input}
            placeholder="Enter animal number"
          />

          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity onPress={saveAnimal} style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowForm(false)}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Animal List */}
      <FlatList
        data={animals}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              key={item.id}
              style={styles.groupRow}
              onPress={() =>
                nav.navigate("AnimalInfo", {
                  animalNumber: item.animalNumber,
                  groupId: groupId,
                  userId,
                })
              }
            >
              <Text style={styles.itemText}>Animal #{item.animalNumber}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
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
  },
  groupRow: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  formBox: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },
  label: { marginBottom: 8, fontWeight: "600" },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
  },
  saveBtnText: { color: "#fff", textAlign: "center", fontWeight: "600" },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#9ca3af",
    padding: 14,
    borderRadius: 10,
  },
  cancelBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  itemText: { fontSize: 18, fontWeight: "500" },
});
