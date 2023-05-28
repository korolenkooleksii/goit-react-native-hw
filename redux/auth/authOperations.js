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
  ({ login, mail, password }) =>
  async (dispatch) => {
    console.log("avatar --- ", avatar);

    try {
      await createUserWithEmailAndPassword(auth, mail, password);

      await auth.currentUser;

      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const { displayName, uid, email, userAvatar } = await auth.currentUser;
      console.log("🚀 =>   userAvatar - ", userAvatar)

      dispatch(
        updateUserProfile({
          login: displayName,
          userId: uid,
          email,
          avatar: userAvatar,
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

      const { displayName, uid, email } = await auth.currentUser;

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
