import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authSignInUser } from "../../redux/auth/authOperations";

import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  mail: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isActive, setIsActive] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const deviceWidth = Dimensions.get("window").width - 16 * 2;
      setDimensions(deviceWidth);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  const handleFocus = (val) => {
    setIsShowKeyboard(true);
    setIsActive(val);
  };

  const handleMain = (val) =>
    setState((prevState) => ({ ...prevState, mail: val }));
  const handlePassword = (val) =>
    setState((prevState) => ({ ...prevState, password: val }));

  const handleIsShowPassword = () => setIsShowPassword(!isShowPassword);

  const handleAuthSignIn = () => {
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setIsActive("");
    Keyboard.dismiss();
  };

  const handleEndEditing = () => {
    setIsShowKeyboard(false);
    setIsActive("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/photo_bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.background,
                marginBottom: isShowKeyboard ? -260 : 0,
              }}
            >
              <Text style={styles.titleForm}>Войти</Text>
              <View style={{ ...styles.form, width: dimensions }}>
                <View style={styles.wrapInput}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isActive === "login" ? "#FF6C00" : "#E8E8E8",
                      backgroundColor:
                        isActive === "login" ? "#FFFFFF" : "#F6F6F6",
                    }}
                    keyboardType="email-address"
                    placeholder="Адрес электронной почты"
                    placeholderTextColor="#BDBDBD"
                    value={state.email}
                    onChangeText={(value) => handleMain(value)}
                    onFocus={() => handleFocus("login")}
                    onEndEditing={handleEndEditing}
                  />
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isActive === "password" ? "#FF6C00" : "#E8E8E8",
                      backgroundColor:
                        isActive === "password" ? "#FFFFFF" : "#F6F6F6",
                    }}
                    placeholder="Пароль"
                    maxLength={40}
                    secureTextEntry={isShowPassword}
                    placeholderTextColor="#BDBDBD"
                    value={state.password}
                    onChangeText={(value) => handlePassword(value)}
                    onFocus={() => handleFocus("password")}
                    onEndEditing={handleEndEditing}
                  />
                  <Text
                    style={styles.show}
                    onPress={() => handleIsShowPassword()}
                  >
                    Показать
                  </Text>
                </View>
                <View style={styles.wrapBtn}>
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.7}
                    onPress={handleAuthSignIn}
                    disabled={!state.mail && !state.password}
                  >
                    <Text style={styles.textBtn}>Войти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.enter}>
                      Нет аккаунта? Зарегистироваться
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  background: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    height: 510,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  titleForm: {
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    // marginHorizontal: 16,
    gap: 43,
  },
  wrapInput: {
    gap: 16,
  },
  input: {
    position: "relative",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  show: {
    position: "absolute",
    bottom: 30,
    right: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  wrapBtn: {
    gap: 16,
    marginBottom: 144,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  enter: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default LoginScreen;
