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
import MilkingAnimalnumber from "../MilkProduction/MilkingAnimalNumber";

export default function MilkingGroupScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId, groupId, animalNumber, groupTitle } = route.params;
  const Tab = createMaterialTopTabNavigator();
  useEffect(() => {
    nav.setOptions({
      title: groupTitle,
    });
  }, [groupTitle]);
  return (
    <Tab.Navigator tabBar={(props) => <CustomShiftTabBar {...props} />}>
      <Tab.Screen
        name="Shift 1 (Morning)"
        component={MilkingAnimalnumber}
        initialParams={{ groupId, userId, shift: "Morning", animalNumber }}
      />
      <Tab.Screen
        name="Shift 2 (Afternoon)"
        component={MilkingAnimalnumber}
        initialParams={{ groupId, userId, shift: "Afternoon", animalNumber }}
      />
      <Tab.Screen
        name="Shift 3 (Evening)"
        component={MilkingAnimalnumber}
        initialParams={{ groupId, userId, shift: "Evening", animalNumber }}
      />
    </Tab.Navigator>
  );
}
