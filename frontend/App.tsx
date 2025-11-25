import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

function Root() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log("app.tsx: userId ", user?.id);
  //console.log(user);
  return user ? <AppNavigator /> : <AuthStack />;
  // return <AppNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </AuthProvider>
  );
}
//import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { AuthProvider } from "./src/context/AuthContext";
// import AuthStack from "./src/navigation/AuthStack";

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <AuthStack />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }
