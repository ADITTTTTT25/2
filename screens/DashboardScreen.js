import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  FlatList,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config";
import { RFValue } from "react-native-responsive-fontsize";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar, Icon } from "react-native-elements";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as ImagePicker from "expo-image-picker";
export default class DashboardScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      feedback: "",
      tree_rating: 0,
      tree_ratingAvg: 0,
      allFeedbacks: [],
      count: false,
      image: "#",
      name: "",
      sent_by: "",
      Feedbackname: "",
      feedbackSum: 0,
      userId: firebase.auth().currentUser.email,
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
            feedbackSum: doc.data().feedbackSum,
          });
        });
      });
  };

  getFeedbacksAndCount = () => {
    this.requestRef = db
      .collection("feedback")
      .where("sent_to", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allFeedbacks = [];
        snapshot.docs.map((doc) => {
          var feedback = doc.data();
          feedback["doc_id"] = doc.id;
          this.setState({
            sent_by: doc.data().sent_by,
          });
          db.collection("users")
            .where("email", "==", doc.data().sent_by)
            .onSnapshot((snapshot) => {
              snapshot.docs.map((doc) => {
                this.setState({
                  Feedbackname: doc.data().name + " " + doc.data().last_name,
                });
              });
            });
          allFeedbacks.push(feedback);
        });

        this.setState({
          allFeedbacks: allFeedbacks,
        });
        if (this.state.allFeedbacks.length === 1) {
          this.setState({
            count: false,
          });
        } else {
          this.setState({
            count: true,
          });
        }
      });
  };

  getFeedbacks = async () => {
    await db
      .collection("feedback")
      .where("sent_to", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            feedback: doc.data().feedback,
            tree_rating: doc.data().tree_rating,
          });
        });
      });
  };
  selectPicture = async () => {
    return null;
  };

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

  componentDidMount = () => {
    this.getFeedbacks();
    this.getUserDetails();
    this.fetchImage(this.state.userId);
    this.getFeedbacksAndCount();
  };
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <View style={{ borderWidth: RFValue(0.5) }}>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>{item.feedbackName}</ListItem.Title>
            <View style={styles.subtitleView}>
              <ListItem.Subtitle>{item.feedback}</ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Dashboard" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              // backgroundColor: "#32867d",
              marginTop: RFValue(10),
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
                color: "black",
              }}
            >
              {this.state.name}
            </Text>
            <Text
              style={{
                fontWeight: "300",
                fontSize: RFValue(20),
                paddingTop: RFValue(20),
                color: "black",
              }}
            >
              You have collected {this.state.feedbackSum}{" "}
              {
                <Image
                  source={require("../assets/Christmas_tree.png")}
                  style={{
                    width: RFValue(20),
                    height: RFValue(40),
                    marginTop: RFValue(-30),
                  }}
                />
              }
            </Text>

            <Text
              style={{
                fontWeight: "300",
                fontSize: RFValue(20),
                paddingTop: RFValue(20),
                color: "black",
              }}
            >
              Avg Rating:{" "}
              {this.state.feedbackSum / this.state.allFeedbacks.length} out of 5{" "}
              {
                <Image
                  source={require("../assets/Christmas_tree.png")}
                  style={{
                    width: RFValue(20),
                    height: RFValue(40),
                    marginTop: RFValue(-30),
                  }}
                />
              }
            </Text>
            <Text
              style={{
                fontWeight: "300",
                fontSize: RFValue(20),
                paddingTop: RFValue(20),
                color: "black",
              }}
            >
              {this.state.count ? (
                <Text>
                  You have helped {this.state.allFeedbacks.length} people!
                </Text>
              ) : (
                <Text>
                  You have helped {this.state.allFeedbacks.length} person
                </Text>
              )}
            </Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View
              style={{
                width: "80%",
                height: RFValue(30),
                justifyContent: "center",
                alignItems: "center",
                // borderRadius: RFValue(20),
                backgroundColor: "#32867d",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                elevation: 16,
                marginTop: RFValue(20),
              }}
            >
              <Text style={{ color: "white", fontSize: RFValue(20) }}>
                Recent Feedback
              </Text>
            </View>
          </View>

          <View style={styles.view}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allFeedbacks}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  drawerItemsContainer: {},
  imageContainer: {
    width: "40%",
    height: "20%",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
  logOutContainer: {
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
  subContainer: {
    fontSize: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  button: {
    width: 100,
    height: 30,
    // alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  subtitleView: {
    flexDirection: "row",
    padding: RFValue(2),
  },
  view: {
    backgroundColor: "#fff",
    flex: 1,
    padding: RFValue(10),
  },
  LiTitle: { color: "black", fontWeight: "bold" },
});
