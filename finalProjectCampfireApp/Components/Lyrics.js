import React, { useState } from "react";
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, ListItem, Button, Input, useStyleSheet, StyleService} from '@ui-kitten/components';


const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const MusicOutline = (props) => (
  <Icon name='music-outline' {...props} />
);

export const LyricsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState({ songs: [] });
  const [artist, setArtist] = useState("");

  const styles = useStyleSheet(themedStyles);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const url = "https://api.lyrics.ovh/v1/" + artist + "/" + title;

  const getLyrics = () => {
    //const resolveCors = "https://thingproxy.freeboard.io/fetch/";
    //const request = new XMLHttpRequest();
    //const newUrl = request.open + url;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLyrics({ songs: [json.lyrics] });
        setArtist();
        setTitle();
        console.log(lyrics);
      })
      .then()
      .catch((error) => alert(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title='Lyrics' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={styles.layout1}>
        <Layout style={styles.layout2}>
          <Input
            style={{margin: 2}}
            value={title}
            placeholder="Search Song"
            onChangeText={(title) => setTitle(title)}
          />
          <Input
            style={{margin: 2}}
            value={artist}
            placeholder="Search Artist"
            onChangeText={(artist) => setArtist(artist)}
          />
        </Layout>
        <Button style={styles.button} size='small' accessoryLeft={MusicOutline} onPress={getLyrics}>GET LYRICS</Button>
        <List
          data={lyrics.songs}
          keyExtractor={(song, index) => index}
          renderItem={({ item }) => (
            <ListItem>
              <Text>{item}</Text>
            </ListItem>
          )}
        />
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1, 
  },
  layout1: {
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
