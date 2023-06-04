import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { async } from "@firebase/util";
import { useAuth } from "../../hooks/useAuth";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;

  const [comment, setComment] = useState(null);
  const {login} =  useAuth()

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

  const createComment = async () => {};

  return (
    <View style={styles.background}>
      <View
        style={{
          ...styles.container,
          width: dimensions,

          borderWidth: 1,
          borderColor: "red",
        }}
      >
        <View
          style={{
            ...styles.photoPost,
            width: dimensions,
            height: dimensions * 0.7,

            borderWidth: 1,
            borderColor: "green",
          }}
        >
          <Image
            // source={{ uri: pickPhoto }}
            style={styles.image}
          />
        </View>

        <View
          style={{
            position: "relative",
            flex: 1,
            justifyContent: "flex-end",

            borderWidth: 1,
            borderColor: "blue",
          }}
        >
          <TextInput
            style={styles.comment}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={(value) => setComment(value)}
          />
          <View style={styles.send}>
            <AntDesign
              name="arrowup"
              size={18}
              color="#ffffff"
              onPress={() => console.log(comment)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  photoPost: {
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  comment: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  send: {
    position: "absolute",
    right: 8,
    bottom: 30,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});

export default CommentsScreen;
