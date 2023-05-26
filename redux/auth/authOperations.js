import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { updateUserProfile, authStateChange, authSignOut } from "./authSlice";

const auth = getAuth();

const authSignUpUser =
  ({ login, mail, password }) =>
  async (dispatch) => {
    
    try {
      await createUserWithEmailAndPassword(auth, mail, password);

      await auth.currentUser;

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: "",
      });

      const { displayName, uid, email, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          login: displayName,
          userId: uid,
          email,
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
      const user = await signInWithEmailAndPassword(auth, mail, password);

      const {displayName, uid, email, photoURL} = await auth.currentUser;

      console.log(displayName, uid, email);

      dispatch(
        updateUserProfile({
          login: displayName,
          userId: uid,
          email,
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
        })
      );

      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignUpUser, authSignInUser, authSignOutUser, authStateChangeUser };
