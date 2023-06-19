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

export const getCommentsCollection = async (postId, setAllComments) => {
  await onSnapshot(collection(db, "posts", postId, "comments"), (snapshot) => {
    setAllComments(
      [...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
  });
};
