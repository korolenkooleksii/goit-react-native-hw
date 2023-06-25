import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const addAvatar = async ({ userId, avatar }) => {
  try {
    await addDoc(collection(db, "avatars"), {
      userId,
      avatar,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getAvatar = async (userId, setUserAvatar) => {
  const q = query(collection(db, "avatars"), where("userId", "==", userId));

  await onSnapshot(q, (snapshot) => {
    snapshot.docs.map((doc) =>
      setUserAvatar({
        ...doc.data(),
        id: doc.id,
      })
    );
  });
};

const removeAvatar = async (id) => {
  try {
    await deleteDoc(doc(db, "avatars", id))
  } catch (e) {
    console.error("Error remove document: ", e);
  }
};

// await deleteDoc(doc(db, "cities", "DC"));

export { addAvatar, getAvatar, removeAvatar };
