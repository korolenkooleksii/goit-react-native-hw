import { useSelector } from "react-redux";
import {
  selectEmail,
  selectLogin,
  selectStateChange,
  selectUserId,
} from "../redux/auth/selectors";

export const useAuth = () => {
  return {
    login: useSelector(selectLogin),
    userId: useSelector(selectUserId),
    email: useSelector(selectEmail),
    stateChange: useSelector(selectStateChange),
  };
};
