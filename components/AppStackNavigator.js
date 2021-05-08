import { createStackNavigator } from "react-navigation-stack";
import HelpScreen from "../screens/HelpScreen";
import ReceiverDetails from "../screens/ReceiverDetails";
export const AppStackNavigator = createStackNavigator(
  {
    HelpScreenList: {
      screen: HelpScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReceiverDetails: {
      screen: ReceiverDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "HelpScreenList",
  }
);
