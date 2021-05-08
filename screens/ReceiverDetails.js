import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { Card, Header, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import * as ScreenOrientation from 'expo-screen-orientation';
export default class ReceiverDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      receiverId: this.props.navigation.getParam("details")["user_id"],
      requestId: this.props.navigation.getParam("details")["request_id"],
      requestName: this.props.navigation.getParam("details")["request_name"],
      description: this.props.navigation.getParam("details")["description"],
      requestStatus: this.props.navigation.getParam("details")[
        "request_status"
      ],
      receiver: "",
      receiverLastName: "",
      receiverName: "",
      receiverContact: "",
      receiverAddress: "",
      location: this.props.navigation.getParam("details")["request_location"],
      requestBetween: this.props.navigation.getParam("details")[
        "request_between"
      ],
      date: this.props.navigation.getParam("details")["request_time_and_date"],
      userName: "",
      userAddress: "",
      isHelpActive: false,
      isHelping: "",
      userContact: "",
      userDocId: "",
      docId:''
    };
  }
  addNotification = () => {
    var message =
      this.state.userName +
      " Has shown interest in helping." +
      " This is their contact: " +
      this.state.userContact;
    db.collection("all_notification").add({
      targeted_user_id: this.state.receiverId,
      donor_id: this.state.userId,
      request_id: this.state.requestId,
      request_name: this.state.requestName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: "unread",
      message: message,
    });
    var message2 =
      "Thank you for your help." +
      "Please contact the person in need." +
      "Notification is also sent to authority for security purposes." +
      "Person in need also has your contact details." +
      "Name and number: " +
      this.state.receiverName +
      " " +
      this.state.receiverContact;
    db.collection("all_notification").add({
      targeted_user_id: this.state.userId,
      request_id: this.state.requestId,
      request_name: this.state.requestName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: "unread",
      message: message2,
    });
  };

  sendEmail = () => {
    db.collection("approvedRequests").add({
      seekerId: this.state.receiverId,
      seekerName: this.state.receiverName + " " + this.state.receiverLastName,
      seekerContact: this.state.receiverContact,
      seekerAddress: this.state.receiverAddress,
      helperId: this.state.userId,
      helperName: this.state.userName,
      helperContact: this.state.userContact,
      helperAddress: this.state.userAddress,
      requestId: this.state.requestId,
      requestName: this.state.requestName,
    });
  };
  getUserDetails = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().name + " " + doc.data().last_name,
            userContact: doc.data().contact,
            userAddress: doc.data().address,
            isHelpActive: doc.data().isHelpActive,
            userDocId: doc.id,
          });
        });
      });
  };
  getReceiverDetails = () => {
    db.collection("users")
      .where("email", "==", this.state.receiverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().name,
            receiverLastName: doc.data().last_name,
            receiverContact: doc.data().contact,
            receiverAddress: doc.data().address,
            receiver: doc.data().email,
            docId:doc.id
          });
        });
      });
    db.collection("requests")
      .where("request_id", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverRequestDocId: doc.id,
          });
        });
      });
  };
  //   updateBookStatus = () => {
  //     db.collection("all_donation").add({
  //       "book_name": this.state.requestName,
  //       "request_id": this.state.requestId,
  //       "requested_by": this.state.receiverName,
  //      "donor_id": this.state.userId,
  //       "request_status": "Donor Interested",
  //     });
  //   };
  update = () => {
    db.collection("users").doc(this.state.userDocId).update({
      isHelpActive: true,
      isHelping: this.state.receiver,
    });
    db.collection("requests").doc(this.state.receiverRequestDocId).update({
      request_status:"Accepted"
    })
  };
  componentDidMount = () => {
    this.getReceiverDetails();
    this.getUserDetails();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Requestor Details",
              style: {
                color: "#ffffff",
                fontSize: RFValue(20),
                fontWeight: "bold",
              },
            }}
            backgroundColor="#32867d"
          />
        </View>
        <View style={{ flex: 0.7, padding: RFValue(20) }}>
          <View
            style={{
              flex: 0.7,
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFValue(50),
              borderWidth: 1,
              borderColor: "#deeedd",
              padding: RFValue(10),
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: RFValue(30) }}>
              Request Help Information
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: RFValue(20),
                marginTop: RFValue(30),
              }}
            >
              Request : {this.state.requestName}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: RFValue(20),
                marginTop: RFValue(30),
              }}
            >
              Description: {this.state.description}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: RFValue(20),
                marginTop: RFValue(30),
              }}
            >
              Time Of The Day: {this.state.requestBetween}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: RFValue(20),
                marginTop: RFValue(30),
              }}
            >
              Date: {this.state.date}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: RFValue(20),
                marginTop: RFValue(30),
              }}
            >
              Location: {this.state.location}
            </Text>
          </View>
          <View style={{ flex: 0.7, padding: RFValue(20) }}>
            <View
              style={{
                flex: 0.7,
                justifyContent: "center",
                alignItems: "center",
                marginTop: RFValue(50),
                borderWidth: 1,
                borderColor: "#deeedd",
                padding: RFValue(10),
                // marginTop:RFValue(100)
              }}
            >
              <View style={{ marginTop: RFValue(200) }}>
                <Text style={{ fontWeight: "500", fontSize: RFValue(30) }}>
                  Requestor Information
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(30),
                  }}
                >
                  Name :{" "}
                  {this.state.receiverName + " " + this.state.receiverLastName}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(30),
                    paddingBottom: RFValue(20),
                  }}
                >
                  Contact: {this.state.receiverContact}
                </Text>
              </View>
              {/* <Text
                 style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(30),
                }}
              >
                Address: {this.state.receiverAddress}
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                alignItems: "center",
              }}
            > */}
              <View></View>
              {this.state.receiverId !== this.state.userId ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.addNotification();
                    this.update();
                    this.sendEmail();
                    this.props.navigation.navigate("NotificationScreen");
                    console.log("Helped");
                  }}
                >
                  <Text style={{ color: "white", fontSize: RFValue(20) }}>
                    Accept
                  </Text>
                </TouchableOpacity>
              ) : null}
              {this.state.receiverId !== this.state.userId ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Text style={{ color: "white", fontSize: RFValue(20) }}>
                    Decline
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "25%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(60),
    backgroundColor: "#ff5722",
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
    marginTop: RFValue(80),
    marginLeft: RFValue(-150),
  },
  button2: {
    width: "25%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(60),
    backgroundColor: "#ff5722",
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
    marginTop: RFValue(-60),
    marginLeft: RFValue(150),
  },
});
