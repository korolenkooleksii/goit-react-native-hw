import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../nestedScreens/PostsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

const Home = () => {
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
        name="Posts"
        component={PostsScreen}

      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

export default Home;
