import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config";
import { RFValue } from "react-native-responsive-fontsize";
import { DrawerItems } from "react-navigation-drawer";
import * as ScreenOrientation from 'expo-screen-orientation';
import { Avatar, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      contact: 0,
      address: "",
      email: firebase.auth().currentUser.email,
      documentID: "",
      userId: firebase.auth().currentUser.email,
      image: "#",
      name: "",
      docId: "",
    };
  }
  getUserDetails = () => {
    db.collection("users")
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            firstName: doc.data().name,
            lastName: doc.data().last_name,
            contact: doc.data().contact,
            address: doc.data().address,
            email: doc.data().email,
            documentID: doc.id,
            docId: doc.id,
          });
        });
      });
  };
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profile/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
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
  updateUserDetails = () => {
    if (this.state.contact.length === 10) {
      var a  = parseInt(this.state.contact);
      this.setState({
        contact:a,
      })
      db.collection("users")
        .doc(this.state.documentID)
        .update({
          name: this.state.firstName,
          last_name: this.state.lastName,
          address: this.state.address,
          contact: this.state.contact,
        })
        .then(() => {
          Alert.alert("Profile Updated Succesfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("Please enter a valid phone number");
    }
  };
  componentDidMount() {
    this.getUserDetails();
    this.fetchImage(this.state.userId);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
            <View style={{ flex: 0.12 }}>
              <MyHeader title="Settings" navigation={this.props.navigation}/>
            </View>
            <View
              style={{
                padding: RFValue(10),
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Avatar
                rounded
                source={{ uri: this.state.image }}
                onPress={() => {
                  this.selectPicture();
                }}
                size="xlarge"
                showEditButton={true}
              />
            </View>

            <View style={styles.formContainer}>
              <View style={{ flex: 0.66, padding: 10 }}>
                <Text style={styles.label}> First Name</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder="First Name"
                  maxLength={12}
                  onChangeText={(text) => {
                    this.setState({
                      firstName: text,
                    });
                  }}
                  value={this.state.firstName}
                />
                <Text style={styles.label}> Last Name</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder="Last Name"
                  maxLength={12}
                  onChangeText={(text) => {
                    this.setState({
                      lastName: text,
                    });
                  }}
                  value={this.state.lastName}
                />
                <Text style={styles.label}> Contact</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder="Contact"
                  keyboardType={"numeric"}
                  maxLength={10}
                  onChangeText={(text) => {
                    this.setState({
                      contact: text,
                    });
                  }}
                  value={this.state.contact}
                />
                {/* <Text style={styles.label}> Address</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="Address"
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              value={this.state.address}
            /> */}
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateUserDetails();
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6fc0b8",
  },
  formContainer: { flex: 0.88, justifyContent: "center" },
  label: {
    fontSize: RFValue(18),
    color: "#717D7E",
    fontWeight: "bold",
    padding: RFValue(10),
    marginLeft: RFValue(20),
  },
  formTextInput: {
    width: "90%",
    height: RFValue(50),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    marginBottom: RFValue(20),
    marginLeft: RFValue(20),
  },
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
  },
  buttonView: { flex: 0.22, alignItems: "center", marginTop: RFValue(100) },
  buttonText: { fontSize: RFValue(23), fontWeight: "bold", color: "#fff" },
});
