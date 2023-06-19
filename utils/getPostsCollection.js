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
  
  export const getPostsCollection = async (setPosts) => {
    await onSnapshot(collection(db, "posts"), (snapshot) => {
      // setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
      // setPosts(snapshot.docs.map((doc) => (console.log("doc  ---  ", doc.data()))));

      setPosts(
        [...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      );
    });
  };
  