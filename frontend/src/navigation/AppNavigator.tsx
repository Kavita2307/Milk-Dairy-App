import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppHeader from "./AppHeader";
import BottomStacks from "./BottomTabs";

import HerdInfoScreen from "../screens/HerdInfo/HerdInfoScreen";
import MilkingHerdScreen from "../screens/HerdInfo/MilkAnimal/MilkingHerd";
import NonMilkingHerdScreen from "../screens/HerdInfo/NonMilkAnimal/NonMilkingHerd";
import AnimalNumbersScreen from "../screens/HerdInfo/AnimalNumbersScreen";
import MilkAnimalInfoScreen from "../screens/HerdInfo/MilkAnimal/MilkAnimalInfoScreen";
import NonMilkAnimalInfoScreen from "../screens/HerdInfo/NonMilkAnimal/NonMilkAnimalInfoScreen";
import Reports from "../screens/Reports/ReportsScreen";
import LeftoverScreen from "../screens/Leftover/LeftoverScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import RationScreen from "../screens/Ration/RationScreen";
import MilkGroupInfoScreen from "../screens/MilkingGroup/MilkGroupInfo";
import MilkProductionScreen from "../screens/MilkProduction/MilkProductionScreen";
import MilkingGroupScreen from "../screens/MilkingGroup/MilkingGroup";
import ProductionShiftScreen from "../screens/MilkProduction/ProductionShift";
import NonMilkingGroupScreen from "../screens/Non-MilkingGroup/Non-MilkingGroup";
import NonMilkGroupInfoScreen from "../screens/Non-MilkingGroup/Non-MilkGroupInfo";
import ProfileScreen from "./ProfileScreen";
import InventoryScreen from "../screens/Ingredients/InventoryScreen";
import AddIngredientScreen from "../screens/Ingredients/AddIngredientScreen";
import IngredientDetailScreen from "../screens/Ingredients/IngredientDetailScreen";
import UpdateMilkAnimalInfo from "../screens/HerdInfo/MilkAnimal/UpdateMilkAnimalInfo";
import DailyFeedEfficiency from "../screens/Reports/DailyFeedEfficiency ";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: ({ options }) => <AppHeader title={options.title || ""} />,
      })}
    >
      {/* <Stack.Screen
        name="MainStacks"
        component={BottomStacks}
        options={{ title: "Dashboard" }}
      /> */}
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile Details" }}
      />

      {/* Dashboard Menu Pages */}
      <Stack.Screen
        name="Herd Information"
        component={HerdInfoScreen}
        options={{ title: "Herd Information" }}
      />
      <Stack.Screen
        name="MilkingHerd"
        component={MilkingHerdScreen}
        options={{ title: "Milking Group" }}
      />
      <Stack.Screen
        name="NonMilkingHerd"
        component={NonMilkingHerdScreen}
        options={{ title: "Non-Milking Group" }}
      />
      <Stack.Screen name="AnimalNumbers" component={AnimalNumbersScreen} />
      <Stack.Screen name="MilkAnimalInfo" component={MilkAnimalInfoScreen} />
      <Stack.Screen
        name="NonMilkAnimalInfo"
        component={NonMilkAnimalInfoScreen}
      />

      <Stack.Screen
        name="MilkingGroups"
        component={MilkingGroupScreen}
        options={{ title: "Milking Groups" }}
      />
      <Stack.Screen name="MilkGroupInfo" component={MilkGroupInfoScreen} />
      <Stack.Screen
        name="UpdateMilkAnimalInfo"
        component={UpdateMilkAnimalInfo}
      />
      <Stack.Screen
        name="UpdateNonMilkAnimalInfo"
        component={NonMilkAnimalInfoScreen}
      />
      <Stack.Screen name="ProductionShift" component={ProductionShiftScreen} />
      <Stack.Screen
        name="Non-MilkingGroups"
        component={NonMilkingGroupScreen}
        options={{ title: "Non-Milking Groups" }}
      />
      <Stack.Screen
        name="Non-MilkGroupInfo"
        component={NonMilkGroupInfoScreen}
      />

      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="AddIngredient" component={AddIngredientScreen} />
      <Stack.Screen
        name="IngredientDetail"
        component={IngredientDetailScreen}
        options={{ title: "Ingredients" }}
      />
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{ title: "Reports" }}
      />
      <Stack.Screen
        name="DailyFeedEfficiency"
        component={DailyFeedEfficiency}
        options={{ title: "Daily Feed Efficiency" }}
      />
      <Stack.Screen name="Leftover" component={LeftoverScreen} />
      <Stack.Screen name="Ration" component={RationScreen} />
      <Stack.Screen name="MilkProduction" component={MilkProductionScreen} />
    </Stack.Navigator>
  );
}
