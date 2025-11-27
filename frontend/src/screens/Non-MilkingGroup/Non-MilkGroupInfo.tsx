import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ration from "../../screens/Ration/RationScreen";
import Leftover from "../../screens/Leftover/LeftoverScreen";
import CustomTabBar from "@/src/components/CustomTabBar";

export default function MilkGroupInfoScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { userId, groupTitle, groupId } = route.params;
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    nav.setOptions({
      title: groupTitle,
    });
  }, [groupTitle]);

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Ration"
        component={Ration}
        initialParams={{ groupId, userId }}
      />
      <Tab.Screen
        name="Leftover"
        component={Leftover}
        initialParams={{ groupId, userId }}
      />
    </Tab.Navigator>
  );
}
