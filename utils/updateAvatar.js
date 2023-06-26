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
  const avatarsRef = collection(db, "avatars");

  try {
    await addDoc(avatarsRef, {
      userId,
      avatar,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getAvatar = async (userId, setUserAvatar) => {
  const avatarsRef = collection(db, "avatars");
  const q = query(avatarsRef, where("userId", "==", userId));

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
  const avatarRef = doc(db, "avatars", id);

  try {
    await deleteDoc(avatarRef);
  } catch (e) {
    console.error("Error remove document: ", e);
  }
};

export { addAvatar, getAvatar, removeAvatar };
