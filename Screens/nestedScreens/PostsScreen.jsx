import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 350, height: 200 }}
              source={{ uri: item.photo }}
            />
          </View>;
        }}
      ></FlatList>
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
    // alignItems: "center",
    gap: 10,
  },
});

export default PostsScreen;
