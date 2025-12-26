// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert, Keyboard } from "react-native";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigation } from "@react-navigation/native";

// export default function RegisterScreen() {
//   const { register } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const navigation = useNavigation();

//   const submit = async () => {
//     Keyboard.dismiss(); // closes keyboard immediately

//     console.log("clicked on registration button");
//     try {
//       await register(name, mobile, password, email);
//       Alert.alert("Success 🎉", "Account created successfully!", [
//         {
//           text: "Continue",
//           onPress: () => (navigation as any).navigate("Login"),
//         },
//       ]);
//     } catch (err: any) {
//       Alert.alert("Register failed", err.response?.data?.error || err.message);
//     }
//   };

//   return (
//     <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
//       <Text style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>
//         Register
//       </Text>
//       <Text>Name</Text>
//       <TextInput
//         value={name}
//         onChangeText={setName}
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />
//       <Text>Mobile No.</Text>
//       <TextInput
//         value={mobile}
//         onChangeText={setMobile}
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />
//       <Text>Email</Text>
//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />
//       <Text>Password</Text>
//       <TextInput
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />
//       <Button title="Register" onPress={submit} />
//     </View>
//   );
// }
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

export default function RegisterScreen() {
  const { register } = useAuth();
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    Keyboard.dismiss();

    if (!name || !mobile || !password) {
      Alert.alert("Missing fields", "Please fill all fields");
      return;
    }

    try {
      await register(name, mobile, password, email);

      Alert.alert("Success...!!!", "Account created successfully!", [
        {
          text: "Continue",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (err: any) {
      Alert.alert("Register failed", err.response?.data?.error || err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>
            Already have an account? <Text style={styles.linkBold}>Login</Text>
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
