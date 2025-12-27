// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function NonMilkingGroupScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { userId } = route.params;
//   const menuItems = [
//     {
//       id: 4,
//       title: "Group 4 – Starter calf",
//       extrainfo: "(0–2 months)",
//       route: "AnimalNumbers",
//     },
//     {
//       id: 5,
//       title: "Group 5 – Starter calf",
//       extrainfo: "(3–6 months)",
//       route: "AnimalNumbers",
//     },
//     {
//       id: 6,
//       title: "Group 6 – Grower calf",
//       extrainfo: "(6–12 months)",
//       route: "AnimalNumbers",
//     },
//     {
//       id: 7,
//       title: "Group 7 – Heifer",
//       extrainfo: "(12–24 months)",
//       route: "AnimalNumbers",
//     },
//     {
//       id: 8,
//       title: "Group 8 – Dry cow",
//       extrainfo: "(Far off -60 to -21 days)",
//       route: "AnimalNumbers",
//     },
//     {
//       id: 9,
//       title: "Group 9 – Dry cow",
//       extrainfo: "(Close up -21 to 0 days)",
//       route: "AnimalNumbers",
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Non-Milking Groups</Text>

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
//                 groupTitle: item.title,
//                 userId,
//               })
//             }
//           >
//             {/* <Text style={styles.groupText}>
//               {item.title} {item.extrainfo}
//             </Text> */}
//             <Text style={styles.groupText}>
//               {item.title}{" "}
//               <Text style={styles.extraInfoText}>{item.extrainfo}</Text>
//             </Text>

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
//   card: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     // Basic shadow for iOS
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     // Elevation for Android
//     elevation: 1,
//   },
//   cardText: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1f2937",
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
//   extraInfoText: {
//     color: "#6b7280",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NonMilkingGroupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId } = route.params;

  const menuItems = [
    {
      id: 4,
      title: "Starter Calf",
      extrainfo: "0–2 months",
      icon: "cow",
      bg: "#DCFCE7",
    },
    {
      id: 5,
      title: "Starter Calf",
      extrainfo: "3–6 months",
      icon: "cow",
      bg: "#DCFCE7",
    },
    {
      id: 6,
      title: "Grower Calf",
      extrainfo: "6–12 months",
      icon: "cow",
      bg: "#E0F2FE",
    },
    {
      id: 7,
      title: "Heifer",
      extrainfo: "12–24 months",
      icon: "cow",
      bg: "#FEF3C7",
    },
    {
      id: 8,
      title: "Dry Cow",
      extrainfo: "Far off (−60 to −21 days)",
      icon: "cow-off",
      bg: "#FEE2E2",
    },
    {
      id: 9,
      title: "Dry Cow",
      extrainfo: "Close up (−21 to 0 days)",
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
              nav.navigate("AnimalNumbers", {
                groupId: item.id,
                groupTitle: `Group ${item.id} – ${item.title}`,
                userId,
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
              <Text style={styles.extraInfo}>{item.extrainfo}</Text>
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
