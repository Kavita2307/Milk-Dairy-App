import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { readLoadCell, LOAD_CELL_URL } from "../../api/loadCell";

export default function ConnectCheck() {
  const [weight, setWeight] = useState<string>("");
  const [status, setStatus] = useState<string>("Not connected");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      setStatus("Connecting...");

      const data = await readLoadCell();

      setWeight(`${data.weight} ${data.unit}`);
      setStatus("Connected");
    } catch (error) {
      setStatus("Connection failed");
      setWeight("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weighing Machine Connect</Text>

      {/* API URL DISPLAY */}
      <Text style={styles.label}>Machine API URL</Text>
      <TextInput
        value={`${LOAD_CELL_URL}/api/weight`}
        editable={false}
        style={styles.input}
      />

      {/* CONNECT BUTTON */}
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Connect" onPress={handleConnect} />
        )}
      </View>

      {/* STATUS */}
      <Text style={styles.status}>{status}</Text>

      {/* WEIGHT OUTPUT */}
      <Text style={styles.label}>Weight</Text>
      <TextInput
        value={weight}
        editable={false}
        placeholder="--"
        style={styles.input}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginVertical: 20,
  },
  status: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
