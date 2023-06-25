import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const getPostsCollection = async (setPosts) => {
  await onSnapshot(collection(db, "posts"), (snapshot) => {
    setPosts(
      [...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
  });
};
