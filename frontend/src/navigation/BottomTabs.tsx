import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import GroupListScreen from "../screens/Groups/GroupListScreen";
import IngredientScreen from "../screens/Ingredients/IngredientScreen";
import ReportsScreen from "../screens/Reports/ReportsScreen";
import LeftoverScreen from "../screens/Leftover/LeftoverScreen";
import AnimalsScreen from "../screens/Animals/AnimalsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Groups" component={GroupListScreen} />
      <Tab.Screen name="Ingredients" component={IngredientScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Leftover" component={LeftoverScreen} />
      <Tab.Screen name="Animals" component={AnimalsScreen} />
    </Tab.Navigator>
  );
}
