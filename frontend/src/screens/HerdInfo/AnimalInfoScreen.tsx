// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { API } from "../../api/api";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function AnimalDetailsScreen() {
//   const [animalAge, setanimalAge] = useState("");
//   const [animalsInfo, setAnimalsInfo] = useState<Record<string, any>>({});

//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { groupId, animalNumber } = route.params;
//   const { userId } = route.params;
//   // Fetch animals for this group
//   const loadAnimalsInfo = () => {
//     API.get(`/animals/${animalNumber}`)
//       .then((res) => {
//         if (res.data.details) {
//           setAnimalsInfo(res.data.details);
//         } else {
//           setAnimalsInfo({});
//         }
//       })
//       .catch(() => setAnimalsInfo({}));
//   };

//   useEffect(() => {
//     loadAnimalsInfo();
//     nav.setOptions({
//       title: `Animal ${animalNumber}`,
//     });
//   }, [animalNumber]);

//   const save = () => {
//     API.put("/animals/update-age", {
//       animalNumber,
//       groupId,
//       userId,
//       age: animalAge,
//     }).then(() => {
//       alert("Saved");
//       nav.goBack();
//       loadAnimalsInfo();
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Animal Details</Text>

//       <Text style={styles.label}>Animal Age</Text>
//       <TextInput
//         value={animalAge}
//         onChangeText={setanimalAge}
//         style={styles.input}
//       />

//       <TouchableOpacity onPress={save} style={styles.button}>
//         <Text style={styles.buttonText}>Save Details</Text>
//       </TouchableOpacity>
//       {/* Animal List */}
//       {animalsInfo && (
//         <View style={styles.detailsBox}>
//           {Object.entries(animalsInfo).map(([key, value]) => (
//             <Text key={key} style={styles.detailsItem}>
//               {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
//             </Text>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 25,
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "600",
//     marginBottom: 16,
//   },
//   detailsBox: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 20,
//     elevation: 2,
//   },
//   detailsItem: {
//     fontSize: 16,
//     marginVertical: 4,
//     color: "#1f2937",
//     fontWeight: "500",
//   },

//   label: {
//     marginBottom: 8,
//     fontWeight: "600",
//   },
//   input: {
//     backgroundColor: "#ffffff",
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: "#2563eb",
//     padding: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//   },
//   buttonText: {
//     textAlign: "center",
//     color: "#ffffff",
//     fontWeight: "600",
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { API } from "../../api/api";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AnimalDetailsScreen() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");

  const [details, setDetails] = useState<Record<string, any>>({});

  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { groupId, animalNumber, userId } = route.params;

  const loadDetails = () => {
    API.get(`/animals/${animalNumber}`).then((res) => {
      const d = res.data.details || {};
      setDetails(d);

      // Pre-fill fields if existing
      // setAge(d.age || "");
      // setWeight(d.weight || "");
      // setColor(d.color || "");
    });
  };

  useEffect(() => {
    loadDetails();
    nav.setOptions({ title: `Animal ${animalNumber}` });
  }, []);

  const save = () => {
    const data = { age, weight, color };

    API.put("/animals/update-details", {
      animalNumber,
      groupId,
      userId,
      details: data,
    }).then(() => {
      alert("Details Saved");
      setAge("");
      setWeight("");
      setColor("");
      loadDetails();
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Animal Details</Text>

      {/* Age */}
      <Text style={styles.label}>Age (Months)</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g. 12"
      />

      {/* Weight */}
      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g. 150"
      />

      {/* Color */}
      <Text style={styles.label}>Color</Text>
      <TextInput
        value={color}
        onChangeText={setColor}
        style={styles.input}
        placeholder="e.g. Brown"
      />

      <TouchableOpacity onPress={save} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Saved Details</Text>
      </TouchableOpacity>

      {/* SHOW DETAILS BOX */}
      {Object.keys(details).length > 0 && (
        <View style={styles.detailsBox}>
          <Text style={styles.detailsTitle}>Saved Details</Text>

          {Object.entries(details).map(([key, value]) => (
            <Text key={key} style={styles.detailsItem}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
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
