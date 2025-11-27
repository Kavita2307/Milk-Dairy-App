// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useAuth } from "../context/AuthContext";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";

// export default function AppHeader({ title }: { title: string }) {
//   const { user, logout } = useAuth();
//   const navigation = useNavigation<any>();

//   return (
//     <View style={styles.header}>
//       {/* LEFT: Profile Icon */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate("ProfileScreen")}
//         style={styles.iconButton}
//       >
//         <Ionicons name="person-circle-outline" size={36} color="#fff" />
//       </TouchableOpacity>

//       {/* CENTER: Username */}
//       <Text style={styles.title}>{title}</Text>

//       {/* RIGHT: Logout Icon */}
//       <TouchableOpacity onPress={logout} style={styles.iconButton}>
//         <Ionicons name="log-out-outline" size={30} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     width: "100%",
//     paddingTop: 55,
//     paddingBottom: 5,
//     paddingHorizontal: 15,
//     backgroundColor: "#9ea0a3ff",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   iconButton: {
//     padding: 5,
//   },
// });
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function AppHeader({ title }: { title: string }) {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();
  const route = useRoute();

  // Screens where BACK BUTTON should NOT be shown
  const rootScreens = ["MainStacks", "Dashboard"];

  const showBack = !rootScreens.includes(route.name);

  return (
    <View style={styles.header}>
      {/* LEFT SIDE */}
      {showBack ? (
        // BACK BUTTON
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
      ) : (
        // PROFILE ICON only for root screens
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileScreen")}
          style={styles.iconButton}
        >
          <Ionicons name="person-circle-outline" size={36} color="#fff" />
        </TouchableOpacity>
      )}

      {/* TITLE IN CENTER */}
      <Text style={styles.title}>{title}</Text>

      {/* RIGHT SIDE — LOGOUT */}
      <TouchableOpacity onPress={logout} style={styles.iconButton}>
        <Ionicons name="log-out-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 55,
    paddingBottom: 5,
    paddingHorizontal: 15,
    backgroundColor: "#9ea0a3ff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 600,
  },
  iconButton: {
    padding: 5,
  },
});
