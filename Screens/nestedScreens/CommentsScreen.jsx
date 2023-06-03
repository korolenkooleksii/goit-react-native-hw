import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const CommentsScreen = () => {
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
            // overflow: "hidden",
            // borderRadius: 8,

            borderWidth: 1,
            borderColor: "green",
          }}
        >
          <Image
            // source={{ uri: pickPhoto }}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={styles.comment}></View>
        <View style={styles.reply}></View>
        <Text>Comments Screen</Text>
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

    alignItems: "center",
    // backgroundColor: "#FFFFFF",
  },
  photoPost: {
    overflow: "hidden",
    borderRadius: 8,
  },

  comment: {},
  reply: {},
});

export default CommentsScreen;
