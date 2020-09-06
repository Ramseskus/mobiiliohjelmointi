import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", calculatorText: "", resultText: "" };
  }

  setText(text) {
    this.setState({ text: Number(text) });
  }

  setCalculatorText(calculatorText) {
    this.setState({ calculatorText: Number(calculatorText) });
  }

  buttonPressed = (operate) => {
    const { text, calculatorText } = this.state;
    if (operate) {
      this.setState({ resultText: text + calculatorText });
    } else {
      this.setState({ resultText: text - calculatorText });
    }
  };

  render() {
    const { text, calculatorText, resultText } = this.state;
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE616",
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
    borderWidth: 1,
  },
  text: {
    fontSize: 25,
    color: "red",
  },
});

export default App;
