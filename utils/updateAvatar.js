import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const addAvatar = async ({ userId, avatar }) => {
  try {
    const docRef = await addDoc(collection(db, "avatars"), {
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

export { addAvatar, getAvatar };
