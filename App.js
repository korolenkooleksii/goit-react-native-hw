import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import useRoute from "./router";

export default function App() {
  const [loadFonts] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const routing = useRoute([]);

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
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
}
