import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addCommentInCollection = async ({
  postId,
  userId,
  comment,
  avatar,
}) => {

  const commentsRef = collection(db, "posts", postId, "comments")

  try {
    await addDoc(commentsRef, {
      idCommentingUser: userId,
      comment,
      date: new Date().toString(),
      avatar,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
