import React from "react"
import { createDrawerNavigator } from "react-navigation-drawer";
import CustomSidebarMenu from "./CustomSidebarMenu";
import { AppTabNavigator } from "./AppTabNavigator";
import { Icon } from "react-native-elements";
import NotificationScreen from "../screens/NotificationScreen";
import SettingsScreen from "../screens/SettingsScreen"
import DashboardScreen from "../screens/DashboardScreen"
import VideoScreen from "../screens/VideoScreen"
import AboutUsScreen from "../screens/AboutUsScreen"
export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="fontawesome5" />,
      },
    },
    NotificationScreen:{
      screen:NotificationScreen,
      navigationOptions:{
        drawerIcon:<Icon name="bell" type="font-awesome"/>,
        drawerLabel:"Notifications"
      }, 
    }, 
    SettingsScreen : {
      screen : SettingsScreen,
      navigationOptions:{
        drawerIcon : <Icon name="settings" type ="fontawesome5" />,
        drawerLabel : "Settings"
      }
    },
    DashboardScreen : {
      screen : DashboardScreen,
      navigationOptions:{
        drawerIcon : <Icon name="dashboard" type ="fontawesome5" />,
        drawerLabel : "Dashboard"
      }
    },
   VideoScreen : {
      screen : VideoScreen,
      navigationOptions:{
        drawerIcon : <Icon name="play" type ="antdesign" />,
        drawerLabel : "Help video"
      }
    },
   AboutUsScreen:{
     screen:AboutUsScreen,
     navigationOptions:{
       drawerIcon:<Icon name="user-circle" type="font-awesome"/>,
       drawerLabel:"About Us"
     }
   }
  },
  { contentComponent: CustomSidebarMenu },
  { initialRouteName: "Home" }
);
