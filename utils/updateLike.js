import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  add,
  onSnapshot,
  snapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { storage, db } from "../firebase";

const addLike = async (postId, userId) => {
  const postRef = doc(db, "posts", postId);

  try {
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  } catch (e) {
    console.error("Error update likes: ", e);
  }
};

const removeLike = async (postId, userId) => {
  const postRef = doc(db, "posts", postId);

  try {
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });
  } catch (e) {
    console.error("Error update likes: ", e);
  }
};

export { addLike, removeLike };
