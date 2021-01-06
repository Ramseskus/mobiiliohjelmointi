import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Header, Icon, ListItem } from'react-native-elements';

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
      tx.executeSql('insert into list (amounts, product) values (?, ?);', [amount, product]);
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

  
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff'} }}
      ></Header>
        <Input placeholder='Product' style={{ marginTop: 30, fontSize: 18, width: 200}}
        onChangeText={(product) => setProduct(product)}
        value={product}/> 
        <Input placeholder='Amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200}}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/> 
        <Button raised icon={{name: 'shopping-cart'}} onPress={saveItem} title="Add" /> 
        <Text style={styles.header}>Shopping Cart</Text>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ListItem bottomDivider style={{width: '100%'}}>
                <ListItem.Title>{item.product}</ListItem.Title>
                <ListItem.Subtitle>{item.amounts}</ListItem.Subtitle>
                <View style={{alignContent: 'flex-end'}}>
                  <Icon type="feather" color='#0080ff' name="check-square" onPress={() => deleteItem(item.id)} />
                </View>
            </ListItem>
          )}
          data={shoppingList} 
        />
    </View>
    
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd9ff',
    alignItems: 'center',
    justifyContent: 'center',
   },
   header: {
    marginTop: 30, 
    marginBottom: 10,
    fontSize: 20,
    color: '#0080ff',
    width: 200,
    textAlign: 'center',
   }
});

