import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

export default function calculatorHome({ navigation }) {
  const [result, setResult] = useState("");
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [data, setData] = useState([]);

  const initialFocus = useRef(null);

  const calculate = (operator) => {
    console.log(operand1, operand2, operator);
    const [number1, number2] = [Number(operand1), Number(operand2)];

    let result = 0;
    switch (operator) {
      case "+":
        result = number1 + number2;
        break;
      case "-":
        result = number1 - number2;
        break;
    }
    setResult(result);
    setData([
      ...data,
      {
        key: String(data.lenght),
        text: `${number1} ${operator} ${number2} = ${result}`,
      },
    ]);

    setOperand1("");
    setOperand2("");
    initialFocus.current.focus();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.textinput}
        ref={initialFocus}
        keyboardType={"numeric"}
        onChangeText={(text) => setOperand1(text)}
        value={operand1}
      />
      <TextInput
        style={styles.textinput}
        keyboardType={"numeric"}
        onChangeText={(text) => setOperand2(text)}
        value={operand2}
      />
      <Text style={styles.text}>Result: {result}</Text>
      <View style={styles.btncontainer}>
        <View style={styles.btn}>
          <Button title="+" onPress={() => calculate("+")} />
        </View>
        <View style={styles.btn}>
          <Button title="-" onPress={() => calculate("-")} />
        </View>
      </View>

      <View style={styles.btnhistory}>
        <Button
          title="History"
          onPress={() => navigation.navigate("History", { data })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#62D7D9",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btncontainer: {
    flexDirection: "row",
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
  historytext: {
    fontSize: 25,
  },
  btnhistory: {
    padding: 30,
  },
});
