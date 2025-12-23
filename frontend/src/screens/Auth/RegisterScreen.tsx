import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Keyboard } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const submit = async () => {
    Keyboard.dismiss(); // closes keyboard immediately

    console.log("clicked on registration button");
    try {
      await register(email, password, name);
      Alert.alert("Success 🎉", "Account created successfully!", [
        {
          text: "Continue",
          onPress: () => (navigation as any).navigate("Login"),
        },
      ]);
    } catch (err: any) {
      Alert.alert("Register failed", err.response?.data?.error || err.message);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text>
      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
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
      <Button title="Register" onPress={submit} />
    </View>
  );
}
