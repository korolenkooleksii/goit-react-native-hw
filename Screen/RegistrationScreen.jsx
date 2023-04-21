import { useState } from "react";
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
} from "react-native";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handleLogin = (text) => setLogin(text);
  const handleMain = (text) => setMail(text);
  const handlePassword = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert(`login: ${login}, email: ${mail}, password: ${password}`);
    reset();
  };

  const reset = () => {
    setLogin("");
    setMail("");
    setPassword("");
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <ImageBackground
      style={styles.image}
      source={require("../assets/images/photo_bg.jpg")}
    >
        <View
          style={{
            ...styles.background,
            marginBottom: isShowKeyboard ? -135 : 0,
          }}
        >
          <Text style={styles.titleForm}>Регистрация</Text>
          <View style={styles.form}>
            <View style={styles.wrapInput}>
              <TextInput
                style={styles.input}
                autoFocus
                maxLength={40}
                placeholder="Логин"
                placeholderTextColor="#BDBDBD"
                value={login}
                onChangeText={handleLogin}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                value={mail}
                onChangeText={handleMain}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                maxLength={40}
                secureTextEntry={true}
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={handlePassword}
                onFocus={() => setIsShowKeyboard(true)}
              />
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
          <View style={styles.addPhoto}></View>
        </View>
    </ImageBackground>
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
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titleForm: {
    marginBottom: 32,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
    gap: 32,
  },
  wrapInput: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    padding: 16,
    backgroundColor: "#E8E8E8",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
  },
  wrapBtn: {
    gap: 16,
    marginBottom: 45,
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
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  enter: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  addPhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
});

export default RegistrationScreen;
