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

export const addCommentInCollection = async (postId, userId, comment, avatar) => {
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
