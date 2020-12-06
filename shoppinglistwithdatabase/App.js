import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (id integer primary key not null, amounts int, product text);');
    });
    updateList();
  }, []);

  //Save item
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into list (amounts, product) values (?, ?);', [parseInt(amount), product]);
    }, null, updateList
    )
    setAmount('')
    setProduct('')
  }

  //update list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from list;', [], (_, { rows }) =>
        setShoppingList(rows._array)
      ); 
    });
  }

  // Delete item
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from list where id = ?;`, [id]);
      }, null, updateList
    )    
  }

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
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <View style={styles.listcontainer}><Text style={{marginLeft: '5%', fontSize: 18}}>{item.product}, {item.amounts}</Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> Bought</Text></View>}
          data={shoppingList} 
          ItemSeparatorComponent={listSeparator} 
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
    backgroundColor: '#fff',
    alignItems: 'center'
   },
   flatlist: {
    backgroundColor : '#fff',
    width: 200,
    marginBottom: 20,
   },
   header: {
    marginTop: 30, 
    fontSize: 20,
    backgroundColor: '#E673B2',
    color: '#61133E',
    width: 200,
   }
});

