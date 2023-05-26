import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/mainScreen/Home";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import CreatePostScreen from "./screens/mainScreen/CreatePostScreen";

import { View, StyleSheet, TouchableOpacity } from "react-native";
//icons import
import { Feather, AntDesign } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();



const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Register">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
        },
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
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />

      <MainTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.createBtn}>
              <Feather name="plus" size={20} color="#FFFFFF" />
            </View>
          ),
          tabBarStyle: {
            display: "none",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home", { screen: "Post" })}
              activeOpacity={0.7}
              style={{ marginHorizontal: 16 }}
            >
              <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        })}
        name="Create Post"
        component={CreatePostScreen}
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

const styles = StyleSheet.create({
  createBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
});

export default useRoute;
