import React, { useState } from "react";
import Webview from "react-native-webview";
import { SafeAreaView } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Input,
  StyleService,
  useStyleSheet,
  Avatar,
} from "@ui-kitten/components";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const SearchOutline = (props) => <Icon name="search-outline" {...props} />;

export const TabsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [html, setHtml] = useState("");
  const [search, setSearch] = useState(false);

  const styles = useStyleSheet(themedStyles);

  const AvatarLogo = () => (
    <Avatar
      style={styles.avatar}
      source={require("../assets/campfire_002.jpg")}
    ></Avatar>
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const injectedJS = `document.getElementById("controls").style.display="none";document.getElementsByTagName("head").style.visibility = 'hidden';document.getElementById('google').style.visibility = 'hidden';document.getElementById("text-showroom").style.display="none";document.getElementsByName("google-signin-client_id").style.display="none";document.getElementsByName("google").style.display="none";true;`;

  const launchSite = () => {
    setHtml(
      "http://www.songsterr.com/a/wa/bestMatchForQueryString?s=" +
        title +
        "&a=" +
        artist
    );
    setSearch(true);
  };

  const hideText = () => {
    setSearch(false);
    setArtist("");
    setTitle("");
    setHtml("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        style={{ marginTop: 20 }}
        title="Tabs"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={AvatarLogo}
      />
      <Divider style={{marginBottom: 20}} />
      <Layout style={styles.layout1}>
        <Layout style={styles.layout2}>
          <Input
            size="small"
            style={{ margin: 2 }}
            value={title}
            placeholder="Search Song"
            onChangeText={(title) => setTitle(title)}
            autoCorrect={false}
            autoFocus
          />
          <Input
            size="small"
            style={{ margin: 2 }}
            value={artist}
            placeholder="Search Artist"
            onChangeText={(artist) => setArtist(artist)}
            autoCorrect={false}
          />
          <Button
            style={styles.button}
            size="tiny"
            accessoryLeft={SearchOutline}
            onPress={search ? hideText : launchSite}
          >
            {search ? "CLEAR" : "TABS"}
          </Button>
        </Layout>
        <Layout>
          <Webview
            style={styles.webview}
            startInLoadingState={true}
            scalesPageToFit={true}
            injectedJavaScript={injectedJS}
            source={{ uri: html }}
          ></Webview>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "color-basic-100",
  },
  webview: {
    width: 370,
    height: 380,
    backgroundColor: "#FAFEF8",
    marginBottom: 60,
  },
  layout1: {
    justifyContent: "center",
    alignItems: "center",
  },
  layout2: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 2,
  },
  avatar: {
    marginTop: 10,
    marginRight: 5,
  },
});
