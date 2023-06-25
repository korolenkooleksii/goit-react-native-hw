import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperations";

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
} from "react-native";
import { Add } from "../../components/Add/Add";
import { Remove } from "../../components/Remove/Remove";
import * as ImagePicker from "expo-image-picker";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const defaultPhoto = "https://fakeimg.pl/100x100?text=avatar&font=bebas";

const initialState = {
  login: "",
  mail: "",
  password: "",
  avatar: "",
};

import { addAvatar, getAvatar, removeAvatar } from "../../utils/updateAvatar";

import { useAuth } from "../../hooks/useAuth";

const ProfileScreen = () => {
  const { userId, login } = useAuth();

  const [userAvatar, setUserAvatar] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [selectAvatar, setSelectAvatar] = useState(null);

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

    if (userAvatar?.avatar) {
      setIsImage(true);
    }
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

    setIsImage(true);
  };

  const pickImage = async () => {
    if (isImage) {
      removeAvatar(userAvatar.id);
      setIsImage(false);
      setUserAvatar(null);
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
            {isImage ? (
              <Remove style={styles.removePhotoBtn} />
            ) : (
              <Add style={styles.addPhotoBtn} />
            )}
          </TouchableOpacity>

          <View
            style={{
              width: dimensions,
              flex: 1,
              borderWidth: 1,
              borderColor: "blue",
            }}
          >
            <View style={styles.wrapperContent}>
              <Text style={styles.title}>{login}</Text>
              <View style={styles.listPosts}>
                <Text>AAAAAAAAAA</Text>
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
  listPosts: {},
});

export default ProfileScreen;
