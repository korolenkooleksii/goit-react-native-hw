import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
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
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View style={styles.photoUser}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    marginTop: 32,
    marginHorizontal: 16,
  },
  photoUser: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "transparent",
  },
});

export default PostsScreen;
