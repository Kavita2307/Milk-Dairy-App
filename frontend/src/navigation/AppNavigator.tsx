// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import HerdInfoScreen from "../screens/Herd/HerdInfoScreen";
// import GroupListScreen from "../screens/Groups/GroupListScreen";
// import IngredientScreen from "../screens/Ingredients/IngredientScreen";
// import ReportsScreen from "../screens/Reports/ReportsScreen";
// import LeftoverScreen from "../screens/Leftover/LeftoverScreen";
// import DashboardScreen from "../screens/Dashboard/DashboardScreen";
// import BottomStacks from "../navigation/BottomTabs";
// import MilkingGroupsScreen from "../screens/Herd/MilkingGroupScreen";
// import NonMilkingGroupsScreen from "../screens/Herd/NonMilkingGroupScreen";
// import AnimalNumbersScreen from "../screens/Herd/AnimalNumbersScreen";
// import AnimalInfoScreen from "../screens/Herd/AnimalInfoScreen";
// import LoginScreen from "../screens/Auth/LoginScreen";
// import RegisterScreen from "../screens/Auth/RegisterScreen";
// import AppHeader from "./AppHeader";

// const Stack = createNativeStackNavigator();
// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       {/* <BottomStacks /> */}
//       <Stack.Navigator
//         screenOptions={{
//           header: () => <AppHeader />, // 👈 GLOBAL HEADER HERE
//         }}
//       >
//         {/* <Stack.Navigator screenOptions={{ headerShown: false }}> */}
//         {/* Main Stacks */}
//         <Stack.Screen name="MainStacks" component={BottomStacks} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />

//         {/* Dashboard Menu Pages */}
//         <Stack.Screen name="Herd Info" component={HerdInfoScreen} />
//         <Stack.Screen name="MilkingGroups" component={MilkingGroupsScreen} />
//         <Stack.Screen
//           name="NonMilkingGroups"
//           component={NonMilkingGroupsScreen}
//         />
//         <Stack.Screen name="AnimalNumbers" component={AnimalNumbersScreen} />
//         <Stack.Screen name="AnimalInfo" component={AnimalInfoScreen} />

//         <Stack.Screen name="Dashboard" component={DashboardScreen} />
//         <Stack.Screen name="Groups" component={GroupListScreen} />
//         <Stack.Screen name="Ingredients" component={IngredientScreen} />
//         <Stack.Screen name="Reports" component={ReportsScreen} />
//         <Stack.Screen name="Leftover" component={LeftoverScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppHeader from "./AppHeader";
import BottomStacks from "./BottomTabs";

import HerdInfoScreen from "../screens/HerdInfo/HerdInfoScreen";
import MilkingHerdScreen from "../screens/HerdInfo/MilkingHerd";
import NonMilkingHerdScreen from "../screens/HerdInfo/NonMilkingHerd";
import AnimalNumbersScreen from "../screens/HerdInfo/AnimalNumbersScreen";
import AnimalInfoScreen from "../screens/HerdInfo/AnimalInfoScreen";
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

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <AppHeader />, // global header ONLY for logged-in screens
      }}
    >
      <Stack.Screen name="MainStacks" component={BottomStacks} />

      {/* Dashboard Menu Pages */}
      <Stack.Screen name="Herd Info" component={HerdInfoScreen} />
      <Stack.Screen name="MilkingHerd" component={MilkingHerdScreen} />
      <Stack.Screen name="NonMilkingHerd" component={NonMilkingHerdScreen} />
      <Stack.Screen name="AnimalNumbers" component={AnimalNumbersScreen} />
      <Stack.Screen name="AnimalInfo" component={AnimalInfoScreen} />

      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="MilkingGroups" component={MilkingGroupScreen} />
      <Stack.Screen name="MilkGroupInfo" component={MilkGroupInfoScreen} />
      <Stack.Screen name="ProductionShift" component={ProductionShiftScreen} />
      <Stack.Screen
        name="Non-MilkingGroups"
        component={NonMilkingGroupScreen}
      />
      <Stack.Screen
        name="Non-MilkGroupInfo"
        component={NonMilkGroupInfoScreen}
      />
      <Stack.Screen name="Ingredients" component={IngredientScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Leftover" component={LeftoverScreen} />
      <Stack.Screen name="Ration" component={RationScreen} />
      <Stack.Screen name="MilkProduction" component={MilkProductionScreen} />
    </Stack.Navigator>
  );
}
