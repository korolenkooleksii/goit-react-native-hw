import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

//icons import
import { Feather } from "@expo/vector-icons";


const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Публикации"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={16} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Создание публикации"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;


