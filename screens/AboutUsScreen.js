import React from "react";
import { View, Image } from "react-native";
import { Header, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import * as ScreenOrientation from 'expo-screen-orientation';
export default class AboutUsScreen extends React.Component {
  componentDidMount=()=>{
  }
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
            text: "About Us",
            style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
          }}
          backgroundColor="#EaF8fE"
        />
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/About_us.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
    );
  }
}
