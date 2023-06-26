import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const getCommentsCollection = async (postId, setAllComments) => {
  const commentsRef = collection(db, "posts", postId, "comments");

  await onSnapshot(commentsRef, (snapshot) => {
    setAllComments(
      [...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
  });
};
