import React from 'react';
import { SafeAreaView, StyleSheet, Image, ImageBackground, View} from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, useStyleSheet, StyleService, Card, Text } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {

    const navigateLyrics = () => {
      navigation.navigate('Lyrics');
    };

    const navigateTabs = () => {
      navigation.navigate('Tabs');
    };

    const navigateRecord = () => {
      navigation.navigate('Record');
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
            <Button status='danger' style={styles.button} onPress={navigateRecord}>RECORD</Button>
          </View>
				</View>
    </ImageBackground>
    )

    return (
      <SafeAreaView style={{flex: 1, margin: 0}}>
          <Layout style={styles.container}>
          <Card header={header} style={{height: '100%', padding: 0,}}>
          </Card>
          </Layout>
      </SafeAreaView>
    );
  };

  const themedStyles = StyleService.create({
    container: {
      flex: 1, 
      margin: 0,
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
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    text: {
      margin: 5,
    },
    navigation: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 150,
    }
  });
  