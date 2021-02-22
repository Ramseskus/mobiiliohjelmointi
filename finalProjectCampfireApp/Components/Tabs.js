import React, { useState } from "react";
import Webview from "react-native-webview";
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button, Input, StyleService, useStyleSheet} from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const MusicOutline = (props) => (
  <Icon name='music-outline' {...props} />
);

export const TabsScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [songId, setSongId] = useState([]);
    const [tabType, setTabType] = useState("");
    const [results, setResults] = useState([]);
    const [html, setHtml] = useState('');

    const styles = useStyleSheet(themedStyles);

    const navigateBack = () => {
      navigation.goBack();
    };

    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    const injectedJS = `document.getElementById("controls").style.display="none";document.getElementsByTagName("head").style.visibility = 'hidden';document.getElementById('google').style.visibility = 'hidden';document.getElementById("text-showroom").style.display="none";document.getElementsByName("google-signin-client_id").style.display="none";document.getElementsByName("google").style.display="none";true;`;

    const launchSite = () => {
        setHtml('http://www.songsterr.com/a/wa/bestMatchForQueryString?s=' + title + '&a=' + artist);
      }

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title='Tabs' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={styles.layout1}>
        <Layout style={styles.layout2}>
          <Input
            style={{margin: 2}}
            value={title}
            placeholder="Search title"
            onChangeText={(title) => setTitle(title)}
          /> 
          <Input
            style={{margin: 2}}
            value={artist}
            placeholder="Search Artist"
            onChangeText={(artist) => setArtist(artist)}
          />  
        </Layout>
        <Button style={styles.button} size='small' accessoryLeft={MusicOutline} onPress={launchSite}>GET TABS</Button> 
        <Layout>
          <Webview
              style={styles.webview}
              startInLoadingState={true}
              scalesPageToFit={true}
              injectedJavaScript={injectedJS}
              source={{uri: html }}
            ></Webview>
        </Layout>
      </Layout>
    </SafeAreaView>
  );

};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  webview: {
    height: 500,
    width: 400,
  },
  layout1: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  layout2: {
    flexDirection: 'row',
    marginTop: 100,
  },
  button: {
    margin: 2,
  },
});
