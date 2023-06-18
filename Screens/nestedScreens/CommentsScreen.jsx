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
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { async } from "@firebase/util";
import { useAuth } from "../../hooks/useAuth";

import {
  collection,
  doc,
  setDoc,
  addDoc,
  add,
  onSnapshot,
} from "firebase/firestore";
import { storage, db } from "../../firebase";
import { currentDate } from "../../utils/currentDate";
import { currentTime } from "../../utils/currentTime";

const defaultPhoto = "https://via.placeholder.com/130x130";

const CommentsScreen = ({ route }) => {
  const { postId, photoPost, idPostingUser } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const { avatar, userId } = useAuth();

  useEffect(() => {
    const onChange = () => {
      const deviceWidth = Dimensions.get("window").width - 16 * 2;
      setDimensions(deviceWidth);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        idCommentingUser: userId,
        comment,
        date: new Date().toString(),
        avatar,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getAllComments = async () => {
    await onSnapshot(
      collection(db, "posts", postId, "comments"),
      (snapshot) => {
        setAllComments(
          [...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
      }
    );
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const handlePress = () => {
    createComment();
    Keyboard.dismiss();
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
          {idCommentingUser === idPostingUser ? (
            <>
              <View
                style={{
                  ...styles.commentWrap,
                  flexGrow: 1,
                  borderTopLeftRadius: 6,
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
                  // backgroundColor: "#F6F6F6",
                  // borderWidth: 1,
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
                  // backgroundColor: "#F6F6F6",
                  // borderWidth: 1,
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

          {/* <>
          <View
            style={{
              ...styles.commentWrap,
              flexGrow: 1,
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
              // backgroundColor: "#F6F6F6",
              // borderWidth: 1,
              overflow: "hidden",
              borderColor: "transparent",
            }}
          >
            <Image
              style={styles.image}
              source={{ uri: avatar ? avatar : defaultPhoto }}
            />
          </View>
          </> */}
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.background}>
        <View
          style={{
            ...styles.container,
            width: dimensions,
          }}
        >
          <View
            style={{
              ...styles.photoWrap,
              width: dimensions,
              height: dimensions * 0.7,
            }}
          >
            <Image style={styles.image} source={{ uri: photoPost }} />
          </View>

          <View>
            <FlatList
              data={allComments}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
        </View>

        <View
          style={{
            paddingTop: 32,
            paddingBottom: 16,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",

            borderWidth: 1,
            borderColor: "blue",
          }}
        >
          <View
            style={{
              position: "relative",
              width: dimensions,
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
    borderWidth: 1,
    borderRadius: 100,

    // borderColor: "#E8E8E8",
    borderColor: "blue",

    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  send: {
    position: "absolute",
    right: 8,
    bottom: 15,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});

export default CommentsScreen;
