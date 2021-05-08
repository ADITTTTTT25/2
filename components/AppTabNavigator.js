import RequestScreen from '../screens/RequestScreen';
import HelpScreen from '../screens/HelpScreen';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppStackNavigator } from "./AppStackNavigator";
import React from "react";
import { Image } from "react-native";

export const AppTabNavigator = createBottomTabNavigator({
  HelpScreen: {
    screen: AppStackNavigator,
    navigationOptions: {
    //   tabBarIcon: (
        // <Image
        //   style={{ width: 20, height: 20 }}
        //   source={require("../Images/request-list.png")}
        // />
    //   ),
      tabBarLabel: "Help People",
    },
  },
  RequestScreen: {
    screen: RequestScreen,
    navigationOptions: {
    //   tabBarIcon: (
    //     <Image
    //       style={{ width: 20, height: 20 }}
    //       source={require("../Images/request-book.png")}
    //     />
    //   ),
      tabBarLabel: "Request Help",
    },
  },
});
