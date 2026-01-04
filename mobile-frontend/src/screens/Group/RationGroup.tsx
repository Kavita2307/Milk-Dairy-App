// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function RationGroupScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { userId } = route.params;
//   const menuItems = [
//     {
//       id: 1,
//       title: "Group 1 (High Yielder)",
//       icon: "full-milk-can",
//       route: "Ration",
//     },
//     {
//       id: 2,
//       title: "Group 2 (Medium Yielder)",
//       icon: "3/4full-milk-can",
//       route: "Ration",
//     },
//     {
//       id: 3,
//       title: "Group 3 (Low Yielder)",
//       icon: "half-milk-can",
//       route: "Ration",
//     },
//     {
//       id: 4,
//       title: "Group 4 – Starter calf (0–2 months)",
//       route: "Ration",
//     },
//     {
//       id: 5,
//       title: "Group 5 – Starter calf (3–6 months)",
//       route: "Ration",
//     },
//     {
//       id: 6,
//       title: "Group 6 – Grower calf (6–12 months)",
//       route: "Ration",
//     },
//     {
//       id: 7,
//       title: "Group 7 – Heifer (12–24 months)",
//       route: "Ration",
//     },
//     {
//       id: 8,
//       title: "Group 8 – Dry cow (Far off -60 to -21 days)",
//       route: "Ration",
//     },
//     {
//       id: 9,
//       title: "Group 9 – Dry cow (Close up -21 to 0 days)",
//       route: "Ration",
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>Milking Groups</Text> */}
//       <FlatList
//         data={menuItems}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             key={item.id}
//             style={styles.groupRow}
//             onPress={() =>
//               nav.navigate(item.route, {
//                 groupId: item.id,
//                 userId,
//                 groupTitle: item.title,
//               })
//             }
//           >
//             <Text style={styles.groupText}>{item.title}</Text>
//             <Feather name="chevron-right" size={26} color="#0ea5e9" />
//           </TouchableOpacity>
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
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#1f2937",
//     marginBottom: 24,
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
//   groupText: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1f2937",
//   },
// });
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RationGroupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId } = route.params;

  const menuItems = [
    {
      id: 1,
      title: "High Yielder",
      info: "Milking Group",
      icon: "cow",
      bg: "#DCFCE7",
    },
    {
      id: 2,
      title: "Medium Yielder",
      info: "Milking Group",
      icon: "cow",
      bg: "#E0F2FE",
    },
    {
      id: 3,
      title: "Low Yielder",
      info: "Milking Group",
      icon: "cow",
      bg: "#FEF3C7",
    },
    {
      id: 4,
      title: "Starter Calf",
      info: "0–2 months",
      icon: "cow",
      bg: "#E0E7FF",
    },
    {
      id: 5,
      title: "Starter Calf",
      info: "3–6 months",
      icon: "cow",
      bg: "#E0E7FF",
    },
    {
      id: 6,
      title: "Grower Calf",
      info: "6–12 months",
      icon: "cow",
      bg: "#DBEAFE",
    },
    {
      id: 7,
      title: "Heifer",
      info: "12–24 months",
      icon: "cow",
      bg: "#FEF9C3",
    },
    {
      id: 8,
      title: "Dry Cow",
      info: "Far off (−60 to −21 days)",
      icon: "cow-off",
      bg: "#FEE2E2",
    },
    {
      id: 9,
      title: "Dry Cow",
      info: "Close up (−21 to 0 days)",
      icon: "cow-off",
      bg: "#FEE2E2",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              nav.navigate("Ration", {
                groupId: item.id,
                userId,
                groupTitle: `Group ${item.id} – ${item.title}`,
              })
            }
          >
            {/* ICON */}
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={26}
                color="#1E40AF"
              />
            </View>

            {/* TEXT */}
            <View style={{ flex: 1 }}>
              <Text style={styles.groupTitle}>
                Group {item.id} – {item.title}
              </Text>
              <Text style={styles.extraInfo}>{item.info}</Text>
            </View>

            {/* CHEVRON */}
            <Feather name="chevron-right" size={24} color="#94A3B8" />
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
    paddingTop: 25,
  },

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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  groupTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  extraInfo: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
});
