import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

export default function calculatorHistory({ route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={styles.flatlist}
          data={data}
          ListHeaderComponent={<Text style={styles.text}>History</Text>}
          renderItem={({ item }) => <Text>{item.text}</Text>}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#62D7D9",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 35,
    color: "red",
    paddingBottom: 20,
  },
  flatlist: {
    padding: 20,
    backgroundColor: "#fff",
  },
});
