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
  Alert,
} from "react-native";
import { Add } from "../../components/Add/Add";
import { Remove } from "../../components/Remove/Remove";
import * as ImagePicker from "expo-image-picker";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../../firebase";

const defaultPhoto = "https://via.placeholder.com/130x130";

const initialState = {
  login: "",
  mail: "",
  password: "",
};

const RegisterScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isActive, setIsActive] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const [avatar, setAvatar] = useState(defaultPhoto);
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

  const handleIsShowPassword = () => setIsShowPassword(!isShowPassword);

  const handleAuthSignUp = () => {
    dispatch(authSignUpUser(state));

    uploadAvatarToServer();

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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setIsImage(true);
    }
  };

  const uploadAvatarToServer = async () => {
    const response = await fetch(avatar);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `avatar/${uniquePostId}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
      // Alert.alert("Uploaded an avatar!");
    });

    const pathReference = ref(storage, `avatar/${uniquePostId}`);
    const processedAvatar = await getDownloadURL(pathReference);

    try {
      const docRef = await addDoc(collection(db, "avatar"), {
        processedAvatar, userId: null
      });
    } catch (e) {
      console.error("Error adding document: ", e);
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
                    source={{ uri: avatar }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </View>
                {isImage ? (
                  <Remove style={styles.removePhotoBtn} />
                ) : (
                  <Add style={styles.addPhotoBtn} onPress={pickImage} />
                )}
              </View>

              <Text style={styles.titleForm}>Реєстрація</Text>
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
                    placeholder="Логін"
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
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    value={state.mail}
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
                    maxLength={20}
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
                    Показати
                  </Text>
                </View>
                <View style={styles.wrapBtn}>
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.7}
                    onPress={handleAuthSignUp}
                    disabled={!state.login && !state.mail && !state.password}
                  >
                    <Text style={styles.textBtn}>Зареєструватись</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.enter}>Вже є акаунт? Увійти</Text>
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
  removePhotoBtn: {
    position: "absolute",
    bottom: -76,
    left: 102,
    width: 25,
    height: 25,
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
