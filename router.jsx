import StackNavigator from "./navigation/StackNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

const useRoute = (isAuth) => {
  return isAuth ? <StackNavigator /> : <AuthNavigator />;
};

export default useRoute;
