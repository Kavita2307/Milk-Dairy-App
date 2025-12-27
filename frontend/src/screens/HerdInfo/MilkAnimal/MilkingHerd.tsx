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
//       route: "AnimalNumbers",
//     },
//     {
//       id: 2,
//       title: "Group 2 (Medium Yielder)",
//       icon: "3/4full-milk-can",
//       route: "AnimalNumbers",
//     },
//     {
//       id: 3,
//       title: "Group 3 (Low Yielder)",
//       icon: "half-milk-can",
//       route: "AnimalNumbers",
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
//                 groupTitle: item.title,
//                 userId,
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
      title: "Group 1",
      subtitle: "High Yielder",
      icon: "cup-water" as const,
      bg: "#DCFCE7", // green
      route: "AnimalNumbers",
    },
    {
      id: 2,
      title: "Group 2",
      subtitle: "Medium Yielder",
      icon: "cup-water" as const,
      bg: "#FEF3C7", // yellow
      route: "AnimalNumbers",
    },
    {
      id: 3,
      title: "Group 3",
      subtitle: "Low Yielder",
      icon: "cup-outline" as const,
      bg: "#FEE2E2", // red
      route: "AnimalNumbers",
    },
  ];

  return (
    <View style={styles.screen}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              nav.navigate(item.route, {
                groupId: item.id,
                groupTitle: `${item.title} (${item.subtitle})`,
                userId,
              })
            }
          >
            {/* ICON */}
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color="#0284C7"
              />
            </View>

            {/* TEXT */}
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

            {/* ARROW */}
            <Feather name="chevron-right" size={26} color="#0284C7" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* -------- STYLES -------- */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 24,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 2,
  },
});
