import React, { useEffect, useState } from "react";
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
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
// import icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

const CreatePostScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState(null);
  const [location, setLocation] = useState(null);
  const [terrain, setTerrain] = useState(null);

  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { login, userId } = useAuth();

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setLocation(coords);
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
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View style={styles.container}>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'height'}
          > */}
          <View style={styles.photoArea}>
            <View style={styles.cameraContainer}>
              <Camera style={styles.camera} ref={setCamera} type={type}>
                {photo && (
                  <View style={styles.takePhotoContainer}>
                    <Image
                      source={{ uri: photo }}
                      style={{
                        width: dimensions,
                        height: 240,
                        resizeMode: "cover",
                      }}
                    />
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
            </View>

            {photo ? (
              <TouchableOpacity onPress={() => setPhoto(null)}>
                <Text style={{ ...styles.text }}>Редагувати фото</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ ...styles.text }}> Завантажити фото</Text>
            )}
          </View>

          <View style={styles.info}>
            <TextInput
              style={{ ...styles.text, ...styles.name }}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              value={comment}
              onChangeText={(value) => setComment(value)}
            />
            <TextInput
              style={{ ...styles.text, ...styles.name, ...styles.geo }}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              value={terrain}
              onChangeText={(value) => setTerrain(value)}
            />
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
              backgroundColor: photo && comment ? "#FF6C00" : "#F6F6F6",
            }}
            disabled={!photo && !comment}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Posts")}
          >
            <Text
              style={{
                ...styles.text,
                color: photo && comment ? "#FFFFFF" : "#E8E8E8",
              }}
              onPress={sendPhoto}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View style={styles.remove}>
              <AntDesign
                name="delete"
                size={24}
                color="#BDBDBD"
                onPress={reset}
              />
            </View>
          </View>

          {/* </KeyboardAvoidingView> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    marginTop: 32,
    marginHorizontal: 16,
  },
  photoArea: {
    flex: 0,
    gap: 8,
  },
  cameraContainer: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    resizeMode: "cover",
    height: 240,
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
    // borderColor: "#fff",
    // borderWidth: 1,
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
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  action: {},
  info: {
    flex: 0,
    gap: 16,
  },
  name: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    color: "#212121",
  },
  geo: {
    paddingLeft: 30,
  },
  mapPin: {
    position: "absolute",
    left: 0,
    bottom: 32,
  },
  btn: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  textBtn: {},
  remove: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    marginBottom: 30,
  },
});

export default CreatePostScreen;
