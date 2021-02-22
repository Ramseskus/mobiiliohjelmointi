import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon} from '@ui-kitten/components';
import { HomeScreen } from './Home';
import { LyricsScreen } from './Lyrics';
import { TabsScreen } from './Tabs';
import { RecordScreen } from './Record';

const { Navigator, Screen } = createBottomTabNavigator();

const MusicOutline = (props) => (
  <Icon name='music-outline' {...props} />
);

const HomeOutline = (props) => (
  <Icon name='home-outline' {...props} />
);

const BookOutline = (props) => (
  <Icon name='book-open-outline' {...props} />
);

const MicOutline = (props) => (
  <Icon name='mic-outline' {...props} />
);

const TabNavigator = () => (
  <Navigator headerMode='none' tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Lyrics' component={LyricsScreen}/>
    <Screen name='Tabs' component={TabsScreen}/>
    <Screen name='Record' component={RecordScreen}/>
  </Navigator>
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='HOME' icon={HomeOutline}/>
      <BottomNavigationTab title='LYRICS' icon={BookOutline}/>
      <BottomNavigationTab title='TABS' icon={MusicOutline}/>
      <BottomNavigationTab title='RECORD' icon={MicOutline}/>
    </BottomNavigation>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);

