// import React from "react";
// import type { ComponentProps } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useAuth } from "../../context/AuthContext";

// type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

// const menuItems: {
//   id: string;
//   title: string;
//   icon: IconName;
//   route: string;
// }[] = [
//   { id: "0", title: "Milking Group", icon: "cow", route: "MilkingHerd" },
//   {
//     id: "1",
//     title: "Non-Milking Group",
//     icon: "cow-off",
//     route: "NonMilkingHerd",
//   },
// ];
// export default function HerdInfoScreen() {
//   const navigation = useNavigation<any>();
//   const { user } = useAuth();

//   console.log("herdinfoScreen userId:", user?.id);
//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>Herd Information</Text> */}
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
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 1,
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
//   cardText: {
//     flex: 1,
//     fontSize: 18,
//     color: "#1f2937",
//     fontWeight: "600",
//   },
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
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const menuItems: {
  id: string;
  title: string;
  icon: IconName;
  route: string;
  bg: string;
}[] = [
  {
    id: "0",
    title: "Milking Group",
    icon: "cow",
    route: "MilkingHerd",
    bg: "#E0F2FE",
  },
  {
    id: "1",
    title: "Non-Milking Group",
    icon: "cow-off",
    route: "NonMilkingHerd",
    bg: "#FEF3C7",
  },
];

export default function HerdInfoScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  return (
    <View style={styles.screen}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(item.route, { userId: user?.id })
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

            {/* TITLE */}
            <Text style={styles.cardTitle}>{item.title}</Text>

            {/* CHEVRON */}
            <Feather name="chevron-right" size={26} color="#0284C7" />
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

  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});
