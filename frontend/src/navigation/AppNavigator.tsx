import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HerdInfoScreen from "../screens/Herd/HerdInfoScreen";
import GroupListScreen from "../screens/Groups/GroupListScreen";
import IngredientScreen from "../screens/Ingredients/IngredientScreen";
import ReportsScreen from "../screens/Reports/ReportsScreen";
import LeftoverScreen from "../screens/Leftover/LeftoverScreen";
import AnimalsScreen from "../screens/Animals/AnimalsScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import BottomStacks from "../navigation/BottomTabs";
import MilkingGroupsScreen from "../screens/Herd/MilkingGroupScreen";
import NonMilkingGroupsScreen from "../screens/Herd/NonMilkingGroupScreen";
import AnimalNumbersScreen from "../screens/Herd/AnimalNumbersScreen";
import AnimalNumberInfoScreen from "../screens/Herd/AnimalNumberInfoScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* <BottomStacks /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Main Stacks */}
        <Stack.Screen name="MainStacks" component={BottomStacks} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Dashboard Menu Pages */}
        <Stack.Screen name="Herd Info" component={HerdInfoScreen} />
        <Stack.Screen name="MilkingGroups" component={MilkingGroupsScreen} />
        <Stack.Screen
          name="NonMilkingGroups"
          component={NonMilkingGroupsScreen}
        />
        <Stack.Screen name="AnimalNumbers" component={AnimalNumbersScreen} />
        <Stack.Screen
          name="AnimalNumberInfoScreen"
          component={AnimalNumberInfoScreen}
        />

        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Groups" component={GroupListScreen} />
        <Stack.Screen name="Ingredients" component={IngredientScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="Leftover" component={LeftoverScreen} />
        <Stack.Screen name="Animals" component={AnimalsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
