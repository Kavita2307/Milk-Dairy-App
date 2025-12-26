// import React from "react";
// import type { ComponentProps } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useAuth } from "../../context/AuthContext";
// type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

// const menuItems: {
//   id: string;
//   title: string;
//   icon: IconName;
//   route: string;
// }[] = [
//   {
//     id: "0",
//     title: "Herd Information",
//     icon: "cow",
//     route: "Herd Information",
//   },
//   { id: "1", title: "Ration", icon: "food", route: "RationGroup" },
//   {
//     id: "2",
//     title: "Milk Production",
//     icon: "cup-water",
//     route: "MilkGroup",
//   },
//   { id: "3", title: "Leftover", icon: "food-off", route: "LeftoverGroup" },
//   // {
//   //   id: "4",
//   //   title: "Milking Groups",
//   //   icon: "cow",
//   //   route: "MilkingGroups",
//   // },
//   // {
//   //   id: "5",
//   //   title: "Non-Milking Groups",
//   //   icon: "cow-off",
//   //   route: "Non-MilkingGroups",
//   // },
//   { id: "6", title: "Ingredients store", icon: "cart", route: "Inventory" },
//   { id: "7", title: "Report", icon: "file", route: "Reports" },
//   { id: "8", title: "Display", icon: "file", route: "Display" },
// ];

// export default function DashboardScreen() {
//   const navigation = useNavigation<any>();
//   const { user } = useAuth();

//   return (
//     <View style={styles.screen}>
//       {/* <Text style={styles.title}>Dashboard</Text> */}

//       <FlatList
//         data={menuItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate(item.route, { userId: user?.id })
//             }
//             style={styles.menuItem}
//           >
//             <MaterialCommunityIcons
//               name={item.icon}
//               size={30}
//               color="#0284C7"
//               style={{ width: 40 }}
//             />

//             <Text style={styles.menuTitle}>{item.title}</Text>

//             <Feather name="chevron-right" size={28} color="#0284C7" />
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#f3f4f6",
//     paddingHorizontal: 16,
//     paddingTop: 25,
//     paddingVertical: 12,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#1f2937",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   menuItem: {
//     flexDirection: "row",
//     backgroundColor: "#ffffff",
//     padding: 20,
//     marginBottom: 12,
//     borderRadius: 16,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.06,
//     shadowRadius: 4,
//     elevation: 1,
//   },
//   menuTitle: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//   },
//   container: { flex: 1, padding: 20, justifyContent: "center" },
//   heading: { fontSize: 28, marginBottom: 20, textAlign: "center" },
//   button: {
//     marginVertical: 10,
//     backgroundColor: "#2d6cdf",
//     padding: 15,
//     borderRadius: 10,
//   },
//   btnText: { fontSize: 20, color: "#fff", textAlign: "center" },
// });
import React from "react";
import type { ComponentProps } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const menuItems: {
  id: string;
  title: string;
  icon: IconName;
  route: string;
  color: string;
}[] = [
  {
    id: "0",
    title: "Herd Information",
    icon: "cow",
    route: "Herd Information",
    color: "#16A34A",
  },
  {
    id: "1",
    title: "Ration",
    icon: "food",
    route: "RationGroup",
    color: "#EA580C",
  },
  {
    id: "2",
    title: "Milk Production",
    icon: "cup-water",
    route: "MilkGroup",
    color: "#0284C7",
  },
  {
    id: "3",
    title: "Leftover",
    icon: "food-off",
    route: "LeftoverGroup",
    color: "#DC2626",
  },
  {
    id: "6",
    title: "Ingredients Store",
    icon: "cart",
    route: "Inventory",
    color: "#7C3AED",
  },
  {
    id: "7",
    title: "Report",
    icon: "file-chart",
    route: "Reports",
    color: "#0F766E",
  },
  {
    id: "8",
    title: "Display",
    icon: "monitor-dashboard",
    route: "Display",
    color: "#9333EA",
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  return (
    <View style={styles.screen}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate(item.route, { userId: user?.id })
            }
            style={styles.card}
          >
            {/* Icon */}
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: `${item.color}20` },
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color={item.color}
              />
            </View>

            {/* Title */}
            <View style={styles.textWrapper}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              {/* <Text style={styles.menuSub}>Tap to open</Text> */}
            </View>

            <Feather name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 14,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  textWrapper: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  menuSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
});
