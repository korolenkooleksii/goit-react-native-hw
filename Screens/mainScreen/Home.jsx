import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../nestedScreens/PostsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

//icons import
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

const Home = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

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
        options={() => ({
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity
              onPress={signOut}
              style={{ marginHorizontal: 16 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        })}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

export default Home;
