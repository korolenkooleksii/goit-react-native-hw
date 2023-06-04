import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import MapScreen from "../screens/nestedScreens/MapScreen";
import CommentsScreen from "../screens/nestedScreens/CommentsScreen";

//icons import
import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

const StackNavigator = () => {

  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerStyle: {
          height: 88,
        },
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.408,
          color: "#212121",
        },
        headerTitleAlign: "center",
      }}
    >
      <NestedScreen.Screen
        name="Home"
        component={TabNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
          headerShown: false,
        }}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

export default StackNavigator;
