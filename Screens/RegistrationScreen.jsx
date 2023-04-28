import { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import Add from "../Component/Add";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isActive, setIsActive] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 16 * 2);

  useEffect(() => {
    const onChange = () => {
      const deviceWidth = Dimensions.get("window").width - 16 * 2;
      setDimensions(deviceWidth);
    };

    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const handleFocus = (val) => {
    setIsShowKeyboard(true);
    setIsActive(val);
  };

  const handleLogin = (val) =>
    setState((prevState) => ({ ...prevState, login: val }));
  const handleMain = (val) =>
    setState((prevState) => ({ ...prevState, email: val }));
  const handlePassword = (val) =>
    setState((prevState) => ({ ...prevState, password: val }));

  const handleIsShowPassword = () => setIsShowPassword(!isShowPassword);

  const onLogin = () => {
    // Alert.alert(state.login);
    console.log(state);
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setIsActive('');
    Keyboard.dismiss();
  };

  const handleEndEditing = () => {
    setIsShowKeyboard(false);
    setIsActive("");
  }

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/photo_bg.jpg")}
        >
          <View
            style={{
              ...styles.background,
              marginBottom: isShowKeyboard ? -200 : 0,
            }}
          >
            <View style={styles.addPhoto}>
              <Add style={styles.addPhotoBtn} />
            </View>

            <Text style={styles.titleForm}>Регистрация</Text>
            <View style={{ ...styles.form, width: dimensions }}>
              <View style={styles.wrapInput}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isActive === "login" ? "#FF6C00" : "#E8E8E8",
                    backgroundColor:
                      isActive === "login" ? "#FFFFFF" : "#F6F6F6",
                  }}
                  maxLength={40}
                  placeholder="Логин"
                  placeholderTextColor="#BDBDBD"
                  value={state.login}
                  onChangeText={(value) => handleLogin(value)}
                  onFocus={() => handleFocus("login")}
                  onEndEditing={handleEndEditing}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isActive === "email" ? "#FF6C00" : "#E8E8E8",
                    backgroundColor:
                      isActive === "email" ? "#FFFFFF" : "#F6F6F6",
                  }}
                  keyboardType="email-address"
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  value={state.email}
                  onChangeText={(value) => handleMain(value)}
                  onFocus={() => handleFocus("email")}
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
                  onPress={onLogin}
                >
                  <Text style={styles.textBtn}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <Text style={styles.enter}>Уже есть аккаунт? Войти</Text>
              </View>
            </View>
          </View>
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
    height: 580,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  addPhoto: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addPhotoBtn: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
    fill: "#FF6C00",
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  show: {
    position: "absolute",
    bottom: 34,
    right: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  wrapBtn: {
    gap: 16,
    marginBottom: 78,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 51,
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

export default RegistrationScreen;
