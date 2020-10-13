import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TextInput,
} from "react-native";
import {Picker} from '@react-native-community/picker';


export default function App() {
  const [rates, setRates] = useState([]);
  const [value, setValue] = useState("");
  const [finalResult, setfinalResult] = useState(0);
  const [amount, setAmount] = useState([]);
  const [base, setBase] = useState("");
  const [symbol, setSymbol] = useState("")

  const url =
  "http://data.fixer.io/api/latest?access_key=dcd6dbaed9232e21264e2d91aa1e4332";

  useEffect(() => {
  getRates();
  }, []);

  const getRates = () => {
    const resolveCors = "https://thingproxy.freeboard.io/fetch/";
    const newUrl = resolveCors + url;
    fetch(newUrl)
      .then((response) => response.json())
      .then((json) => {
        setRates(json.rates)
        setBase(json.base)
        setValue(Object.values(json.rates))
        
      })
      .then()
      .catch((error) => alert(error));
  };

  const pickCurrency = (item) => {
   const key = Object.entries(rates).find(([k, v]) => {
      console.log(v)
    return(Number(v) === Number(item)) 
    }
      
     )
    setValue(item)
    setSymbol(key[0])
   // console.log(key)
  };

  const showAsEuros = () => {
    setfinalResult(amount * value);
  }


  return (
    <View>
      <Text style={styles.title}>Convert euros</Text>
          <Image style={styles.Image} source={{uri: "https://www.xpressmoney.com/blog/wp-content/uploads/2019/10/5_tips_to_save_money_article_xyz.jpg" }}></Image>
        
          <View style={styles.fixToText}>
          <TextInput
        style={styles.textinput}
        value={amount}
        placeholder="€"
        onChangeText={(amount) => setAmount(amount)}
      /> 
        <Picker
        selectedValue={value}
        style={styles.picker}
        onValueChange={(item) => pickCurrency(item)}
      >
        {Object.keys(rates).map((key, value) =>
        <Picker.Item label={key} /*{rates[key]}*/ value={rates[key]} key={value} />)}
      </Picker>
          </View>
        <View style={styles.btn}>
          <Button  title="Press to convert" onPress={showAsEuros}></Button>
        </View>
      <Text style={styles.text}>{amount} {base}</Text>
      <Text style={styles.text}>=</Text>
        <Text style={styles.text}>{finalResult.toFixed(2)} {symbol}</Text>

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
  title:{
    fontSize: 27,
    color: "#000",
    textAlign: "center",
    margin: 50,
    textTransform: "uppercase",
    backgroundColor: "#B4CED4",
    padding: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  btn: {
    alignSelf: "center",
    width: 100,
    height: 10,
    margin: 30,
  },
  value: {
    height: 300,
    width: 300,
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
  },
  listseparator: {
    height: 1,
    width: "80%",
    backgroundColor: "#CED0CE",
  },
  textinput: {
    fontSize: 18,
    width: 150,
    height:30,
    backgroundColor: "#CED0CE",
    alignSelf: "center",
  },
  Image: {
    width: 300,
    height: 150,
    marginTop: 10,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  picker: {
    alignSelf: "center",
    height:30,
    width: 150,
  },
});

