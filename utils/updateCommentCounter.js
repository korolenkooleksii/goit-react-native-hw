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

export const updateCommentCounter = async (postId, value) => {
    try {
      const postsRef = doc(db, "posts", postId);
      await updateDoc(postsRef, {
        commentCounter: value + 1,
      });

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };