import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  NativeModules,
  PermissionsAndroid,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const { DualNetworking } = NativeModules;

// CONFIGURATION
const ESP_WIFI_SSID = "EDMILK";
const ESP_WIFI_PASS = "12345678";
const ESP_API_URL = "http://192.168.4.1/api/weight"; // Verified URL pattern
const LOGIN_URL = "https://edmilk.com/app/api/auth/login";
const LEFTOVER_URL = "https://edmilk.com/app/api/leftover";
const SERVER_URL = "https://edmilk.com/app/api/leftover"; // or correct endpoint

const TestScreen = () => {
  const [weight, setWeight] = useState("0.00");
  const [status, setStatus] = useState("Initializing...");
  const [wifiConnected, setWifiConnected] = useState(false);
  const [lastUploadTime, setLastUploadTime] = useState("");
  const [rawResponse, setRawResponse] = useState("");

  // User credentials
  const [mobile, setMobile] = useState("9876543210");
  const [password, setPassword] = useState("password123");
  const [groupId, setGroupId] = useState("1");
  const [userId, setUserId] = useState("4");

  // Save operation states
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // const pollingRef = useRef(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Start the auto-connect loop immediately
    const init = async () => {
      await requestPermissions();
      // Give a small delay for permissions to settle
      setTimeout(connectToEsp, 1000);
    };
    init();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs location permission to scan for WiFi networks.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const connectToEsp = async () => {
    // If not connected, keep trying
    setStatus("Searching for Scale (EDMILK)...");
    try {
      // Connect to the specific ESP32 network
      const result = await DualNetworking.connectToDeviceWifi(
        ESP_WIFI_SSID,
        ESP_WIFI_PASS
      );
      setStatus("Connected: " + result);
      setWifiConnected(true);
      startPolling();
    } catch (e: any) {
      console.log("Connection attempt failed:", e.message);
      setStatus("Retrying Connection... (" + e.message + ")");
      // Retry after 3 seconds
      setTimeout(connectToEsp, 3000);
    }
  };

  const startPolling = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(cycle, 500); // Fetch every 500ms for responsiveness
  };

  const cycle = async () => {
    try {
      const weightData = await DualNetworking.fetchWeight(ESP_API_URL);
      console.log("Using Weight Data:", weightData);
      setRawResponse(weightData); // Display raw data on screen for user to see

      // PARSING LOGIC:
      // Case 1: JSON -> {"weight": 12.5}
      // Case 2: Plain Text -> 12.5
      let displayWeight = weightData;

      if (typeof weightData === "string") {
        const cleanData = weightData.trim();
        if (cleanData.startsWith("{")) {
          try {
            const parsed = JSON.parse(cleanData);
            if (parsed.weight !== undefined) displayWeight = parsed.weight;
            else if (parsed.value !== undefined) displayWeight = parsed.value;
          } catch {
            // Failed to parse JSON, use raw
          }
        }
      }

      // Update UI
      setWeight(displayWeight);

      // Upload
      if (displayWeight && displayWeight !== "0.00") {
        uploadToServer(displayWeight);
      }
    } catch (err: any) {
      // If we get an error here, it might mean the connection raised an issue
      console.log("Fetch error:", err.message);
      setStatus("Read Error: " + err.message);
    }
  };

  const uploadToServer = async (weightValue: any) => {
    try {
      const payload = JSON.stringify({
        weight: weightValue,
        timestamp: new Date().toISOString(),
        deviceId: "ESP32_SCALE_01",
      });
      // Fire and forget upload
      DualNetworking.uploadData(SERVER_URL, payload)
        .then(() => setLastUploadTime(new Date().toLocaleTimeString()))
        .catch((e: any) => console.log("Upload Bg Error", e.message));
    } catch {
      // ignore
    }
  };

  // New function to save weight to server
  const saveWeightToServer = async () => {
    if (isSaving) return; // Prevent multiple clicks

    setIsSaving(true);
    setSaveStatus("");
    setShowSuccess(false);

    try {
      // Step 1: Login
      setSaveStatus("Logging in...");
      const loginResponse = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: mobile,
          password: password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed");
      }

      const loginData = await loginResponse.json();
      const token = loginData.token;
      const userName = loginData.user?.name || "User";

      console.log("✅ Logged in as:", userName);
      setSaveStatus(`Logged in as: ${userName}`);

      // Step 2: Send weight
      setSaveStatus("Sending weight...");
      const weightResponse = await fetch(LEFTOVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          groupId: parseInt(groupId),
          leftoverKg: parseFloat(weight),
          userId: parseInt(userId),
        }),
      });

      if (!weightResponse.ok) {
        throw new Error("Failed to save weight");
      }

      const weightData = await weightResponse.json();
      const savedWeight = weightData.entry?.leftoverKg || weight;

      console.log("✅ Saved", savedWeight, "kg!");
      setSaveStatus(`✅ Saved ${savedWeight} kg successfully!`);
      setShowSuccess(true);
      setLastUploadTime(new Date().toLocaleTimeString());

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setSaveStatus("");
      }, 3000);
    } catch (error: any) {
      console.error("❌ Error:", error.message);
      setSaveStatus(`❌ Error: ${error.message}`);
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Smart Scale</Text>
          <Text style={styles.subtitle}>
            {parseFloat(weight) > 0 ? "receiving data" : "waiting for data..."}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>CURRENT WEIGHT</Text>
          <Text style={styles.weightText}>
            {weight} <Text style={styles.unit}>kg</Text>
          </Text>
        </View>

        {/* User Credentials Section */}
        <View style={styles.credentialsCard}>
          <Text style={styles.sectionTitle}>Server Configuration</Text>

          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter mobile number"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor="#666"
            secureTextEntry
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.inputLabel}>Group ID</Text>
              <TextInput
                style={styles.input}
                value={groupId}
                onChangeText={setGroupId}
                placeholder="Group ID"
                placeholderTextColor="#666"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.inputLabel}>User ID</Text>
              <TextInput
                style={styles.input}
                value={userId}
                onChangeText={setUserId}
                placeholder="User ID"
                placeholderTextColor="#666"
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Save Weight Button */}
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={saveWeightToServer}
            disabled={isSaving || parseFloat(weight) <= 0}
          >
            {isSaving ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.saveButtonText}>
                {showSuccess ? "✓ SAVED" : "SAVE WEIGHT TO SERVER"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Status Message */}
          {saveStatus !== "" && (
            <View
              style={[
                styles.statusMessage,
                showSuccess ? styles.successMessage : styles.errorMessage,
              ]}
            >
              <Text style={styles.statusText}>{saveStatus}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Status: {status}</Text>
          <Text style={styles.infoText}>
            Last Upload: {lastUploadTime || "Waiting..."}
          </Text>
          {weight === "0.00" && (
            <Text
              style={[styles.infoText, { color: "#FF6B6B", marginTop: 10 }]}
            >
              Debug Info:{" "}
              {status.includes("Error") ? status : "Waiting for packet..."}
            </Text>
          )}

          {/* RAW DEBUGGING AREA */}
          <View
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: "#333",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#FFA500", fontWeight: "bold" }}>
              DEBUG RAW DATA:
            </Text>
            <Text style={{ color: "#FFF" }}>
              {rawResponse || "(No Data Yet)"}
            </Text>
            <Text style={{ color: "#AAA", fontSize: 10, marginTop: 5 }}>
              Target: {ESP_API_URL}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* No Buttons - Fully Automatic */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#00E676",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  label: {
    color: "#888",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 10,
  },
  weightText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  unit: {
    fontSize: 24,
    color: "#888",
  },
  credentialsCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  inputLabel: {
    color: "#AAA",
    fontSize: 12,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#2979FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#2979FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: "#555",
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  statusMessage: {
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  successMessage: {
    backgroundColor: "#1B5E20",
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  errorMessage: {
    backgroundColor: "#B71C1C",
    borderColor: "#F44336",
    borderWidth: 1,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 30,
    padding: 15,
    marginBottom: 30,
  },
  infoText: {
    color: "#AAAAAA",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#2979FF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto", // Push to bottom
  },
  stopButton: {
    backgroundColor: "#D32F2F",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default TestScreen;
