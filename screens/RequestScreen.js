import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MyHeader from "../components/MyHeader";
import db from "../config";
import * as ScreenOrientation from "expo-screen-orientation";
import firebase from "firebase";
import moment from "moment";
import ModalDropdown from "react-native-modal-dropdown";
export default class RequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestDateAndTime: "",
      requestLocation: 0,
      requestName: "",
      requestBetween: "",
      description: "",
      isRequestActive: false,
      userDocId: "",
      zipCode: 0,
      requestStatus: "",
      askedRequestName: "",
      docId: "",
      userDocId: "",
      requestId: "",
      feedback: "",
      tree_rating: 1,
      tree1: true,
      tree2: false,
      tree3: false,
      tree4: false,
      tree5: false,
      isPressed: false,
      sentTo: "",
      day1: "",
      day2: "",
      day3: "",
      day4: "",
      day5: "",
      subCurrentDate: "",
      name: "",
      name1: "",
      userLocation: 0,
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async (
    requestName,
    description,
    requestDateAndTime,
    userLocation,
    requestBetween
  ) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();

    await db.collection("requests").add({
      user_id: userId,
      request_name: requestName,
      description: description,
      request_id: randomRequestId,
      request_status: "Requested",
      request_time_and_date: requestDateAndTime,
      request_location: this.state.userLocation,
      request_between: requestBetween,
    });
    this.getRequest();
    db.collection("users")
      .where("email", "==", userId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            name: doc.data().name + " " + doc.data().last_name,
            userLocation: doc.data().address,
          });
          db.collection("users").doc(doc.id).update({
            isRequestActive: true,
          });
        });
      });

    return Alert.alert("Request Successful");
  };
  _dropdown_1_onSelect(idx, value) {
    this.setState({
      requestBetween: value,
    });
  }
  _dropdown_2_onSelect(idx, value) {
    this.setState({
      requestBetween: value,
    });
  }
  _dropdown_3_onSelect(idx, value) {
    this.setState({
      requestBetween: value,
    });
  }
  _dropdown_1_1_onSelect(idx, value) {
    this.setState({
      requestDateAndTime: value,
    });
  }
  _dropdown_2_2_onSelect(idx, value) {
    this.setState({
      requestDateAndTime: value,
    });
  }
  _dropdown_3_3_onSelect(idx, value) {
    this.setState({
      requestDateAndTime: value,
    });
  }
  _dropdown_4_4_onSelect(idx, value) {
    this.setState({
      requestDateAndTime: value,
    });
  }
  _dropdown_5_5_onSelect(idx, value) {
    this.setState({
      requestDateAndTime: value,
    });
  }
  sendFeedback = () => {
    db.collection("feedback").add({
      sent_by: this.state.userId,
      feedback: this.state.feedback,
      tree_rating: this.state.tree_rating,
      sent_to: this.state.sentTo,
      feedbackName: this.state.name1,
    });
  };
  getisRequestActive = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            isRequestActive: doc.data().isRequestActive,
            userDocId: doc.id,
          });
        });
      });
  };
  getRequest = () => {
    db.collection("requests")
      .where("user_id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
            this.setState({
              askedRequestName: doc.data().request_name,
              requestStatus:doc.data().request_name,
              docId: doc.id,
              requestId: doc.data().request_id,
            });
            console.log(this.state.requestStatus + " This is request status" + this.state.askedRequestName);
            db.collection("users")
              .where("isHelping", "==", doc.data().user_id)
              .onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => {
                  this.setState({
                    sentTo: doc.data().email,
                    name1: doc.data().name + " " + doc.data().last_name,
                  });
                });
              });
        });
      });
  };
  getDay = () => {
    var day1 = moment();
    var day2 = moment();
    var day3 = moment();
    var day4 = moment();
    var day5 = moment();
    var currentDate = moment();
    var subCurrentDate = currentDate.subtract(2, "days");
    day1.add(1, "day");
    day2.add(2, "days");
    day3.add(3, "days");
    day4.add(4, "days");
    day5.add(5, "days");
    this.setState({
      day1: day1.format("DD/MM/YY"),
      day2: day2.format("DD/MM/YY"),
      day3: day3.format("DD/MM/YY"),
      day4: day4.format("DD/MM/YY"),
      day5: day5.format("DD/MM/YY"),
      subCurrentDate: subCurrentDate.format("DD/MM/YY"),
    });
    console.log(subCurrentDate);
    db.collection("requests")
      .where("user_id", "==", this.state.userId)
      .where("request_status", "==", "Requested")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (this.state.subCurrentDate >= doc.data().request_time_and_date) {
            db.collection("users").doc(this.state.userDocId).update({
              isRequestActive: false,
            });
            db.collection("requests").doc(doc.id).update({
              request_status: "Expired",
            });
          }
        });
      });
  };
  getPincode = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            userLocation: doc.data().address,
          });
          console.log(this.state.userLocation);
        });
      });
  };
  componentDidMount = async () => {
    this.getisRequestActive();
    this.getRequest();
    this.getPincode();
    this.getDay();
  };
  sendNotification = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().name;
          var lastname = doc.data().last_name;
          db.collection("all_notification")
            .where("request_id", "==", this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donorId = doc.data().donor_id;
                db.collection("all_notification").add({
                  target_user_id: donorId,
                  message:
                    "Thank you for helping me" + " by " + name + " " + lastname,
                  notification_status: "unread",
                  requestName: requestName,
                });
              });
            });
        });
      });
  };
  updateRequestStatus = () => {
    db.collection("users")
      .where("isHelping", "==", this.state.userId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users")
            .doc(doc.id)
            .update({
              isHelpActive: false,
              isHelping: "",
              feedbackSum: doc.data().feedbackSum + this.state.tree_rating,
            });
        });
      });

    db.collection("requests").doc(this.state.docId).update({
      request_status: "received",
    });

    db.collection("users").doc(this.state.userDocId).update({
      isRequestActive: false,
    });
  };

  receiveRequests = (requestName) => {
    var userId = this.state.userId;
    var requestId = this.state.requestId;
    db.collection("received_requests").add({
      user_id: userId,
      request_name: requestName,
      request_id: requestId,
      requestStatus: "received",
    });
  };

  render() {
    if (
      this.state.isRequestActive === true && this.state.requestStatus === "Requested"
    ) {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <MyHeader
              title="Request Status"
              navigation={this.props.navigation}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: RFValue(20),
              borderColor: "#32867d",
            }}
          >
            <Text style={styles.requestText}>
              Request Name: {this.state.askedRequestName}
            </Text>
            <Text style={styles.requestText}>
              Status: {this.state.requestStatus}{" "}
            </Text>
          </View>
        </View>
      );
    }
    if (
      this.state.requestStatus === "Accepted" 
    ) {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <MyHeader
              title="Request Status"
              navigation={this.props.navigation}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: RFValue(20),
              borderColor: "#32867d",
            }}
          >
            <Text style={styles.requestText}>
              Request Name: {this.state.askedRequestName}
            </Text>
            <Text style={styles.requestText}>
              Status: {this.state.requestStatus} by {this.state.name1}
            </Text>
            <Text style={styles.requestText1}>
              Please go to notification screen for more info by clicking the
              bell icon
            </Text>
            <Icon
              name="bell"
              type="font-awesome"
              color="#696969"
              size={RFValue(20)}
              style={{ padding: RFValue(20) }}
              onPress={() => {
                this.props.navigation.navigate("NotificationScreen");
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // this.sendNotification();
                // this.updateRequestStatus();
                // this.setState({
                //   requestName: "",
                //   description: "",
                //   requestDateAndTime: "",
                //   requestLocation: 0,
                //   requestBetween: "",
                // });
                // this.receiveRequests(this.state.askedRequestName);
                // this.sendFeedback();
                console.log("CLICKED");
                this.setState({
                  isPressed: true,
                });
              }}
            >
              <Text style={styles.buttontxt}>Complete Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (this.state.isPressed === true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: RFValue(20),
            borderColor: "#32867d",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(20),
            }}
          >
            Feedback
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  tree5: false,
                  tree4: false,
                  tree3: false,
                  tree2: false,
                  tree1: true,
                  tree_rating: 1,
                });
              }}
              style={{
                height: RFValue(40),
                width: RFValue(20),
                marginLeft: RFValue(120),
              }}
            >
              {this.state.tree1 ? (
                <Image
                  source={require("../assets/Christmas_tree.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              ) : (
                <Image
                  source={require("../assets/Christmas_tree_grey.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  tree5: false,
                  tree4: false,
                  tree3: false,
                  tree2: true,
                  tree1: true,
                  tree_rating: 2,
                });
              }}
              style={{
                height: RFValue(40),
                width: RFValue(20),
                marginLeft: RFValue(160),
                marginTop: RFValue(-40),
              }}
            >
              {this.state.tree2 ? (
                <Image
                  source={require("../assets/Christmas_tree.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              ) : (
                <Image
                  source={require("../assets/Christmas_tree_grey.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  tree5: false,
                  tree4: false,
                  tree3: true,
                  tree2: true,
                  tree1: true,
                  tree_rating: 3,
                });
              }}
              style={{
                height: RFValue(40),
                width: RFValue(20),
                marginLeft: RFValue(200),
                marginTop: RFValue(-40),
              }}
            >
              {this.state.tree3 ? (
                <Image
                  source={require("../assets/Christmas_tree.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              ) : (
                <Image
                  source={require("../assets/Christmas_tree_grey.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  tree5: false,
                  tree4: true,
                  tree3: true,
                  tree2: true,
                  tree1: true,
                  tree_rating: 4,
                });
              }}
              style={{
                height: RFValue(40),
                width: RFValue(20),
                marginLeft: RFValue(240),
                marginTop: RFValue(-40),
              }}
            >
              {this.state.tree4 ? (
                <Image
                  source={require("../assets/Christmas_tree.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              ) : (
                <Image
                  source={require("../assets/Christmas_tree_grey.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  tree5: true,
                  tree4: true,
                  tree3: true,
                  tree2: true,
                  tree1: true,
                  tree_rating: 5,
                });
              }}
              style={{
                height: RFValue(40),
                width: RFValue(20),
                marginLeft: RFValue(280),
                marginTop: RFValue(-40),
              }}
            >
              {this.state.tree5 ? (
                <Image
                  source={require("../assets/Christmas_tree.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              ) : (
                <Image
                  source={require("../assets/Christmas_tree_grey.png")}
                  style={{ width: RFValue(20), height: RFValue(40) }}
                />
              )}
            </TouchableOpacity>
          </View>
          <Input
            style={styles.feedbackTextInput}
            placeholder={"Provide feedback for your experience!"}
            containerStyle={{ marginTop: RFValue(60) }}
            multiline={true}
            onChangeText={(text) =>
              this.setState({
                feedback: text,
              })
            }
            value={this.state.feedback}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.sendNotification();
              this.updateRequestStatus();
              this.setState({
                requestName: "",
                description: "",
                requestDateAndTime: "",
                requestLocation: 0,
                requestBetween: "",
              });
              this.receiveRequests(this.state.askedRequestName);
              this.sendFeedback();
            }}
          >
            <Text style={styles.buttontxt}>Complete request and</Text>
            <Text style={styles.buttontxt}> submit feedback</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.requestStatus === "Expired") {
      Alert.alert(
        "It seems your request has expired... No worries you can always add another request!"
      );
    } else if (this.state.isRequestActive === false) {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <MyHeader title="Request" navigation={this.props.navigation} />
          </View>
          <ScrollView>
            <View>
              <Input
                style={styles.formTextInput}
                label={"Request Name"}
                placeholder={"Request name"}
                containerStyle={{ marginTop: RFValue(30) }}
                onChangeText={(text) =>
                  this.setState({
                    requestName: text,
                  })
                }
                value={this.state.requestName}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Input
                style={styles.formTextInput2}
                containerStyle={{ marginTop: RFValue(2) }}
                multiline
                numberOfLines={8}
                label={"Description"}
                placeholder={
                  "Please elaborate your request here and also mention if you need help in person or virtually"
                }
                onChangeText={(text) => {
                  this.setState({
                    description: text,
                  });
                }}
                value={this.state.description}
              />
              <Input
                style={styles.formTextInput}
                containerStyle={{ marginTop: RFValue(2) }}
                multiline
                // keyboardType={"numeric"}
                label={"Date"}
                onChangeText={(text) => {
                  var m = moment();
                  m.add(2, "days");
                  this.setState({
                    requestDateAndTime: m.format("DD/MM/YY"),
                  });
                }}
              />
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                dropdownTextStyle={styles.dropdown_text_style}
                options={[
                  this.state.day1,
                  this.state.day2,
                  this.state.day3,
                  this.state.day4,
                  this.state.day5,
                ]}
                onSelect={(idx, value) =>
                  this._dropdown_1_1_onSelect(idx, value)
                }
                onSelect={(idx, value) =>
                  this._dropdown_2_2_onSelect(idx, value)
                }
                onSelect={(idx, value) =>
                  this._dropdown_3_3_onSelect(idx, value)
                }
                onSelect={(idx, value) =>
                  this._dropdown_4_4_onSelect(idx, value)
                }
                onSelect={(idx, value) =>
                  this._dropdown_5_5_onSelect(idx, value)
                }
              ></ModalDropdown>
              <Input
                style={styles.formTextInput}
                containerStyle={{ marginTop: RFValue(10) }}
                multiline
                // keyboardType={"numeric"}
                label={"What Time Do You Need Assistance?"}
                onChangeText={(text) => {}}
              />
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                dropdownTextStyle={styles.dropdown_text_style}
                options={["Morning", "Afternoon", "Evening"]}
                onSelect={(idx, value) => this._dropdown_1_onSelect(idx, value)}
                onSelect={(idx, value) => this._dropdown_2_onSelect(idx, value)}
                onSelect={(idx, value) => this._dropdown_3_onSelect(idx, value)}
              ></ModalDropdown>

              {/* <Input
              style={styles.formTextInput}
              containerStyle={{ marginTop: RFValue(30) }}
              label={"Pin Code"}
              placeholder={"Pin Code"}
              maxLength={6}
              onChangeText={(text) => {
                this.setState({
                  requestLocation: text,
                });
              }}
              value={this.state.requestLocation}
            /> */}
              <Text style={{ fontSize: RFValue(10), padding: RFValue(10) }}>
                Please note that your help request will go from your registered
                pin code.
              </Text>
             
              <TouchableOpacity
                style={[styles.button, { marginTop: RFValue(30) }]}
                onPress={() => {
                  this.addRequest(
                    this.state.requestName,
                    this.state.description,
                    this.state.requestDateAndTime,
                    this.state.userLocation,
                    this.state.requestBetween
                  );
                  this.props.navigation.navigate("HelpScreen");
                }}
              >
                <Text style={styles.requestbuttontxt}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: RFValue(35),
    borderWidth: 1,
    padding: 10,
  },
  formTextInput2: {
    width: "75%",
    height: RFValue(155),
    borderWidth: 1,
    padding: 10,
  },
  ImageView: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  feedbackTextInput: {
    width: "75%",
    height: RFValue(145),
    borderWidth: 1,
    padding: 10,
  },
  askedRequestName: {
    fontSize: RFValue(30),
    fontWeight: "500",
    padding: RFValue(10),
    alignItems: "center",
    marginLeft: RFValue(135),
    marginTop: RFValue(-40),
  },
  status: {
    fontSize: RFValue(20),
    marginTop: RFValue(30),
  },
  requestStatus: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    marginTop: RFValue(20),
  },
  requestStatus: {
    fontWeight: "500",
    fontSize: RFValue(30),
    marginLeft: RFValue(70),
    marginTop: RFValue(-30),
  },
  buttonView: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  requestText: {
    fontSize: RFValue(25),
  },
  requestText1: {
    paddingTop: RFValue(20),
    fontSize: RFValue(10),
  },
  buttontxt: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#fff",
  },
  touchableopacity: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "90%",
  },
  requestbuttontxt: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(40),
  },
  dropdown: {
    alignSelf: "flex-end",
    marginTop: RFValue(-49),
    right: RFValue(8),
    // borderRadius: RFValue(3),
    width: "97%",
    borderColor: "black",
    borderWidth: RFValue(0.5),
    height: RFValue(35),
  },
  dropdown_text: {
    marginVertical: RFValue(10),
    marginHorizontal: RFValue(6),
    fontSize: RFValue(10),
    textAlign: "center",
    textAlignVertical: "center",
  },
  dropdown_dropdown: {
    width: "97%",
    height: RFValue(70),
    borderWidth: RFValue(2),
    borderRadius: RFValue(3),
  },
  dropdown_text_style: {
    fontSize: RFValue(10),
    alignSelf: "center",
  },
  dropdown2: {
    alignSelf: "flex-end",
    width: RFValue(200),
    marginTop: RFValue(-49),
    right: RFValue(8),
    // borderRadius: RFValue(3),
    width: "97%",
    borderColor: "black",
    borderWidth: RFValue(0.5),
    height: RFValue(35),
  },
  dropdown_text2: {
    marginVertical: RFValue(10),
    marginHorizontal: RFValue(6),
    fontSize: RFValue(10),
    textAlign: "center",
    textAlignVertical: "center",
  },
  dropdown_dropdown2: {
    width: "97%",
    height: RFValue(100),
    borderWidth: RFValue(2),
    borderRadius: RFValue(3),
  },
  dropdown_text_style2: {
    fontSize: RFValue(10),
    alignSelf: "center",
  },
});
