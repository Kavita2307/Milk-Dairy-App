import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomShiftTabBar from "../../components/CustomShiftTabBar";
import MilkProduction from "../MilkProduction/MilkProductionScreen";

export default function MilkingGroupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId, groupId, animalNumber } = route.params;
  const Tab = createMaterialTopTabNavigator();
  useEffect(() => {
    nav.setOptions({
      title: "Milk Production",
    });
  }, []);
  return (
    <Tab.Navigator tabBar={(props) => <CustomShiftTabBar {...props} />}>
      <Tab.Screen
        name="Shift 1 (Morning)"
        component={MilkProduction}
        initialParams={{ groupId, userId, shift: "morning", animalNumber }}
      />
      <Tab.Screen
        name="Shift 2 (Afternoon)"
        component={MilkProduction}
        initialParams={{ groupId, userId, shift: "afternoon", animalNumber }}
      />
      <Tab.Screen
        name="Shift 3 (Evening)"
        component={MilkProduction}
        initialParams={{ groupId, userId, shift: "evening", animalNumber }}
      />
    </Tab.Navigator>
  );
}
