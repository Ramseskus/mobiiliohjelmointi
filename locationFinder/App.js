import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const LATITUDE = 60.200692
const LONGITUDE = 24.934302
const LATITUDE_DELTA = 0.02
const LONGITUDE_DELTA = 0.02
  
export default function App() {
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA});
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [marker, setMarker] = useState("");

  useEffect(() => {
    setRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA})
    getDeviceLocation()
    getLocation()
  }, []);

   const getDeviceLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
      const deviceLocation = await Location.getCurrentPositionAsync({});
      mapLocation({
        lat: deviceLocation.coords.latitude ,
        lng:  deviceLocation.coords.longitude,
      })
  };

  const getLocation = () => {
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=oXxeShecQm439ah7SXIpjgJkqmPE4Tf1" +
      "&location=" +
      title;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.results[0].providedLocation.location);
        if (json.results[0].locations[0] !== undefined){
          mapLocation(json.results[0].locations[0].latLng)
          setMarker(json.results[0].locations[0].latLng)
        }
        
      })
      .catch((error) => alert(error));
  };

  const mapLocation = (fetchedRegion) => {
    let region = {
      latitude: Number(fetchedRegion.lat),
      longitude: Number(fetchedRegion.lng),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    setRegion(region);
  };

  const onRegionChange = (region) => {
    setRegion(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapview}
        region={region}
        onRegionChangeComplete={(region) => onRegionChange(region)}
      >
        <Marker coordinate={region}></Marker>
      </MapView>
      <TextInput
        style={styles.textinput}
        value={title}
        onChangeText={(title) => setTitle(title)}
      />

      <StatusBar style="auto" />
      <Text>
        <Button onPress={getLocation} title="Show" />
      </Text>
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
