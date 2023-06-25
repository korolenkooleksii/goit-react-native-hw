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
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";

import { getPostsCollection } from "../../utils/getPostsCollection";
import { addLike, removeLike } from "../../utils/updateLike";

const defaultPhoto = "https://fakeimg.pl/100x100?text=avatar&font=bebas";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { email, login, avatar, userId } = useAuth();

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

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    getPostsCollection(setPosts);
  };

  const handleAddLike = (postId) => {
    console.log('ADD LIKE');
    addLike(postId, userId);
  };

  const handleRemoveLike = (postId) => {
    removeLike(postId, userId);
  };

  const renderItem = ({
    item: {
      photo,
      location,
      comment,
      terrain,
      id,
      owner,
      commentsCounter,
      likes,
    },
  }) => {
    return (
      <View style={styles.list}>
        <View style={{ ...styles.item, height: dimensions * 0.7 }}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>
        <Text style={styles.comment}>{comment}</Text>
        <View style={styles.content}>
          <View style={styles.wrapContent}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Comments", {
                  postId: id,
                  photoPost: photo,
                  owner,
                  commentsCounter,
                })
              }
              activeOpacity={0.7}
            >
              {commentsCounter > 0 ? (
                <FontAwesome name="comment" size={24} color="#FF6C00" />
              ) : (
                <FontAwesome5 name="comment" size={24} color="#BDBDBD" />
              )}
            </TouchableOpacity>
            <Text
              style={{
                ...styles.counter,
                color: commentsCounter > 0 ? "#212121" : "#BDBDBD",
              }}
            >
              {commentsCounter}
            </Text>
          </View>

          <View style={styles.wrapContent}>
            {owner === userId && likes.length >= 0 && (
              <AntDesign name="like2" size={24} color="#BDBDBD" />
            )}

            {owner !== userId && likes.length === 0 && (
              <TouchableOpacity onPress={()=>handleAddLike(id)} activeOpacity={0.7}>
                <AntDesign name="like2" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            )}

            {likes.includes(userId) && owner !== userId && likes.length > 0 && (
              <TouchableOpacity
                onPress={()=>handleRemoveLike(id)}
                activeOpacity={0.7}
              >
                <AntDesign name="like1" size={24} color="#FF6C00" />
              </TouchableOpacity>
            )}

            {!(likes.includes(userId)) && owner !== userId && likes.length > 0 && (
              <TouchableOpacity
              onPress={()=>handleAddLike(id)}
                activeOpacity={0.7}
              >
                <AntDesign name="like2" size={24} color="#FF6C00" />
              </TouchableOpacity>
            )} 

            <Text
              style={{
                ...styles.counter,
                color: likes.length > 0 ? "#212121" : "#BDBDBD",
              }}
            >
              {likes.length}
            </Text>
          </View>

          <View style={styles.wrapContent}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Map", { location })}
              activeOpacity={0.7}
            >
              <Feather name="map-pin" size={24} color="#BDBDBD" />
            </TouchableOpacity>

            <Text style={styles.terrain}>{terrain}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      <View
        style={{
          width: dimensions,
          paddingBottom: 120,
        }}
      >
        <View style={styles.avatarWrap}>
          <View
            style={{
              ...styles.photoUser,
              width: dimensions * 0.18,
              height: dimensions * 0.18,
            }}
          >
            <Image
              source={{ uri: avatar ? avatar : defaultPhoto }}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.login}>{login}</Text>
            <Text style={styles.email}>{email}</Text>
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
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopColor: "#BDBDBD",
    borderBottomColor: "#BDBDBD",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  avatarWrap: {
    paddingVertical: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  list: { marginBottom: 32, gap: 8 },
  item: {
    flex: 1,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
  },
  photoUser: {
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "transparent",
  },
  content: {
    flexDirection: "row",
    gap: 50,
  },
  wrapContent: {
    flexDirection: "row",
    gap: 6,
    alignItems: "flex-end",
  },
  comment: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  terrain: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
  counter: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default PostsScreen;
