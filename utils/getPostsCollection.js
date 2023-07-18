import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const getPostsCollection = async (setPosts) => {
  const postsRef = collection(db, "posts");

  await onSnapshot(postsRef, (snapshot) => {
    setPosts(
      [...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  });
};
