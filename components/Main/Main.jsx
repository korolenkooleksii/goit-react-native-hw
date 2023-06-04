import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import "../../firebase";

import useRoute from "../../router";
import { authStateChangeUser } from "../../redux/auth/authOperations";
import { useAuth } from "../../hooks/useAuth";

const Main = () => {
  const {stateChange} = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main