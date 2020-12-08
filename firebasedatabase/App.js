import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import "firebase/database";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC3Iua7GtHTvAaMKhM-D3MJxgABBTtBZ14",
  authDomain: "shoppinglist-1216d.firebaseapp.com",
  databaseURL: "https://shoppinglist-1216d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-1216d",
  storageBucket: "shoppinglist-1216d.appspot.com",
  messagingSenderId: "995858997718",
  appId: "1:995858997718:web:b9c99a22c57550fb0e4477",
  measurementId: "G-SJ5FP8DCWJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const saveItem = () => {
    firebase.database().ref('shoppingList/').push(
      {'product' : product, 'amount' : amount}
    );
    setProduct('')
    setAmount('')
  };

  useEffect(() => {
    firebase.database().ref('shoppingList/').on('value', snapshot => {
      const data = snapshot.val();
      const prod = Object.values(data)
      setShoppingList(prod);
    });
  }, []);

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
        <TextInput placeholder='Product' style={{ marginTop: 70, fontSize: 18, width: 200, borderColor: '#61133E', borderWidth: 1, backgroundColor: 'white'}}
        onChangeText={(product) => setProduct(product)}
        value={product}/> 
        <TextInput placeholder='Amount' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: '#61133E', borderWidth: 1, backgroundColor: 'white'}}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/> 
        <Button onPress={saveItem} title="Save" /> 
        <Text style={styles.header}>Shopping List</Text>
        <FlatList
          style={styles.flatlist}
          data={shoppingList} 
          renderItem={({item}) => (
            <View style={styles.listcontainer}>
              <Text style={{marginLeft: '5%', fontSize: 18}}>{item.product}, {item.amount}</Text>
            </View>)}
          ItemSeparatorComponent={listSeparator}
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E02C90',
    alignItems: 'center',
    justifyContent: 'center',
   },
   listcontainer: {
    flexDirection: 'row',
    alignItems: 'center'
   },
   flatlist: {
    width: 200,
    marginBottom: 20,
    backgroundColor: '#fff',
   },
   header: {
    marginTop: 30, 
    fontSize: 20,
    backgroundColor: '#E673B2',
    color: '#61133E',
    width: 200,
   }
});

