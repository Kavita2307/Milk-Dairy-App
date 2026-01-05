// import React from "react";
// import AppNavigator from "./src/navigation/AppNavigator";
// import { AuthProvider, useAuth } from "./src/context/AuthContext";
// import { ActivityIndicator, View } from "react-native";
// import AuthStack from "./src/navigation/AuthStack";
// import { NavigationContainer } from "@react-navigation/native";
// import { NetworkProvider } from "./src/network/NetworkContext";

// function Root() {
//   const { loading, user } = useAuth();

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }
//   console.log("app.tsx: userId ", user?.id);
//   //console.log(user);
//   return user ? <AppNavigator /> : <AuthStack />;
//   //return <AppNavigator />;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <NetworkProvider>
//         <NavigationContainer>
//           <Root />
//         </NavigationContainer>
//       </NetworkProvider>
//     </AuthProvider>
//   );
// }
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";
import AuthStack from "./src/navigation/AuthStack";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { NetworkProvider } from "./src/network/NetworkContext";

import { startNetworkListener } from "./src/network/NetworkListener";
import { retryQueue } from "./src/network/offlineQueue";
import api from "./src/api/api";

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

  return user ? <AppNavigator /> : <AuthStack />;
}

export default function App() {
  useEffect(() => {
    // ✅ Use centralized network listener
    const unsubscribe = startNetworkListener(() => retryQueue(api.send));

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <NetworkProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </NetworkProvider>
    </AuthProvider>
  );
}
