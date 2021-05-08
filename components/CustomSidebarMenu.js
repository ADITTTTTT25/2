import React from "react";
import firebase from "firebase";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { RFValue } from "react-native-responsive-fontsize";
import db from "../config";
export default class CustomSidebarMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      image: "#",
      name: "",
      docId: "",
    };
  }
  getUserDetails = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            name: doc.data().name + " " + doc.data().last_name,
            docId: doc.id,
          });
        });
      });
  };
  selectPicture = async () => {
    // const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
    //   // mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: false,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    return null;
    // if (!cancelled) {
    //   this.uploadImage(uri, this.state.userId);
    // }
  };

  // uploadImage = async (uri, imageName) => {
  //   var response = await fetch(uri);
  //   var blob = await response.blob();

  //   var ref = firebase
  //     .storage()
  //     .ref()
  //     .child("user_profile/" + imageName);

  //   return ref.put(blob).then((response) => {
  //     this.fetchImage(imageName);
  //   });
  // };

  fetchImage = (imageName) => {
    var ref = firebase
      .storage()
      .ref()
      .child("user_profile/" + imageName);

    ref
      .getDownloadURL()
      .then((url) => {
        this.setState({
          image: url,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          image: "#",
        });
      });
  };
  componentDidMount() {
    this.getUserDetails();
    this.fetchImage(this.state.userId);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.3,
            alignItems: "center",
            backgroundColor: "#32867d",
            justifyContent: "center",
          }}
        >
          <Avatar
            rounded
            source={{ uri: this.state.image }}
            onPress={() => {
              this.selectPicture();
            }}
            size="xlarge"
          />
          <Text
            style={{
              fontWeight: "300",
              fontSize: RFValue(20),
              paddingTop: RFValue(10),
              color: "#fffff",
            }}
          >
            {this.state.name}
          </Text>
        </View>

        <View style={{ flex: 0.6 }}>
          <DrawerItems {...this.props} />
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", width: "100%", height: "100%" }}
            onPress={() => {
              firebase.auth().signOut();
              this.props.navigation.navigate("SignUpLoginScreen");
            }}
          >
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />
            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "bold",
                marginLeft: RFValue(30),
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer: {
    flex: 0.5,
  },
  imageContainer: {
    flex: 0.75,
    width: "40%",
    height: "20%",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    padding: 30,
  },
  logOutButton: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    padding: 5,
  },
  logOutText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
