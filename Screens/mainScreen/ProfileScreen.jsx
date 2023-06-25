import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import {addAvatar, getAvatar} from '../../utils/updateAvatar'

const ProfileScreen = () => {
  const { userId, avatar } = useAuth();

  return (
    <View style={styles.container}>
      <Button onPress={() => addAvatar(userId, avatar)}>add</Button>
      <Button onPress={() => getAvatar(userId)}>delete</Button>
      <Text>ProfileScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
