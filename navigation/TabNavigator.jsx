import { useDispatch } from "react-redux";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { authSignOutUser } from "../redux/auth/authOperations";

import PostsScreen from "../screens/nestedScreens/PostsScreen";
import CreatePostScreen from "../screens/mainScreen/CreatePostScreen";
import ProfileScreen from "../screens/mainScreen/ProfileScreen";

//icons import
import { Feather, AntDesign } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
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
        name="Posts"
        component={PostsScreen}
        options={() => ({
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
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

      <MainTab.Screen
        name="Create Post"
        component={CreatePostScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.createBtn}>
              <Feather name="plus" size={20} color="#FFFFFF" />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Posts")}
              activeOpacity={0.7}
              style={{ marginHorizontal: 16 }}
            >
              <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
            </TouchableOpacity>
          ),
          tabBarStyle: {
            display: "none",
          },
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
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

export default TabNavigator;
