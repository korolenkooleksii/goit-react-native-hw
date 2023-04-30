import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";

const CreatePostsScreen = () => {
  const [name, setName] = useState("");
  const [geo, setGeo] = useState("");

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

  return (
    <View style={{ ...styles.container, width: dimensions }}>
      {/* <Camera style={styles.camera}></Camera> */}
      <View style={styles.fotoArea}>
        <View style={styles.placeFoto}></View>
        <Text style={{ ...styles.text }}>Загрузите фото</Text>
      </View>

      <View style={styles.info}>
        <TextInput
          style={{ ...styles.text, ...styles.name }}
          placeholder="Название..."
          placeholderTextColor="#BDBDBD"
          value={name}
          onChangeText={(value) => setName(value)}
          // onFocus={() => }
          // onEndEditing={}
        />
        <TextInput
          style={{ ...styles.text, ...styles.name, ...styles.geo }}
          placeholder="Местность"
          placeholderTextColor="#BDBDBD"
          value={geo}
          onChangeText={(value) => setGeo(value)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 32,
    // backgroundColor: "#FFF",
    marginHorizontal: 16,
  },
  fotoArea: {
    height: 267,
    flex: 0,
    gap: 8,
  },
  placeFoto: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    // borderColor: "red",
    borderRadius: 8,
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
