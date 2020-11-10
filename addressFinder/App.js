import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.03,
    longitudeDelta: 0.02,
  });
  const [marker, setMarker] = useState({
    latitude: 60.201373,
    longitude: 24.934041,
  });
  const [title, setTitle] = useState("");

  const getLocation = () => {
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=oXxeShecQm439ah7SXIpjgJkqmPE4Tf1" +
      "&location=" +
      title;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        parseAll(json.results[0].locations[0].latLng);
        setTitle(json.results[0].providedLocation.location);
      })
      .catch((error) => alert(error));
    console.log(region);
    console.log(title);
  };

  const parseAll = (fetchedRegion) => {
    let region = {
      latitude: Number(fetchedRegion.lat),
      longitude: Number(fetchedRegion.lng),
      latitudeDelta: 0.02,
      longitudeDelta: 0.03,
    };
    setRegion(region);
  };

  const onRegionChange = (region, marker) => {
    setRegion(region);
    setMarker(marker);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <MapView
        style={styles.mapview}
        region={region}
        onRegionChangeComplete={(region) => onRegionChange(region)}
      >
        <Marker coordinate={region} title={title} />
      </MapView>
      <TextInput
        style={styles.textinput}
        value={title}
        onChangeText={(title) => setTitle(title)}
      />
      <Button title="Show" color="#841584" onPress={getLocation}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapview: {
    flex: 1,
    height: 200,
    width: 300,
  },
  textinput: {
    fontSize: 18,
    width: 200,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
});
