import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { updateUserProfile, authStateChange, authSignOut } from "./authSlice";

const authSignUpUser =
  ({ login, mail, password, avatar }) =>
  async (dispatch) => {
    console.log(login, mail, password, avatar);
    try {
      await createUserWithEmailAndPassword(auth, mail, password);

      await auth.currentUser;

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      const { displayName, uid, email, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          login: displayName,
          userId: uid,
          email,
          avatar: photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("errorCode - ", errorCode);
      console.log("errorMessage - ", errorMessage);
    }
  };

const authSignInUser =
  ({ mail, password }) =>
  async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, mail, password);

      const { displayName, uid, email, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          login: displayName,
          userId: uid,
          email,
          avatar: photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("errorCode - ", errorCode);
      console.log("errorMessage - ", errorMessage);
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);

  dispatch(authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      
      dispatch(
        updateUserProfile({
          login: user.displayName,
          userId: user.uid,
          email: user.email,
          avatar: user.photoURL,
        })
      );

      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignUpUser, authSignInUser, authSignOutUser, authStateChangeUser };
