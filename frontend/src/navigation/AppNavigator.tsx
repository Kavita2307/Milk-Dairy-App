import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppHeader from "./AppHeader";
import BottomStacks from "./BottomTabs";

import HerdInfoScreen from "../screens/HerdInfo/HerdInfoScreen";
import MilkingHerdScreen from "../screens/HerdInfo/MilkingHerd";
import NonMilkingHerdScreen from "../screens/HerdInfo/NonMilkingHerd";
import AnimalNumbersScreen from "../screens/HerdInfo/AnimalNumbersScreen";
import MilkAnimalInfoScreen from "../screens/HerdInfo/MilkAnimalInfoScreen";
import NonMilkAnimalInfoScreen from "../screens/HerdInfo/NonMilkAnimalInfoScreen";
import IngredientScreen from "../screens/Ingredients/IngredientScreen";
import ReportsScreen from "../screens/Reports/ReportsScreen";
import LeftoverScreen from "../screens/Leftover/LeftoverScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import RationScreen from "../screens/Ration/RationScreen";
import MilkGroupInfoScreen from "../screens/MilkingGroup/MilkGroupInfo";
import MilkProductionScreen from "../screens/MilkProduction/MilkProductionScreen";
import MilkingGroupScreen from "../screens/MilkingGroup/MilkingGroup";
import ProductionShiftScreen from "../screens/MilkProduction/ProductionShift";
import NonMilkingGroupScreen from "../screens/Non-MilkingGroup/Non-MilkingGroup";
import NonMilkGroupInfoScreen from "../screens/Non-MilkingGroup/Non-MilkGroupInfo";
import RecordConsumption from "../screens/Ingredients/RecordConsumption";
import IngredientCreate from "../screens/Ingredients/IngredientCreate";
import IngredientDetail from "../screens/Ingredients/IngredientDetail";
import AddStock from "../screens/Ingredients/AddStock";
import ProfileScreen from "./ProfileScreen";

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
      <Stack.Screen name="Ingredients" component={IngredientScreen} />
      <Stack.Screen name="RecordConsumption" component={RecordConsumption} />
      <Stack.Screen name="IngredientCreate" component={IngredientCreate} />
      <Stack.Screen name="IngredientDetail" component={IngredientDetail} />
      <Stack.Screen name="AddStock" component={AddStock} />

      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Leftover" component={LeftoverScreen} />
      <Stack.Screen name="Ration" component={RationScreen} />
      <Stack.Screen name="MilkProduction" component={MilkProductionScreen} />
    </Stack.Navigator>
  );
}
