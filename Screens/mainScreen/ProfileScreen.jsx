import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperations";

import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  Platform,
  Alert,
  FlatList,
} from "react-native";

import { Add } from "../../components/Add/Add";
import { Remove } from "../../components/Remove/Remove";
import * as ImagePicker from "expo-image-picker";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

import { addAvatar, getAvatar, removeAvatar } from "../../utils/updateAvatar";

import { useAuth } from "../../hooks/useAuth";
import { getPostsCurrentUser } from "../../utils/getPostsCurrentUser";

//icons import
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  AntDesign,
} from "@expo/vector-icons";

const defaultPhoto = "https://fakeimg.pl/100x100?text=avatar&font=bebas";

const ProfileScreen = ({ navigation }) => {
  const [userAvatar, setUserAvatar] = useState(null);
  const [selectAvatar, setSelectAvatar] = useState(null);
  const [posts, setPosts] = useState([]);

  const { userId, login } = useAuth();

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

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
    getAvatar(userId, setUserAvatar);
    getPostsCurrentUser(userId, setPosts);
  }, []);

  const uploadAvatarToServer = async () => {
    if (!selectAvatar) {
      console.log("НЕТ ФОТО");
      return;
    }
    const response = await fetch(selectAvatar);

    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `${uniquePostId}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
      // Alert.alert("Uploaded an avatar!");
    });

    const pathReference = ref(storage, `${uniquePostId}`);

    const processedAvatar = await getDownloadURL(pathReference);

    addAvatar({ userId, avatar: processedAvatar });
  };

  const pickImage = async () => {
    if (userAvatar) {
      removeAvatar(userAvatar.id);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectAvatar(result.assets[0].uri);
    }

    uploadAvatarToServer();
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
          <View style={styles.counterContent}>
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
              <View style={styles.wrapContent}>
                {commentsCounter > 0 ? (
                  <FontAwesome name="comment" size={24} color="#FF6C00" />
                ) : (
                  <FontAwesome5 name="comment" size={24} color="#BDBDBD" />
                )}
                <Text
                  style={{
                    ...styles.counter,
                    color: commentsCounter > 0 ? "#212121" : "#BDBDBD",
                  }}
                >
                  {commentsCounter}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.wrapContent}>
              {likes.length > 0 ? (
                <AntDesign name="like2" size={24} color="#FF6C00" />
              ) : (
                <AntDesign name="like2" size={24} color="#BDBDBD" />
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
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Map", { location })}
            activeOpacity={0.7}
          >
            <View style={styles.wrapContent}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <Text style={styles.terrain}>{terrain}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/photo_bg.jpg")}
      >
        <View style={styles.background}>
          <TouchableOpacity
            style={styles.addPhoto}
            activeOpacity={0.9}
            onPress={pickImage}
          >
            <View
              style={{
                overflow: "hidden",
                borderRadius: 16,
                backgroundColor: "#F6F6F6",
              }}
            >
              <Image
                source={{
                  uri: userAvatar?.avatar ? userAvatar.avatar : defaultPhoto,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            {userAvatar?.avatar ? (
              <Remove style={styles.removePhotoBtn} />
            ) : (
              <Add style={styles.addPhotoBtn} />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={signOut} style={styles.btnSignOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>

          <View
            style={{
              width: dimensions,
              flex: 1,
              // borderWidth: 1,
              // borderColor: "blue",
            }}
          >
            <View style={styles.wrapperContent}>
              <Text style={styles.title}>{login}</Text>
              <View style={styles.listPosts}>
                <FlatList
                  data={posts}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  background: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    height: 580,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  addPhoto: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    width: 120,
    height: 120,
    zIndex: 10,
  },
  addPhotoBtn: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
    fill: "#FF6C00",
  },
  removePhotoBtn: {
    position: "absolute",
    bottom: -76,
    left: 102,
    width: 25,
    height: 25,
  },
  btnSignOut: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 32,
    marginRight: 16,
    zIndex: 10,
  },
  wrapperContent: {
    marginTop: 92,
    gap: 32,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  listPosts: {
    marginBottom: 130,
    borderWidth: 1,
    borderColor: "blue",
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
    justifyContent: "space-between",
    flexDirection: "row",
  },
  counterContent: {
    flexDirection: "row",
    gap: 24,
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

export default ProfileScreen;
