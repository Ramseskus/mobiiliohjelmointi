import React from 'react';
import { SafeAreaView, StyleSheet, Image, ImageBackground, View} from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, useStyleSheet, StyleService, Card, Avatar, Text } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {

    const navigateLyrics = () => {
      navigation.navigate('Lyrics');
    };

    const navigateTabs = () => {
      navigation.navigate('Tabs');
    };

    const styles = useStyleSheet(themedStyles);

    const header = () => (
    <ImageBackground 
      source={require('../assets/campfire.jpg')} 
      style={styles.image}>
        <View style={styles.overlay}>
          <View>
            <Text style={{marginTop: 70, textAlign: 'center', fontSize: 40, fontWeight: 'bold'}} status='danger' category='h1'>CAMPFIRE</Text>
          </View>
          <View style={styles.navigation}>
            <Button status='danger' style={styles.button} onPress={navigateLyrics}>SEARCH LYRICS</Button>
            <Button status='danger' style={styles.button} onPress={navigateTabs}>SEARCH TABS</Button>
          </View>
				</View>
    </ImageBackground>
    )

    return (
      <SafeAreaView style={{flex: 1, margin: 0}}>
        <TopNavigation title='MyApp' alignment='center'/>
        <Divider/>
          <Layout style={styles.container}>
            <Layout style={styles.layout}>
              <Avatar style={styles.avatar} source={require('../assets/campfire_002.jpg')}></Avatar>
              <Text style={styles.text} category='h5'>Campfire</Text>
            </Layout>
          <Card header={header} style={{height: '90%'}}>
          </Card>
          </Layout>
      </SafeAreaView>
    );
  };

  const themedStyles = StyleService.create({
    container: {
      flex: 1, 
      paddingHorizontal: 8,
      margin: 0,
    },
    layout: {
      flexDirection: 'row',
    },
    button: {
      margin: 10,
    },
    image: {
      ...StyleSheet.absoluteFill,
      height: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    text: {
      margin: 5,
    },
    avatar: {
      margin: 5,
    },
    navigation: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 270,
    }
  });
  