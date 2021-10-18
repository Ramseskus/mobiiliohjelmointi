import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button} from'react-native-elements';

export default function Map({route}) {
  const {itemId, title} = route.params;
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.03,
    longitudeDelta: 0.02,
  });
  const [marker, setMarker] = useState("");

  const getLocation = () => {
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=****" +
      "&location=" +
      title;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        parseAll(json.results[0].locations[0].latLng);
        setMarker(json.results[0].locations[0].latLng)
      })
      .catch((error) => alert(error));
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
      <View style={{width: '100%'}}>
        <Button buttonStyle={{backgroundColor: '#561C70'}} title="SHOW" onPress={getLocation}></Button>
      </View>
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
    height:'100%',
    width: '100%',
  },
});
