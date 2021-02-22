import React, { useState } from "react";
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, ListItem, Button, Input, useStyleSheet, StyleService} from '@ui-kitten/components';
import { Audio } from 'expo-av';

//const db = SQLite.openDatabase('audiolistdb.db');

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const MicOutline = (props) => (
  <Icon name='mic-outline' {...props} />
);

const StopOutline = (props) => (
    <Icon name='stop-circle-outline' {...props} />
  );


export const RecordScreen = ({ navigation }) => {
    const [recording, setRecording] = useState();
    const [title, setTitle] = useState('');
    const [uri, setUri] = useState('');
    const [doneRecording, setDoneRecording] = useState(false);
    //const [sound, setSound] = React.useState();
    //const [audioList, setAudioList] = useState([]); USE SQL DATABASE FOR THIS!!

    /*SAVING SYSTEM HERE
    
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (id integer primary key not null, uri text, title text);');
    });
    updateList();
  }, []);

  //Save item
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into list (uri, title) values (?, ?);', [uri, title]);
    }, null, updateList
    )
    setUri('')
    setTitle('')
  }

  //update list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from list;', [], (_, { rows }) =>
        setAudioList(rows._array)
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

    */

  const styles = useStyleSheet(themedStyles);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      //setUri(null);
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    setRecording(null);
    setDoneRecording(true);
    setUri(uri);
  }

  const onSubmit = () => {
    if (title && uri) {
        const audioItem = {
            id: 0,
            title: title,
            audioUrl: uri,
        };
        //saveItem(audioItem);
        setTitle('');
        setDoneRecording(false);
    }
  }

/*   async function playRecording() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./audioList')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
  }
  
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]); */


  const RecordAudioView = () => {
       if(recording) {
            return(
            <Layout style={styles.inputContainer}>
                <Layout>
                <Text status='primary'>Recording Audio...</Text>
                </Layout>
                <Button
                status='primary'
                onPress={stopRecording}
                accessoryLeft={StopOutline} 
                >STOP</Button>
            </Layout>
            )
    } else if(doneRecording == true) {
        return(
            <Layout style={styles.layout1}>
            <Layout style={styles.layout2}>
              <Input
                style={{margin: 2}}
                value={title}
                placeholder="Audio Name"
                onChangeText={(title) => setTitle(title)}
                onSubmitEditing={onSubmit}
              />
            <Button
                style={styles.button}
                size='small'
                onPress={onSubmit}
                disabled={!title}
              >SAVE</Button>
            </Layout> 
          </Layout>
        )
    } else {
        return (
            <Text>Tähän tulee tallennetut lista</Text>
/*             <List
            data={audioList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem>
                <Text>{audioItem}</Text>
                <Button onPress={playRecording}>PLAY</Button>
                <Button onPress={deleteItem}>DELETE</Button>
              </ListItem>
            )}
          />  */
        )
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title='Record' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={styles.layout}>
      <Button style={styles.button} size='small' status='info' accessoryLeft={MicOutline} onPress={recording ? stopRecording : startRecording}>{recording ? 'Recording' : 'Start Recording'}</Button>
        <RecordAudioView/>
      </Layout>
    </SafeAreaView>
  );
};


const themedStyles = StyleService.create({
  container: {
    flex: 1, 
  },
  layout: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  layout2: {
    flexDirection: 'row',
  },
  button: {
    margin: 2,
  },
});
