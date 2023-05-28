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
import { useAuth } from "../../hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const { email, login } = useAuth();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach((doc) => {

      if (doc.id) {
        setPosts((prevState) => [
          ...prevState,
          {
            photo: doc.data().photo,
            location: doc.data().location,
            comment: doc.data().comment,
            id: doc.id,
          },
        ]);
      }
    });
  };


  const renderItem = ({ item: { photo, location, comment } }) => {
    // console.log("photo - ", photo);
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
            // src={ photo }
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
        <View style={styles.photoUser}></View>
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
      <Button
        title="go to Map Screen"
        onPress={() => navigation.navigate("Map")}
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
    borderColor: "red",
  },
});

export default PostsScreen;
