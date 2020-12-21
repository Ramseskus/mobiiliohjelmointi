import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [input, setInput] = useState('')

  const speak = () => {
    const thingToSay = input;
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
      <Text>Type Message Here:</Text>
      <TextInput style={styles.textinput} value={input} onChangeText={(input) => setInput(input)}></TextInput>
      <Button title="Press to hear text" onPress={speak} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDF507',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    height: 40,
    width: "70%",
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#fff",
  },
});
