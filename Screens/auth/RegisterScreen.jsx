import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperations";

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
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Add } from "../../components/Add/Add";
import * as ImagePicker from "expo-image-picker";
import { addUserAvatar } from "../../redux/auth/authSlice";

const defaultPhoto = "https://via.placeholder.com/130x130";

const initialState = {
  login: "",
  mail: "",
  password: "",
  avatar: defaultPhoto,
};

const RegisterScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isActive, setIsActive] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  // const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);

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

  const handleLogin = (val) =>
    setState((prevState) => ({ ...prevState, login: val }));
  const handleMain = (val) =>
    setState((prevState) => ({ ...prevState, mail: val }));
  const handlePassword = (val) =>
    setState((prevState) => ({ ...prevState, password: val }));
  const handleAvatar = (val) =>
    setState((prevState) => ({ ...prevState, avatar: val.assets[0].uri }));

  const handleIsShowPassword = () => setIsShowPassword(!isShowPassword);

  const handleAuthSignUp = () => {
    dispatch(authSignUpUser(state));
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleAvatar(result);
      // setImage(result);
      setIsImage(true);
      // dispatch(addUserAvatar(image));
    }
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
                marginBottom: isShowKeyboard ? -200 : 0,
              }}
            >
              <View style={styles.addPhoto}>
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 16,
                    backgroundColor: "#F6F6F6",
                  }}
                >
                  <Image
                    // source={{ uri: image.assets[0].uri }}
                    source={{ uri: state.avatar }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </View>
                <Add style={styles.addPhotoBtn} onPress={pickImage} />
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
                    onPress={handleAuthSignUp}
                    disabled={!state.login && !state.mail && !state.password}
                  >
                    <Text style={styles.textBtn}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.enter}>Уже есть аккаунт? Войти</Text>
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

export default RegisterScreen;
