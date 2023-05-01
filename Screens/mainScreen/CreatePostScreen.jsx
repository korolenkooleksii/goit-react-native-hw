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
} from "react-native";
import { Camera, CameraType } from "expo-camera";
// import icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  photo: null,
  name: "",
  geo: "",
};

const CreatePostScreen = ({ navigation }) => {
  const [post, setPost] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

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

  const handlePhoto = (val) =>
    setPost((prevState) => ({ ...prevState, photo: val }));
  const handleName = (val) =>
    setPost((prevState) => ({ ...prevState, name: val }));
  const handleGeo = (val) =>
    setPost((prevState) => ({ ...prevState, geo: val }));

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    handlePhoto(photo.uri);

    // console.log("takePhoto  photo:", photo.uri);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <View style={styles.container}>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'height'}
          > */}
            <View style={styles.fotoArea}>
              <View style={styles.cameraContainer}>
                <Camera style={styles.camera} ref={setCamera} type={type}>
                  {post.photo && (
                    <View style={styles.takePhotoContainer}>
                      <Image
                        source={{ uri: post.photo }}
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
                    style={styles.snapContainer}
                  >
                    <Image
                      source={require("../../assets/images/camera.png")}
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={toggleCameraType}
                    style={styles.flipBtn}
                  >
                    <Image
                      source={require("../../assets/images/flip.png")}
                      style={{ width: 15, height: 15 }}
                    />
                  </TouchableOpacity>
                </Camera>
              </View>

              <Text style={{ ...styles.text }}>Загрузите фото</Text>
            </View>

            <View style={styles.info}>
              <TextInput
                style={{ ...styles.text, ...styles.name }}
                placeholder="Название..."
                placeholderTextColor="#BDBDBD"
                value={post.name}
                onChangeText={(value) => handleName(value)}
                // onFocus={() => }
                // onEndEditing={}
              />
              <TextInput
                style={{ ...styles.text, ...styles.name, ...styles.geo }}
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
                value={post.geo}
                onChangeText={(value) => handleGeo(value)}
                // onFocus={() => }
                // onEndEditing={()=>}
              />
              <Feather
                name="map-pin"
                size={24}
                color="#BDBDBD"
                style={styles.mapPin}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              // activeOpacity={0.7}
              onPress={() => navigation.navigate("Posts")}
            >
              <Text style={{ ...styles.text }}>Опубликовать</Text>
            </TouchableOpacity>
            <View style={styles.remove}>
              <AntDesign name="delete" size={24} color="#BDBDBD" />
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
  fotoArea: {
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
    backgroundColor: "#fff",
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
    backgroundColor: "#FFFFFF",
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
    // borderBottomColor: "#E8E8E8",
    borderBottomColor: "red",
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
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  textBtn: {},
  remove: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    // backgroundColor: "#F6F6F6",
    backgroundColor: "#e47373",
    marginTop: 120,
  },
});

export default CreatePostScreen;
