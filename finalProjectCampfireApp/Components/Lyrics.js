import React, { useState, useRef } from "react";
import { SafeAreaView} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, ListItem, Button, Input, useStyleSheet, StyleService, Avatar} from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const SearchOutline = (props) => (
  <Icon name='search-outline' {...props} />
);

export const LyricsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState({ songs: [] });
  const [artist, setArtist] = useState("");
  const [search, setSearch] = useState(false);
  const scrollRef = useRef();

  const styles = useStyleSheet(themedStyles);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const AvatarLogo = () => (
    <Avatar style={styles.avatar} source={require('../assets/campfire_002.jpg')}></Avatar>
  )

  const url = "https://api.lyrics.ovh/v1/" + artist + "/" + title;

  const getLyrics = () => {
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
        setArtist(artist);
        setTitle(title);
        console.log(lyrics);
        setSearch(true);
      })
      .then()
      .catch((error) => alert(error));
  };

  const hideText = () => {
    setSearch(false);
    setArtist('');
    setTitle('');
    setLyrics('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation style={{marginTop: 20}} title='Lyrics' alignment='center' accessoryLeft={BackAction} accessoryRight={AvatarLogo}/>
      <Divider/>
      <Layout style={styles.layout1}>
        <Layout style={styles.layout2}>
          <Input
          autoCapitalize='characters'
            size='small'
            style={styles.input}
            value={title}
            placeholder="Search Song"
            onChangeText={(title) => setTitle(title)}
            autoCorrect={false}
            autoFocus
          />
          <Input
            autoCapitalize='characters'
            size='small'
            style={styles.input}
            value={artist}
            placeholder="Search Artist"
            onChangeText={(artist) => setArtist(artist)}
            autoCorrect={false}
          />
          </Layout>
        <Button style={styles.button} size='small' accessoryLeft={SearchOutline} onPress={search ? hideText : getLyrics}>{search ? 'CLEAR' : 'LYRICS'}</Button>
        <List
          ref={scrollRef}
          data={lyrics.songs}
          keyExtractor={(song, index) => song}
          renderItem={({ item }) => (
            <ListItem style={{flexDirection: "column"}}>
              <Text status='primary' category='h6'>{artist}: {title}</Text>
              <Text style={{marginTop: 15, marginBottom:10, textAlign: 'center'}}>{item}</Text>
              <Button style={styles.button} status='info' appearance='outline' disabled={!search} onPress={() => scrollRef.current.scrollToIndex({index: 0})}>Back to top</Button>
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
    backgroundColor: "color-basic-100",
    height: '100%',
    width: '100%',
  },
  layout1: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 150,
  },
  layout2: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  button: {
    margin: 2,
    marginBottom: 10,
  },
  avatar: {
    marginTop: 10,
    marginRight: 5,
  },
  input: {
    margin: 2, 
    width: '45%',
  }
});
