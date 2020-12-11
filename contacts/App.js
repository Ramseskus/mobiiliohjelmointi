import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState({});

  const getContacts = async () => {
    const {status} = await Contacts.requestPermissionsAsync();
    if (status === 'granted' ) {
      const {data} = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      }); 
      if (data.length > 0) {
        setContacts(data);
      } 
    } console.log(contacts);
  }

  return (
    <View style={styles.container}>
      <Button title='Get Contacts' onPress={getContacts}/>
      <FlatList 
        style={styles.flatlist} 
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <View style={styles.listcontainer}><Text>Name: {item.name} </Text>
        <Text>Mobile: {item.phoneNumbers[0].number}</Text>
        </View>}></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  flatlist: {
    backgroundColor : '#e3e3e3',
    height: 100,
    width: 200,
    marginBottom: 20,
    marginTop: 10,
   },
   listcontainer: {
    flexDirection: 'column',
   },
});
