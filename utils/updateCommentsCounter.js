import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  add,
  onSnapshot,
  snapshot,
} from "firebase/firestore";
import { storage, db } from "../firebase";

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
