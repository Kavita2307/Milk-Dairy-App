import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../api/api";
import { readLoadCell } from "../../api/loadCell";
import { SCREEN_NETWORK_MAP } from "@/src/network/ScreenNetworkMap";
import { resolveNetwork } from "@/src/network/NetworkManager";

const SCREEN_NAME = "PrepareTmrScreen";

export default function PrepareTmrScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();

  // ------------------------
  // PARAMS
  // ------------------------
  const { rationGroupId, userId, groupId } = route.params;

  // ------------------------
  // STATE
  // ------------------------
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ------------------------
  // CURRENT INGREDIENT
  // ------------------------
  const currentIngredient = ingredients[currentIndex];
  const plannedQty = currentIngredient?.totalQty || 0;
  const remainingQty = Math.max(plannedQty - currentWeight, 0);
  const accuracy = plannedQty > 0 ? (currentWeight / plannedQty) * 100 : 0;

  // ------------------------
  // LOAD INGREDIENTS
  // ------------------------
  useEffect(() => {
    nav.setOptions({ title: "Prepare TMR" });
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const res = await API.get(`/ration/group/${rationGroupId}/ingredients`);
      setIngredients(res.data);
    } catch {
      Alert.alert("Error", "Failed to load ingredients");
    }
  };

  // ------------------------
  // LOAD CELL POLLING
  // ------------------------
  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [currentIndex]);

  const startPolling = () => {
    stopPolling();

    intervalRef.current = setInterval(async () => {
      try {
        const data = await readLoadCell();
        setCurrentWeight(Number(data.weight.toFixed(2)));
      } catch {
        // silent fail
      }
    }, 500);
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // ------------------------
  // SAVE CURRENT INGREDIENT
  // ------------------------
  const saveAndNext = async () => {
    try {
      setLoading(true);

      await API.post("/ration/mix-log", {
        rationIngredientId: currentIngredient.id,
        plannedQty,
        actualQty: currentWeight,
        userId,
        groupId,
      });

      setCurrentWeight(0);

      if (currentIndex < ingredients.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // LAST INGREDIENT → FEED TMR
        await API.post(`/ration/group/${rationGroupId}/feed`);
        Alert.alert("Success", "TMR fed successfully");
        nav.navigate("MixAccuracyScreen", { rationGroupId });
      }
    } catch {
      Alert.alert("Error", "Failed to save mix data");
    } finally {
      setLoading(false);
    }
  };

  if (!currentIngredient) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ------------------------
  // UI
  // ------------------------
  return (
    <View style={styles.container}>
      {/* INGREDIENT */}
      <View style={styles.card}>
        <Text style={styles.title}>
          Ingredient {currentIndex + 1} / {ingredients.length}
        </Text>

        <Text style={styles.ingName}>{currentIngredient.ingredient.name}</Text>
      </View>

      {/* WEIGHT INFO */}
      <View style={styles.card}>
        <Text style={styles.label}>Planned Quantity</Text>
        <Text style={styles.value}>{plannedQty.toFixed(2)} kg</Text>

        <Text style={styles.label}>Added Quantity</Text>
        <Text style={styles.value}>{currentWeight.toFixed(2)} kg</Text>

        <Text style={styles.label}>Remaining</Text>
        <Text style={styles.value}>{remainingQty.toFixed(2)} kg</Text>

        <Text style={styles.accuracy}>Accuracy: {accuracy.toFixed(1)}%</Text>
      </View>

      {/* ACTION */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={saveAndNext}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextText}>
            {currentIndex < ingredients.length - 1
              ? "Next Ingredient"
              : "Feed TMR"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ------------------------
// STYLES
// ------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },
  ingName: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6,
    color: "#111827",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
  },
  accuracy: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: "800",
    color: "#2563EB",
  },
  nextBtn: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
