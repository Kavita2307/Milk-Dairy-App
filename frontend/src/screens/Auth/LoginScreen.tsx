import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    Keyboard.dismiss(); // closes keyboard immediately
    console.log("clicked on login button");
    try {
      await login(email, password);
      Alert.alert("Success 🎉", "Logged in successfully!");
    } catch (err: any) {
      Alert.alert("Login failed", err.response?.data?.error || err.message);
    }
    console.log("clicked... login button done");
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Login" onPress={submit} />

      {/* Register Link */}
      <TouchableOpacity
        onPress={() => (navigation as any).navigate("Register")}
      >
        <Text style={{ color: "blue", marginTop: 20, textAlign: "center" }}>
          Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
}
