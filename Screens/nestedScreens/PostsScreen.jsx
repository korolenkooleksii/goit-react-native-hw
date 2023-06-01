import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const defaultPhoto = "https://via.placeholder.com/130x130";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState(defaultPhoto);
  const { email, login } = useAuth();

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const deviceWidth = Dimensions.get("window").width - 16 * 2;
      setDimensions(deviceWidth);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "avatar"), (snapshot) => {
        if (snapshot?.docs[0]?.data()) {
          setAvatar(snapshot.docs[0].data().processedAvatar);
        }
      }),
    []
  );

  const renderItem = ({ item: { photo, location, comment, terrain } }) => {
    return (
      <View style={{ marginBottom: 32, gap: 8 }}>
        <View
          style={{
            flex: 1,
            height: 240,
            height: dimensions * 0.7,
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
          {comment}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Map", { location: location })}
              activeOpacity={0.7}
            >
              <Feather name="map-pin" size={24} color="#BDBDBD" />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                lineHeight: 19,
                textDecorationLine: "underline",
                color: "#212121",
              }}
            >
              {terrain}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ width: dimensions }}>
        <View
          style={{
            paddingTop: 32,
            paddingBottom: 32,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View
            style={{
              ...styles.photoUser,
              width: dimensions * 0.18,
              height: dimensions * 0.18,
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 13,
                lineHeight: 15,
              }}
            >
              {login}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 11,
                lineHeight: 13,
              }}
            >
              {email}
            </Text>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  photoUser: {
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "transparent",
  },
});

export default PostsScreen;
