import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Text, View } from "react-native";
import LoginScreen from "./Screen/LoginScreen";
import RegistrationScreen from "./Screen/RegistrationScreen";

export default function App() {
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
    <>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </>
  );
}
