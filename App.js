import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Main from "./components/Main/Main";

const App = () => {
  const [loadFonts] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!loadFonts) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
