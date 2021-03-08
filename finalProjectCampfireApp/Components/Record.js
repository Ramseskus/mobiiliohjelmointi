import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, ListItem, Button, Input, useStyleSheet, StyleService, Avatar} from '@ui-kitten/components';
import { Audio } from 'expo-av';
import * as SQLite from 'expo-sqlite'; 
import moment from 'moment';

const db = SQLite.openDatabase('audiolist.db');

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const MicOutline = (props) => (
  <Icon name='mic-outline' {...props} />
);

const StopOutline = (props) => (
    <Icon name='stop-circle-outline' {...props} />
  );

  const DeleteOutline = (props) => (
    <Icon name='trash-2-outline' {...props} />
  );

export const RecordScreen = ({ navigation }) => {
    const [recording, setRecording] = useState();
    const [title, setTitle] = useState('');
    const [uri, setUri] = useState('');
    const [doneRecording, setDoneRecording] = useState(false);
    const [sound, setSound] = useState();
    const [audioList, setAudioList] = useState([]);
    const [isPlaying, setIsPlaying] = useState(-1);
    const [recordingDate, setRecordingDate] = useState(moment().format('YYYY-MM-DD, h:mm:ss a'));

    const styles = useStyleSheet(themedStyles);

    const AvatarLogo = () => (
      <Avatar style={styles.avatar} source={require('../assets/campfire_002.jpg')}></Avatar>
    )
    
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (id integer primary key not null, uri text, title text, recordingDate text);');
    });
    updateList();
  }, []);

  //Save item
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into list (uri, title, recordingDate) values (?, ?, ?);', [uri, title, recordingDate]);
    }, null, updateList
    )
    setUri('')
    setTitle('')
    setRecordingDate('')
    setDoneRecording(false);
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
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
      const newDate = moment().format('YYYY-MM-DD, h:mm:ss');
      setRecordingDate(newDate);
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
    setDoneRecording(true);
    setUri(uri);
  }

    async function playRecording(audioIndex) {
    try {
      console.log('Loading Sound');
      const audioRecording = audioList[audioIndex -1];
      const { sound } = await Audio.Sound.createAsync(
        {uri: audioRecording.uri},
        { shouldPlay: true }
      );
      console.log('Playing Sound', audioIndex);
      await sound.playAsync(); 
      setIsPlaying(audioIndex);
      sound.title = audioRecording.title;
      setSound(sound);
    } catch (error) {
      console.error('sound is not playing', error);
    }
  }
  
   useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound', sound.title);
          sound.unloadAsync(); }
      : undefined;
  }, [sound]); 

  async function stopPlaying() {
    console.log('stop playing', sound.title);
    setIsPlaying(-1);
    await sound.pauseAsync();
  }

  const listSeparator = () => {
    return (
      <Layout
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "color-primary-700",
        }}
      />
    );
  };

  const RecordAudioView = () => {
       if(recording) {
            return(
            <Layout style={styles.inputContainer}>
                <Layout>
                <Text style={{marginTop: 10}} appearance='hint'>Recording Audio...</Text>
                </Layout>
                <Button
                style={{marginTop: 15, marginBottom: 50}}
                status='primary'
                size='small'
                appearance='outline'
                onPress={stopRecording}
                accessoryLeft={StopOutline} 
                >STOP</Button>
            </Layout>
            )
    } else if(doneRecording == true) {
        return(
            <Layout style={styles.layout2}>
              <Input
                style={{marginTop: 10}}
                value={title}
                placeholder="Audio Name"
                onChangeText={(title) => setTitle(title)}
                onSubmitEditing={saveItem}
                autoCorrect={false}
                returnKeyType="done"
                autoFocus
              />
            <Button
                style={styles.button}
                size='small'
                onPress={saveItem}
                disabled={!title}
              >SAVE</Button>
            </Layout> 
        )
    } else {
      return (
        <List
          data={audioList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem>
              <Layout style={{width: '60%'}}>
                <Text status='basic' style={styles.text}>{item.title}</Text>
                <Text status='info'>{item.recordingDate}</Text>
              </Layout>
              <Button size='small' style={styles.button} onPress={isPlaying == item.id ? stopPlaying : () => playRecording(item.id)}>{isPlaying == item.id ? 'STOP' : 'PLAY'}</Button>
              <Button accessoryLeft={DeleteOutline} appearance='ghost' onPress={() => deleteItem(item.id)}></Button>
            </ListItem>
          )}
          ItemSeparatorComponent={listSeparator} 
        /> 
      )
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation style={{marginTop: 20}} title='Record' alignment='center' accessoryLeft={BackAction} accessoryRight={AvatarLogo}/>
      <Divider/>
      <Layout style={styles.layout}>
      <Button style={{marginTop: 5}} status='info' accessoryLeft={MicOutline} onPress={recording ? stopRecording : startRecording}>{recording ? 'RECORDING' : 'START RECORDING'}</Button>
        <RecordAudioView/>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1, 
    margin: 0,
    backgroundColor: "color-basic-100",
  },
  layout: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  layout2: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 18,
  },
  avatar: {
    marginTop: 10,
    marginRight: 5,
  },
  inputContainer: {
    marginBottom: 10,
  }
});
