import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const renderItem = ({
    item: {
      post: { photo, location, name },
    },
  }) => {
    return (
      <View style={{ marginBottom: 32, gap: 8 }}>
        <View
          style={{
            width: 342,
            height: 240,
            marginBottom: 8,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            source={{ uri: photo }}
          />
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 16,
            lineHeight: 19,
            color: "#212121",
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 50,
          }}
        >
          <View
            style={{ flexDirection: "row", gap: 6, alignItems: "flex-end" }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Comments")}
              activeOpacity={0.7}
            >
              <FontAwesome5 name="comment" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                lineHeight: 19,
                color: "#BDBDBD",
              }}
            >
              0
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", gap: 4, alignItems: "flex-end" }}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                lineHeight: 19,
                textDecorationLine: "underline",
                color: "#212121",
              }}
            >
              {location}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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
    gap: 32,
  },
});

export default PostsScreen;
