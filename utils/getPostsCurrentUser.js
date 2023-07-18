import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getPostsCurrentUser = async (userId, setPosts) => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("owner", "==", userId));

  await onSnapshot(q, (snapshot) => {
    setPosts(
      [...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  });
};
