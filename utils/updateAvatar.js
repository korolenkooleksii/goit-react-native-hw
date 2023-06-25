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

const addAvatar = async (userId, avatar) => {
  try {
    const docRef = await addDoc(collection(db, "avatar"), {
      userId,
      avatar,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getAvatar = async (userId) => {
  await onSnapshot(collection(db, "avatar"), (snapshot) => {
    const avatarsCollection = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const result = avatarsCollection.find((el) => el.userId === userId);

    console.log("result.avatar 🚀  => ", result.avatar);
    console.log("result.id 🚀  => ", result.id);
  });
};

export { addAvatar, getAvatar };
