// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { useAuth } from "../../context/AuthContext";
// import { API } from "../../api/api";

// export default function ProfileScreen() {
//   const { user } = useAuth();
//   console.log("Profile Screen User:", user);
//   const [email, setEmail] = useState(user?.email || "");
//   const [address, setAddress] = useState((user as any)?.address || "");
//   const [pincode, setPincode] = useState((user as any)?.pincode || "");

//   const saveProfile = async () => {
//     try {
//       await API.put("/profile", {
//         address,
//         pincode,
//         email: email || undefined,
//         userId: String(user?.id),
//       });
//       Alert.alert("Success..!!", "Profile updated successfully");
//     } catch (err: any) {
//       Alert.alert("Error", err.response?.data?.error || "Update failed");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "android" ? "padding" : "padding"}
//     >
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* BASIC INFO */}
//         <View style={styles.card}>
//           <InfoRow label="Full Name" value={user?.name} />
//           <InfoRow label="Mobile Number" value={user?.mobile} />
//         </View>

//         {/* EMAIL */}
//         <View style={styles.card}>
//           {!user?.email ? (
//             <>
//               <Text style={styles.fieldTitle}>Add Email</Text>
//               <TextInput
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="example@email.com"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 style={styles.input}
//               />
//             </>
//           ) : (
//             <InfoRow label="Email Address" value={user.email} />
//           )}
//         </View>

//         {/* ADDRESS */}
//         <View style={styles.card}>
//           <Text style={styles.fieldTitle}>Address</Text>
//           <TextInput
//             value={address}
//             onChangeText={setAddress}
//             placeholder="Enter your address"
//             style={[styles.input, styles.multiline]}
//             multiline
//           />

//           <Text style={styles.fieldTitle}>Pincode</Text>
//           <TextInput
//             value={pincode}
//             onChangeText={setPincode}
//             placeholder="Enter pincode"
//             keyboardType="number-pad"
//             style={styles.input}
//           />
//         </View>

//         <TouchableOpacity style={styles.button} onPress={saveProfile}>
//           <Text style={styles.buttonText}>Save Changes</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const InfoRow = ({ label, value }: { label: string; value?: string }) => (
//   <View style={styles.infoRow}>
//     <Text style={styles.infoLabel}>{label}</Text>
//     <Text style={styles.infoValue}>{value || "—"}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F2F5F9",
//     padding: 16,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "700",
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 18,
//     marginBottom: 16,
//     elevation: 3,
//   },

//   /* Attractive Field Titles */
//   fieldTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#1F2937",
//     marginBottom: 8,
//     marginTop: 14,
//     letterSpacing: 0.3,
//   },

//   input: {
//     backgroundColor: "#F9FAFB",
//     borderRadius: 12,
//     padding: 14,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     fontSize: 15,
//   },
//   multiline: {
//     height: 90,
//     textAlignVertical: "top",
//   },

//   button: {
//     backgroundColor: "#4F46E5",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   infoRow: {
//     marginBottom: 12,
//   },
//   infoLabel: {
//     fontSize: 17,
//     color: "#111827",
//     fontWeight: "600",
//     marginBottom: 3,
//     letterSpacing: 0.4,
//   },
//   infoValue: {
//     fontSize: 17,
//     color: "#52555cff",
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useAuth } from "../../context/AuthContext";
import { API } from "../../api/api";
import { EditableRow } from "./EditableRow";
import { SCREEN_NETWORK_MAP } from "@/src/network/ScreenNetworkMap";
import { resolveNetwork } from "@/src/network/NetworkManager";

const SCREEN_NAME = "ProfileScreen";

export default function ProfileScreen() {
  const { user } = useAuth();

  // --------------------
  // FIELD STATES
  // --------------------
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState((user as any)?.address || "");
  const [pincode, setPincode] = useState((user as any)?.pincode || "");

  // which field is currently being edited
  const [editField, setEditField] = useState<
    null | "mobile" | "email" | "address" | "pincode"
  >(null);

  // --------------------
  // SAVE PROFILE
  // --------------------
  const saveProfile = async () => {
    const policy = SCREEN_NETWORK_MAP[SCREEN_NAME]; // undefined → MOBILE_FIRST
    const decision = await resolveNetwork(policy);

    if (!decision.canSend) {
      Alert.alert(
        "Network Error",
        decision.reason || "Please enable mobile data"
      );
      return;
    }

    try {
      await API.put("/profile", {
        userId: String(user?.id),
        email: email || undefined,
        address,
        pincode,
      });

      Alert.alert("Success..!!", "Profile updated successfully");
      setEditField(null); // switch back to view mode
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.error || "Update failed");
    }
  };

  // --------------------
  // UI
  // --------------------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "padding" : "padding"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= BASIC INFO (READ ONLY) ================= */}
        <View style={styles.card}>
          <InfoRow label="Full Name" value={user?.name} />
          {/* <InfoRow label="Mobile Number" value={user?.mobile} /> */}
        </View>

        {/* ================= EMAIL ================= */}
        <View style={styles.card}>
          <EditableRow
            label="Mobile Number"
            value={mobile}
            isEditing={editField === "mobile"}
            onEdit={() => setEditField("mobile")}
            onChangeText={setMobile}
            onSave={saveProfile}
            placeholder="1234567890"
            keyboardType="number-pad"
          />
          <EditableRow
            label="Email Address"
            value={email}
            isEditing={editField === "email"}
            onEdit={() => setEditField("email")}
            onChangeText={setEmail}
            onSave={saveProfile}
            placeholder="example@email.com"
            keyboardType="email-address"
          />
        </View>

        {/* ================= ADDRESS & PINCODE ================= */}
        <View style={styles.card}>
          <EditableRow
            label="Address"
            value={address}
            isEditing={editField === "address"}
            onEdit={() => setEditField("address")}
            onChangeText={setAddress}
            onSave={saveProfile}
            placeholder="Enter your address"
            multiline
          />

          <EditableRow
            label="Pincode"
            value={pincode}
            isEditing={editField === "pincode"}
            onEdit={() => setEditField("pincode")}
            onChangeText={setPincode}
            onSave={saveProfile}
            placeholder="Enter pincode"
            keyboardType="number-pad"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --------------------
// READ-ONLY ROW
// --------------------
const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// --------------------
// STYLES
// --------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  infoRow: {
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 17,
    color: "#52555c",
  },
});
