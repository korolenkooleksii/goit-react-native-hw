import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const PostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Posts Screen</Text>
      <Button
        title="go to Map Screen"
        onPress={() => navigation.navigate("Map")}
      />
      <Button
        title="go to Comments Screen"
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

export default PostsScreen;
