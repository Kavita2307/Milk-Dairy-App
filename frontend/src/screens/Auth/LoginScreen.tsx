// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
// } from "react-native";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigation } from "@react-navigation/native";

// export default function LoginScreen() {
//   const { login } = useAuth();
//   const navigation = useNavigation<any>();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = async () => {
//     Keyboard.dismiss();

//     if (!email || !password) {
//       Alert.alert("Missing fields", "Please enter email and password");
//       return;
//     }

//     try {
//       await login(email, password);
//       Alert.alert("Success 🎉", "Logged in successfully!");
//     } catch (err: any) {
//       Alert.alert("Login failed", err.response?.data?.error || err.message);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <View style={styles.card}>
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Login to your account</Text>

//         <TextInput
//           placeholder="Email Address"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//         />

//         <TouchableOpacity style={styles.button} onPress={submit}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//           <Text style={styles.link}>
//             Don’t have an account? <Text style={styles.linkBold}>Register</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F2F5F9",
//     justifyContent: "center",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 24,
//     elevation: 4,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 14,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#4F46E5",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   link: {
//     textAlign: "center",
//     marginTop: 16,
//     color: "#555",
//   },
//   linkBold: {
//     color: "#4F46E5",
//     fontWeight: "600",
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    Keyboard.dismiss();

    if (!username || !password) {
      Alert.alert(
        "Missing fields",
        "Please enter email or mobile number and password"
      );
      return;
    }

    try {
      console.log("login called with:", username, password);
      await login(username, password);
      Alert.alert("Success...!!!", "Logged in successfully!");
    } catch (err: any) {
      Alert.alert("Login failed", err.response?.data?.error || err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login with email or mobile number</Text>

        <TextInput
          placeholder="Email or Mobile Number"
          value={username}
          onChangeText={setUsername}
          keyboardType={/^\d+$/.test(username) ? "phone-pad" : "email-address"}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>
            Don’t have an account? <Text style={styles.linkBold}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 16,
    color: "#555",
  },
  linkBold: {
    color: "#4F46E5",
    fontWeight: "600",
  },
});
