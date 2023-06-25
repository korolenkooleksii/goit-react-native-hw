import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateCommentsCounter = async (postId, value) => {
  const postRef = doc(db, "posts", postId);

  try {
    await updateDoc(postRef, {
      commentsCounter: value + 1,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
