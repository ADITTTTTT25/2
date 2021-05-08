import React from "react";
import { View } from "react-native";
import { Header, Icon } from "react-native-elements";
import * as ScreenOrientation from 'expo-screen-orientation';
import { RFValue } from "react-native-responsive-fontsize";
import YoutubePlayer from "react-native-youtube-iframe";
export default class VideoScreen extends React.Component {
  ComponentDidMount = () => {
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={
            <Icon
              name="bars"
              type="font-awesome"
              color="#696969"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: "Tutorial",
            style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
          }}
          backgroundColor="#EaF8fE"
        />
        <View style={{ flex: 1 }}>
          <YoutubePlayer
            height={RFValue(400)}
            play={true}
            videoId={"B7VLD_j38Lw"}
          />
        </View>
      </View>
    );
  }
}
