import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const MapScreen = ({route}) => {
  const {latitude, longitude} = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        mapType="standard"
        minZoomLevel={15}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="It's here"
          coordinate={{ latitude, longitude }}
          description="Remember"
        />
      </MapView>
      <Text>Map Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
