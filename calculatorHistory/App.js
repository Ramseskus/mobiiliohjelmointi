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
      text: 0,
      calculatorText: 0,
      resultText: "",
      dataHistory: [{ id: 0, history: "History: " }],
    };
  }

  setText(text) {
    this.setState({ text: Number(text) });
  }

  setCalculatorText(calculatorText) {
    this.setState({ calculatorText: Number(calculatorText) });
  }

  buttonPressed = (operate) => {
    const { text, calculatorText, dataHistory } = this.state;
    if (operate) {
      let newData = dataHistory;
      const yhteensa = text + calculatorText;
      newData.push({
        id: 0,
        history: text + " + " + calculatorText + " = " + yhteensa,
      });
      this.setState({ resultText: text + calculatorText, History: newData });
    } else {
      let newData1 = dataHistory;
      const miinus = text - calculatorText;
      newData1.push({
        id: 0,
        history: text + "-" + calculatorText + "=" + miinus,
      });
      this.setState({ resultText: text - calculatorText, History: newData1 });
    }
  };

  flatListRender = (newLine) => {
    return <Text style={styles.historytext}>{newLine.item.history}</Text>;
  };

  render() {
    const { text, calculatorText, resultText, dataHistory } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btn}>
          <Button title="+" onPress={() => this.buttonPressed(true)} />
          <Button title="-" onPress={() => this.buttonPressed(false)} />
        </View>
        <View style={styles.textinput}>
          <TextInput
            keyboardType={"phone-pad"}
            onChangeText={(text) => this.setText(text)}
            value={`${text}`}
          />
          <View style={styles.textinput} />
          <TextInput
            keyboardType={"phone-pad"}
            onChangeText={(calculatorText) =>
              this.setCalculatorText(calculatorText)
            }
            value={`${calculatorText}`}
          />
        </View>
        <Text style={styles.text}>Result: {resultText}</Text>
        <StatusBar style="auto" />
        <FlatList
          style={styles.flatlist}
          data={dataHistory}
          renderItem={this.flatListRender}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#62D7D9",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textinput: {
    backgroundColor: "#fff",
    fontSize: 30,
    width: 200,
    borderColor: "black",
    borderWidth: 2,
  },
  text: {
    fontSize: 35,
    color: "red",
  },
  flatlist: {
    color: "black",
  },
  historytext: {
    fontSize: 25,
  },
});

export default App;
