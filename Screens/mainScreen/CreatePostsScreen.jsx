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
} from "react-native";
import { Camera, CameraType } from "expo-camera";

const initialState = {
  photo: null,
  name: "",
  geo: "",
};

const CreatePostsScreen = () => {
  const [post, setPost] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

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

    console.log("takePhoto  photo:", photo.uri);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <View style={styles.fotoArea}>
          <Camera style={styles.camera} ref={setCamera}>
            {post.photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: post.photo }}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            )}

            <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
              <Image
                source={require("../../assets/images/camera.png")}
                style={styles.snap}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType} style={styles.flipBtn}>
              <Image
                source={require("../../assets/images/flip.png")}
                // style={styles.flipImage}
                style={{ width: 15, height: 15 }}
              />
              {/* <Text style={{ color: "#fff" }}>Flip</Text> */}
            </TouchableOpacity>
          </Camera>
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
            placeholder="Местность"
            placeholderTextColor="#BDBDBD"
            value={post.geo}
            onChangeText={(value) => handleGeo(value)}
            // onFocus={() => }
            // onEndEditing={()=>}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          // activeOpacity={0.7}
          // onPress={onLogin}
        >
          <Text style={{ ...styles.text }}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    height: 267,
    flex: 0,
    gap: 8,
  },
  camera: {
    height: 240,
    backgroundColor: "#F6F6F6",

    borderWidth: 1,
    // borderColor: "#E8E8E8",
    borderColor: "red",
    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",
  },
  flipBtn: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 30,
    height: 30,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,
  },
  snapContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  snap: {
    width: 24,
    height: 24,
    // color: "#BDBDBD",
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
  btn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  textBtn: {},
});

export default CreatePostsScreen;
