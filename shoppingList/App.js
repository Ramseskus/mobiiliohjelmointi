import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      resultText: "",
      shoppingList: [{ id: 0, listItem: " " }],
    };
  }

  setText(inputText) {
    this.setState({ inputText: String(inputText) });
  }

  buttonPressed = (operate) => {
    const { inputText, shoppingList } = this.state;
    const newItem = shoppingList;

    if (operate) {
      newItem.push({
        id: 0,
        listItem: inputText,
      });
      this.setState({ resultText: inputText, shoppingList: newItem });
    } else {
      const deleteData = (this.state.shoppingList.length = "");
      newItem.push({
        id: 0,
        listItem: deleteData,
      });
      this.setState({
        resultText: deleteData,
        shoppingList: newItem,
      });
    }
  };

  flatListRender = (newLine) => {
    return <Text style={styles.inputText}>{newLine.item.listItem}</Text>;
  };

  render() {
    const { inputText, shoppingList } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textinput}>
          <TextInput
            onChangeText={(inputText) => this.setText(inputText)}
            value={inputText}
          />
        </View>
        <View style={styles.btn}>
          <Button title="ADD" onPress={() => this.buttonPressed(true)} />
          <Button title="CLEAR" onPress={() => this.buttonPressed(false)} />
        </View>
        <Text style={styles.text}>My Shopping List </Text>
        <FlatList
          style={styles.flatlist}
          data={shoppingList}
          renderItem={this.flatListRender}
          keyExtractor={(item, index) => index.toString()}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 50,
    backgroundColor: "#A62D75",
    alignItems: "center",
  },
  btn: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textinput: {
    backgroundColor: "#FDC4E6",
    width: 200,
    borderColor: "black",
    borderWidth: 2,
    color: "#8F185E",
  },
  text: {
    backgroundColor: "#FDC4E6",
    width: 200,
    fontSize: 25,
    color: "#8F185E",
  },
  flatlist: {
    height: 150,
    width: 200,
    color: "#8F185E",
    backgroundColor: "#DBAFC9",
  },
});

export default App;
