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
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";

import { currentDate } from "../../utils/currentDate";
import { currentTime } from "../../utils/currentTime";
import { updateCommentsCounter } from "../../utils/updateCommentsCounter";
import { addCommentInCollection } from "../../utils/addCommentInCollection";
import { getCommentsCollection } from "../../utils/getCommentsCollection";

import { getAvatar } from "../../utils/updateAvatar";

import { PADDING } from "../../constants/constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const defaultPhoto = "https://fakeimg.pl/100x100?text=avatar&font=bebas";

const CommentsScreen = ({ route }) => {
  const { postId, photoPost, owner, commentsCounter } = route.params;

  const [userAvatar, setUserAvatar] = useState(null);

  const [comment, setComment] = useState("");

  const [allComments, setAllComments] = useState([]);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - PADDING
  );

  const { userId } = useAuth();

  useEffect(() => {
    const onChange = () => {
      const deviceWidth = Dimensions.get("window").width - PADDING;

      setDimensions(deviceWidth);
    };

    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    getAllComments();
    getAvatar(userId, setUserAvatar);
  }, []);

  const createComment = async () => {
    if (comment === "") return;

    if (owner !== userId) {
      updateCommentsCounter(postId, commentsCounter);
    }

    addCommentInCollection({
      postId,
      userId,
      comment,
      avatar: userAvatar?.avatar ? userAvatar.avatar : defaultPhoto,
    });
  };

  const getAllComments = () => {
    getCommentsCollection(postId, setAllComments);
  };

  const handlePress = () => {
    createComment();
    setComment("");
  };

  const renderItem = ({
    item: { comment, date, avatar, idCommentingUser },
  }) => {
    return (
      <View style={styles.item}>
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            justifyContent: "space-between",
          }}
        >
          {idCommentingUser === owner ? (
            <>
              <View
                style={{
                  ...styles.commentWrap,
                  flexGrow: 1,
                  borderTopLeftRadius: 6,
                  maxWidth: dimensions - 44,
                }}
              >
                <Text style={styles.text}>{comment}</Text>
                <Text style={styles.date}>
                  {currentDate(date)} | {currentTime(date)}
                </Text>
              </View>

              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  overflow: "hidden",
                  borderColor: "transparent",
                }}
              >
                <Image
                  style={styles.image}
                  source={{ uri: avatar ? avatar : defaultPhoto }}
                />
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  overflow: "hidden",
                  borderColor: "transparent",
                }}
              >
                <Image
                  style={styles.image}
                  source={{ uri: avatar ? avatar : defaultPhoto }}
                />
              </View>

              <View
                style={{
                  ...styles.commentWrap,
                  flexGrow: 1,
                  borderTopRightRadius: 6,
                  maxWidth: dimensions - 44,
                }}
              >
                <Text style={styles.text}>{comment}</Text>
                <Text
                  style={{ ...styles.date, flex: 1, alignSelf: "flex-end" }}
                >
                  {currentDate(date)} | {currentTime(date)}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
 
        <ScrollView>
          <View
            style={{
              ...styles.container,
              width: dimensions,
            }}
          >
            <View>
              <View
                style={{
                  ...styles.photoWrap,
                  width: dimensions,
                  height: dimensions * 0.7,
                }}
              >
                <Image style={styles.image} source={{ uri: photoPost }} />
              </View>

              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={allComments}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={{ marginBottom: 75 }}
              />
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            paddingVertical: 16,
            backgroundColor: "#FFFFFF",
            position: "absolute",
            bottom: 0,
            width: dimensions,
            zIndex: 10,
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
              onPress={handlePress}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopColor: "#BDBDBD",
    borderTopWidth: 1,

    backgroundColor: "#f0d2ac",
  },
  container: {
    flex: 1,

    backgroundColor: "#aff19f",
  },
  photoWrap: {
    overflow: "hidden",
    borderRadius: 8,
    marginVertical: 32,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  item: {
    marginBottom: 24,
  },
  commentWrap: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 16,
    gap: 8,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  comment: {
    padding: 16,
    paddingRight: 50,
    borderRadius: 100,
    borderWidth: 1,
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
    top: "50%",
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});

export default CommentsScreen;
