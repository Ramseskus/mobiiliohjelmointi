import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  Image,
  TextInput,
} from "react-native";

export default function App() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [thumbnail, setThumbnail] = useState([]);

  const url =
    "http://www.recipepuppy.com/api/?i=" +
    ingredients +
    "&thumbnail=" +
    thumbnail;

  const getRecipe = () => {
    const resolveCors = "https://thingproxy.freeboard.io/fetch/";
    const newUrl = resolveCors + url;
    fetch(newUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setRecipe(json.results);
        setIngredients(json.ingredients);
        setThumbnail(json.thumbnail);
        console.log(ingredients);
        console.log(recipe);
        console.log(json.results);
        console.log(setRecipe);
      })
      .then()
      .catch((error) => alert(error));
  };

  const renderData = (item) => {
    return (
      <View>
        <Text style={styles.text}>{item.title}</Text>

        <View style={styles.imageBox}>
          <Image style={styles.Image} source={{ uri: item.thumbnail }}></Image>
        </View>
      </View>
    );
  };

  const listSeparator = () => {
    return <View style={styles.listseparator}></View>;
  };

  return (
    <View>
      <TextInput
        style={styles.textinput}
        value={ingredients}
        placeholder="Search Ingredient"
        onChangeText={(ingredients) => setIngredients(ingredients)}
      />
      <Button title="find recipe" onPress={getRecipe}></Button>
      <FlatList
        style={styles.flatlist}
        data={recipe}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderData(item.item)}
        ItemSeparatorComponent={listSeparator}
        data={recipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    height: 300,
    textAlign: "center",
  },
  listseparator: {
    height: 1,
    width: "80%",
    backgroundColor: "#CED0CE",
  },
  textinput: {
    fontSize: 18,
    width: 200,
    backgroundColor: "#CED0CE",
    marginTop: 60,
    marginBottom: 20,
    alignSelf: "center",
  },
  Image: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginTop: 20,
  },
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 20,
  },
});
