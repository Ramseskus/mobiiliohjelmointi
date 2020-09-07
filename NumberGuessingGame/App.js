import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      guessedNumber: Number(Math.floor(Math.random() * 99) + 1),
      attempts: 1,
      result: "",
    };
  }

  setText(text) {
    this.setState({ text: Number(text) });
  }

  buttonPressed = () => {
    const { text, guessedNumber, attempts } = this.state;

    this.setState({ attempts: Number(attempts + 1) });

    if (text === guessedNumber) {
      this.setState({
        result: "Congrats! You guessed the number in " + attempts + " guesses",
      });
      Alert.alert(
        "Congrats! You guessed the number in " + attempts + "  frikin' guesses"
      );
    } else if (text > guessedNumber) {
      this.setState({ result: "Your guess: " + text + " is too high" });
    } else if (text < guessedNumber) {
      this.setState({ result: "Your guess: " + text + " is too low" });
    } else {
      this.setState({ result: "Error" });
    }
  };

  render() {
    const { text, result } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Result: {result}</Text>
        <TextInput
          style={styles.textInput}
          keyboardType={"phone-pad"}
          onChangeText={(text) => this.setText(text)}
          value={`${text}`}
        />
        <View style={styles.btn}>
          <Button title="Guess me!" onPress={() => this.buttonPressed(true)} />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DB37D4",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInput: {
    backgroundColor: "#A50CF5",
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    borderColor: "black",
    borderWidth: 2,
  },
  text: {
    color: "#0C21F5",
    fontSize: 20,
  },
});

export default App;
