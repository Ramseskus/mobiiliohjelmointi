import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Header, Icon, ListItem } from'react-native-elements';

const db = SQLite.openDatabase('myplaces.db');

function Finder({route, navigation }) {
  const [address, setAddress] = useState('');
  const [placesList, setPlacesList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (id integer primary key not null, address text);');
    });
    updateList();
  }, []);

  //Save item
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into list (address) values (?);', [address]);
    }, null, updateList
    )
    setAddress('')
  }

  //update list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from list;', [], (_, { rows }) =>
        setPlacesList(rows._array)
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
        <Input placeholder='Type in address' label="PLACEFINDER" style={{ marginTop: 10, fontSize: 18, width: 200, padding: 10}}
        onChangeText={(address) => setAddress(address)}
        value={address}/> 
        <View style={{width: '50%'}}>
          <Button buttonStyle={{backgroundColor: '#561C70'}} icon={{name: 'save', color: 'white'}} onPress={saveItem} title="SAVE"></Button>
        </View>
        <FlatList  style={styles.flatlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ListItem bottomDivider style={{width: '100%'}}>
                <ListItem.Title style={{width: '60%'}}>{item.address}</ListItem.Title>
                <View style={{alignContent: 'flex-end'}}>
                  <Button titleStyle={{color:'lightgray'}} type='clear' title="show on map" icon={{name: 'chevron-right', color:'lightgray'}} iconRight={true}  onPress={() => navigation.navigate('LOCATION', {itemId: item.id, title: item.address})} onLongPress={() => deleteItem(item.id)}></Button>
                </View>
            </ListItem>
          )}
          data={placesList} 
        />
    </View>
    
  );
}

export default Finder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   },
   flatlist: {
    marginTop: 30, 
    marginBottom: 10,
   },
});

