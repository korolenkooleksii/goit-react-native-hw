import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addCommentInCollection = async ({
  postId,
  userId,
  comment,
  avatar,
}) => {
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
