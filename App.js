import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import RegistrationScreen from "./Screen/RegistrationScreen";

export default function App() {
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      // <View style={styles.container}>
    <>
        <RegistrationScreen />
    </>
      //  </View> 
    // </TouchableWithoutFeedback> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
