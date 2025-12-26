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
//   Animated,
//   Keyboard,
// } from "react-native";
// import { useAuth } from "../context/AuthContext";
// import { API } from "../api/api";

// export default function ProfileScreen() {
//   const { user } = useAuth();
//   const [email, setEmail] = useState(user?.email || "");
//   const [address, setAddress] = useState((user as any)?.address || "");
//   const [pincode, setPincode] = useState((user as any)?.pincode || "");
//   const userId = user?.id;

//   console.log("Profile Screen UserID:", userId);
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);
//   const slideAnim = new Animated.Value(100); // hidden initially

//   useEffect(() => {
//     const show = Keyboard.addListener("keyboardDidShow", (e) => {
//       setKeyboardVisible(true);
//       setKeyboardHeight(e.endCoordinates.height);

//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     });

//     const hide = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardVisible(false);

//       Animated.timing(slideAnim, {
//         toValue: 100,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();

//       setKeyboardHeight(0);
//     });

//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, []);
//   const saveProfile = async () => {
//     console.log("Saving profile with:", address, pincode, email);
//     try {
//       await API.put("/profile", {
//         address,
//         pincode,
//         userId: String(userId),
//         email: email || undefined,
//       });
//       Keyboard.dismiss();
//       Alert.alert("Success 🎉", "Profile updated successfully");
//     } catch (err: any) {
//       Alert.alert("Error", err.response?.data?.error || "Update failed");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <View style={styles.container}>
//         <Text style={styles.title}>My Profile</Text>

//         <Text style={styles.label}>Name</Text>
//         <Text style={styles.value}>{user?.name}</Text>

//         <Text style={styles.label}>Mobile</Text>
//         <Text style={styles.value}>{user?.mobile}</Text>

//         {!user?.email ? (
//           <>
//             <Text style={styles.label}>Add Email</Text>
//             <TextInput
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Enter email address"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               style={styles.input}
//             />
//           </>
//         ) : (
//           <>
//             <Text style={styles.label}>Email</Text>
//             <Text style={styles.value}>{user.email}</Text>
//           </>
//         )}

//         <Text style={styles.label}>Address</Text>
//         <TextInput
//           value={address}
//           onChangeText={setAddress}
//           placeholder="Enter your address"
//           style={styles.input}
//           multiline
//         />

//         <Text style={styles.label}>Pincode</Text>
//         <TextInput
//           value={pincode}
//           onChangeText={setPincode}
//           placeholder="Enter pincode"
//           keyboardType="number-pad"
//           style={styles.input}
//         />

//         <TouchableOpacity style={styles.button} onPress={saveProfile}>
//           <Text style={styles.buttonText}>Save</Text>
//         </TouchableOpacity>
//         {keyboardVisible && (
//           <Animated.View
//             style={[
//               styles.arrowContainer,
//               {
//                 bottom: keyboardHeight + 100, // <-- FIXED
//                 transform: [{ translateY: slideAnim }],
//               },
//             ]}
//           >
//             <TouchableOpacity
//               style={styles.arrowButton}
//               onPress={() => Keyboard.dismiss()}
//             >
//               <Text style={styles.arrowText}>→</Text>
//             </TouchableOpacity>
//           </Animated.View>
//         )}
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F2F5F9",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginTop: 10,
//     color: "#555",
//   },
//   value: {
//     fontSize: 16,
//     marginBottom: 6,
//   },
//   input: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 14,
//     marginTop: 6,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   button: {
//     backgroundColor: "#4F46E5",
//     padding: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   arrowContainer: {
//     position: "absolute",
//     right: 20,
//   },
//   arrowButton: {
//     backgroundColor: "#0EA5E9",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   arrowText: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//   },
//   datePickerBox: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 16,
//     elevation: 4,
//   },

//   doneBtn: {
//     backgroundColor: "#2563EB",
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 10,
//   },

//   doneText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "700",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { API } from "../api/api";

export default function ProfileScreen() {
  const { user } = useAuth();

  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState((user as any)?.address || "");
  const [pincode, setPincode] = useState((user as any)?.pincode || "");

  const saveProfile = async () => {
    try {
      await API.put("/profile", {
        address,
        pincode,
        email: email || undefined,
      });
      Alert.alert("Success 🎉", "Profile updated successfully");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.error || "Update failed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BASIC INFO */}
        <View style={styles.card}>
          <InfoRow label="Full Name" value={user?.name} />
          <InfoRow label="Mobile Number" value={user?.mobile} />
        </View>

        {/* EMAIL */}
        <View style={styles.card}>
          {!user?.email ? (
            <>
              <Text style={styles.fieldTitle}>Add Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </>
          ) : (
            <InfoRow label="Email Address" value={user.email} />
          )}
        </View>

        {/* ADDRESS */}
        <View style={styles.card}>
          <Text style={styles.fieldTitle}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            style={[styles.input, styles.multiline]}
            multiline
          />

          <Text style={styles.fieldTitle}>Pincode</Text>
          <TextInput
            value={pincode}
            onChangeText={setPincode}
            placeholder="Enter pincode"
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || "—"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  /* Attractive Field Titles */
  fieldTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    marginTop: 14,
    letterSpacing: 0.3,
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 15,
  },
  multiline: {
    height: 90,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 17,
    color: "#111827",
    fontWeight: "600",
    marginBottom: 3,
    letterSpacing: 0.4,
  },
  infoValue: {
    fontSize: 17,
    color: "#52555cff",
  },
});
