import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 61.171462,
    longitude: 28.770861,
    latitudeDelta: 0.03,
    longitudeDelta: 0.02,
  });
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState("");

  const getLocation = () => {
    console.log("getLocation")
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=******" +
      "&location=" +
      title;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const reg = parseRegion(json.results[0].locations[0].latLng);
        setTitle(json.results[0].providedLocation.location);
        getRestaurants(reg)
      })
      .catch((error) => alert(error));
  };

  const parseRegion = (fetchedRegion) => {
    let region = {
      latitude: Number(fetchedRegion.lat),
      longitude: Number(fetchedRegion.lng),
      latitudeDelta: 0.02,
      longitudeDelta: 0.03,
    };
    setRegion(region);
    return region
  };

  const getRestaurants = (reg) => {
    console.log("getRestaurants")
    const baseUrl =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=" +
      reg.latitude +
      " " +
      reg.longitude +
      "&radius=200&key=*****";
    fetch(baseUrl)
      .then((response) => response.json())
      .then((json) => {
        setMarkers(json.results);
      })
      .catch((error) => alert(error));
  };

  const setMarkers = (jsonMarkers) => {
    let result = [];
    result = jsonMarkers.map((marker) => ({
      name: marker.name,
      vicinity: marker.vicinity,
      location: marker.geometry.location,
    }));
    setResults(result);
  };

  const combinedFunctions = () => {
    getLocation();
    //getRestaurants();
  };

  const onRegionChange = (region) => {
    setRegion(region);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <MapView
        style={styles.mapview}
        region={region}
        onRegionChangeComplete={(region) => onRegionChange(region)}
      >
        {results.map((mar) => (
          <Marker
            key={mar.name}
            name="restaurant"
            coordinate={{
              latitude: mar.location.lat,
              longitude: mar.location.lng,
            }}
            title={mar.name}
            description={mar.vicinity}
          />
        ))}
      </MapView>
      <TextInput
        style={styles.textinput}
        value={title}
        onChangeText={(title) => setTitle(title)}
      />
      <Button title="Show" color="#841584" onPress={combinedFunctions}></Button>
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
