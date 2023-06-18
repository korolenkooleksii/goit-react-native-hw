import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

// import icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

const CreatePostScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState(null);
  const [location, setLocation] = useState({
    latitude: 13.406,
    longitude: 123.3753,
  });
  const [terrain, setTerrain] = useState(null);

  const [pickPhoto, setPickPhoto] = useState(null);

  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { login, userId, avatar } = useAuth();

  console.log("avatar CreatePostScreen 🚀  => ", avatar);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      // console.log("🚀 =>   status", status);

      if (status !== "granted") {
        // console.log("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setLocation(coords);

      console.log("location is ready");
    })();
  }, []);

  useEffect(() => {
    const onChange = () => {
      const deviceWidth = Dimensions.get("window").width - 16 * 2;
      setDimensions(deviceWidth);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleFocus = () => {
    setIsShowKeyboard(true);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleEndEditing = () => {
    setIsShowKeyboard(false);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };

  const reset = () => {
    setPhoto(null);
    setComment(null);
    setTerrain(null);
    setPickPhoto(null);
  };

  const deletePhoto = () => {
    setPhoto(null);
    setPickPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo ? photo : pickPhoto);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `posts/${uniquePostId}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
      // Alert.alert('Uploaded a photo!');
    });

    const pathReference = ref(storage, `posts/${uniquePostId}`);

    const processedPhoto = await getDownloadURL(pathReference);

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        login,
        userId,
        photo,
        comment,
        terrain,
        location,
        date: new Date().toString(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Posts");
    reset();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickPhoto(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide}>
      <View style={styles.background}>
        <View style={{ ...styles.container, width: dimensions }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            // style={{ flex: 1 }}
          >
            <View
              style={{
                gap: 32,
                // justifyContent: "flex-start",
                // marginBottom: dimensions * 0.38,
                marginBottom: isShowKeyboard ? -90 : dimensions * 0.38,

                borderColor: "green",
                borderWidth: 1,
              }}
            >
              <View style={{ gap: 8 }}>
                <View
                  style={{
                    ...styles.cameraContainer,
                    height: dimensions * 0.7,
                  }}
                >
                  {pickPhoto ? (
                    <Image source={{ uri: pickPhoto }} style={styles.image} />
                  ) : (
                    <Camera style={styles.camera} ref={setCamera} type={type}>
                      {photo && (
                        <View style={styles.takePhotoContainer}>
                          <Image source={{ uri: photo }} style={styles.image} />
                        </View>
                      )}

                      <TouchableOpacity
                        onPress={takePhoto}
                        style={{
                          ...styles.snapContainer,
                          backgroundColor: photo
                            ? "rgba(255, 255, 255, 0.3)"
                            : "#FFFFFF",
                        }}
                      >
                        <Image
                          source={require("../../assets/images/camera.png")}
                          style={{
                            width: 24,
                            height: 24,
                            tintColor: photo ? "#FFFFFF" : "#BDBDBD",
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={toggleCameraType}
                        style={{
                          ...styles.flipBtn,
                          backgroundColor: photo
                            ? "rgba(255, 255, 255, 0.3)"
                            : "#FFFFFF",
                        }}
                      >
                        <Image
                          source={require("../../assets/images/flip.png")}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: photo ? "#FFFFFF" : "#BDBDBD",
                          }}
                        />
                      </TouchableOpacity>
                    </Camera>
                  )}
                </View>

                <View style={{ alignSelf: "flex-start" }}>
                  {!photo && !pickPhoto ? (
                    <Text
                      style={{ ...styles.input, color: "#BDBDBD" }}
                      onPress={pickImage}
                    >
                      {" "}
                      Завантажити фото
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={() => deletePhoto()}>
                      <Text style={{ ...styles.input, color: "#BDBDBD" }}>
                        Редагувати фото
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{ gap: 16 }}>
                <View style={styles.wrapInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Назва..."
                    placeholderTextColor="#BDBDBD"
                    value={comment}
                    onChangeText={(value) => setComment(value)}
                    onFocus={() => handleFocus()}
                    onEndEditing={handleEndEditing}
                  />
                </View>

                <View style={styles.wrapInput}>
                  <TextInput
                    style={{ ...styles.input, paddingLeft: 30 }}
                    placeholder="Місцевість..."
                    placeholderTextColor="#BDBDBD"
                    value={terrain}
                    onChangeText={(value) => setTerrain(value)}
                    onFocus={() => handleFocus()}
                    onEndEditing={handleEndEditing}
                  />
                </View>

                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={styles.mapPin}
                />
              </View>

              <TouchableOpacity
                style={{
                  ...styles.btn,
                  backgroundColor:
                    (photo || pickPhoto) && comment && terrain
                      ? "#FF6C00"
                      : "#F6F6F6",
                }}
                disabled={!photo && !comment}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Posts")}
              >
                <Text
                  style={{
                    ...styles.input,
                    color: photo && comment ? "#FFFFFF" : "#E8E8E8",
                  }}
                  onPress={sendPhoto}
                >
                  Опублікувати
                </Text>
              </TouchableOpacity>
            </View>

            {!isShowKeyboard && (
              <View style={styles.remove}>
                <AntDesign
                  name="delete"
                  size={24}
                  color="#BDBDBD"
                  onPress={reset}
                />
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopColor: "#BDBDBD",
    borderTopWidth: 1,
  },
  container: {
    flex: 1,
    marginTop: 32,
    // justifyContent: "space-between",
    // justifyContent: 'space-around',
    justifyContent: "flex-end",

    borderColor: "red",
    borderWidth: 1,
  },

  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  cameraContainer: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  flipBtn: {
    position: "absolute",
    bottom: 15,
    right: 15,
    borderRadius: 50,
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  snapContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  wrapInput: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  mapPin: {
    position: "absolute",
    left: 0,
    bottom: 32,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 100,
  },

  remove: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 70,
    height: 40,
    marginBottom: 22,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});

export default CreatePostScreen;
