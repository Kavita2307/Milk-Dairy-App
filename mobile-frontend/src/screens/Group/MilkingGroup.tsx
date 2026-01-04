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

// export default function MilkingGroupScreen() {
//   const nav = useNavigation<any>();
//   const route = useRoute<any>();
//   const { userId } = route.params;
//   const menuItems = [
//     {
//       id: 1,
//       title: "Group 1 (High Yielder)",
//       icon: "full-milk-can",
//       route: "ProductionShift",
//     },
//     {
//       id: 2,
//       title: "Group 2 (Medium Yielder)",
//       icon: "3/4full-milk-can",
//       route: "ProductionShift",
//     },
//     {
//       id: 3,
//       title: "Group 3 (Low Yielder)",
//       icon: "half-milk-can",
//       route: "ProductionShift",
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

export default function MilkingGroupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId } = route.params;

  const menuItems = [
    {
      id: 1,
      title: "High Yielder",
      info: "Milking Group",
      icon: "cup-water" as const,
      bg: "#DCFCE7",
    },
    {
      id: 2,
      title: "Medium Yielder",
      info: "Milking Group",
      icon: "cup-water" as const,
      bg: "#E0F2FE",
    },
    {
      id: 3,
      title: "Low Yielder",
      info: "Milking Group",
      icon: "cup-water" as const,
      bg: "#FEF3C7",
    },
  ] as const;

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              nav.navigate("ProductionShift", {
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
