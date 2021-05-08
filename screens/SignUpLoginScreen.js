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
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon, Input } from "react-native-elements";
import Pincode from "../PinCode";
import * as ScreenOrientation from 'expo-screen-orientation';
import ModalDropdown from "react-native-modal-dropdown";
export default class SignUpLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      contact: 0,
      pinCodeValid: false,
      address: 0,
      confirmPassword: "",
      isModalVisible: false,
      pincode: [
        400001,
        400002,
        400003,
        400004,
        400005,
        400006,
        400007,
        400008,
        400008,
        400008,
        400008,
        400008,
        400009,
        400009,
        400009,
        400010,
        400010,
        400010,
        400010,
        400010,
        400011,
        400011,
        400011,
        400011,
        400011,
        400012,
        400012,
        400012,
        400012,
        400012,
        400012,
        400012,
        400013,
        400014,
        400014,
        400014,
        400015,
        400016,
        400016,
        400016,
        400016,
        400016,
        400017,
        400017,
        400018,
        400018,
        400019,
        400020,
        400020,
        400020,
        400021,
        400021,
        400022,
        400022,
        400022,
        400022,
        400024,
        400025,
        400025,
        400026,
        400026,
        400026,
        400026,
        400027,
        400028,
        400028,
        400028,
        400028,
        400028,
        400028,
        400029,
        400029,
        400030,
        400030,
        400030,
        400030,
        400031,
        400031,
        400031,
        400032,
        400032,
        400032,
        400033,
        400033,
        400033,
        400033,
        400033,
        400034,
        400034,
        400035,
        400037,
        400037,
        400037,
        400037,
        400042,
        400043,
        400043,
        400049,
        400050,
        400051,
        400052,
        400053,
        400053,
        400054,
        400054,
        400055,
        400056,
        400057,
        400058,
        400059,
        400060,
        400061,
        400062,
        400063,
        400064,
        400065,
        400066,
        400067,
        400068,
        400069,
        400070,
        400071,
        400072,
        400073,
        400074,
        400075,
        400075,
        400076,
        400077,
        400078,
        400079,
        400080,
        400081,
        400082,
        400083,
        400084,
        400085,
        400086,
        400087,
        400088,
        400089,
        400091,
        400092,
        400093,
        400094,
        400095,
        400096,
        400097,
        400098,
        400099,
        400100,
        400101,
        400102,
        400103,
        400104,
        400105,
      ],
    };
  }
  _dropdown_onSelect(idx, value) {
    this.setState({
      address: value,
    });
  }
  ComponentDidMount = () => {
  };
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> SIGN UP </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>First Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"First Name"}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({ firstName: text });
              }}
            />
            <Text style={styles.label}>Last Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Last Name"}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({ lastName: text });
              }}
            />

            <Text style={styles.label}>Mobile Phone </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Mobile Phone"}
              textContentType={"telephoneNumber"}
              maxLength={10}
              keyboardType={"phone-pad"}
              onChangeText={(text) => {
                this.setState({ contact: text });
              }}
            />
            <View style={{ paddingBottom: RFValue(10) }}>
              <Text style={styles.label}>Community Pin Code </Text>
              {/* <TextInput
              style={styles.formInput}
              placeholder={"Currently only open for Mumbai City"}
              keyboardType={"phone-pad"}
              maxLength={6}
              onChangeText={(text) => {
                this.setState({ address: text });
              }}
            /> */}
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                dropdownTextStyle={styles.dropdown_text_style}
                options={[
                  this.state.pincode[0],
                  this.state.pincode[1],
                  this.state.pincode[2],
                  this.state.pincode[3],
                  this.state.pincode[4],
                  this.state.pincode[5],
                  this.state.pincode[6],
                  this.state.pincode[7],
                  this.state.pincode[8],
                  this.state.pincode[9],
                  this.state.pincode[10],
                ]}
                onSelect={(idx, value) => this._dropdown_onSelect(idx, value)}
              ></ModalDropdown>
            </View>

            <Text style={styles.label}>Email </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Email"}
              keyboardType={"email-address"}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
            <Text style={styles.label}> Password </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Confirm Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ confirmPassword: text });
              }}
            />
          </View>
          <View style={{ flex: 0.2, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                // {let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
                // let number = '+91' + this.state.contact;
                // firebase.auth().signInWithPhoneNumber(number,recaptcha).then(function(e){
                //   let code = prompt('Enter the OTP','');
                //   if(code === null) return; 
                //   e.confirm(code).then(function(result){
                //     console.log(result.user,'user')
                //   }) 
                // }).catch((error)=>{
                //   console.log(error);
                // })
                this.userSignUp(
                  this.state.email,
                  this.state.password,
                  this.state.confirmPassword,
                  this.state.firstName,
                  this.state.lastName,
                  this.state.contact,
                  this.state.address
                )
              }
            // }
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}
            >
              Cancel
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  };
  userLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("RequestScreen");
        console.log("Navigated");
      })
      .catch((error) => {
        console.log(error.message);
        return Alert.alert(error.message);
      });
  };
  userSignUp = async (
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    address,
    contact
  ) => {
    var pincode = parseInt(this.state.address);
    this.setState({
      address: pincode,
    });

    // for (
    //   var i = 0;
    //   i <= this.state.pincode.length && this.state.pinCodeValid === false;
    //   i++
    // ) {
    //   if (this.state.pincode[i] === this.state.address) {
    //     this.setState({
    //       pinCodeValid: true,
    //     });
    //     console.log(
    //       "Inside Loop is being Executed and post setState pinCodeValid value =" +
    //         this.state.pinCodeValid
    //     );
    //   }
    // }
    // console.log(this.state.pinCodeValid + " " + pincode + " Newsess");
    // if (this.state.pinCodeValid === false) {
    //   Alert.alert("Invalid Pincode " + pincode, "", [
    //     { text: "Please enter a valid pincode in Mumbai" },
    //   ]);
    // }
    if (password != confirmPassword) {
      return Alert.alert("Passwords Do Not Match /n Check Password");
    } else if (
      this.state.contact.length === 10 &&
      this.state.firstName !== "" &&
      this.state.lastName !== "" 
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          if (
            this.state.contact.length === 10 &&
            this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            response
          ) {
            var a = parseInt(this.state.contact);
            var b = parseInt(this.state.address);
            this.setState({
              contact: a,
              address: b,
              // pinCodeValid: true,
            });
            db.collection("users").add({
              name: this.state.firstName,
              last_name: this.state.lastName,
              contact: this.state.contact,
              email: this.state.email,
              address: this.state.address,
              isRequestActive: false,
              isHelpActive: false,
              isHelping: "",
              feedbackSum: 0,
            });
            return Alert.alert("User Added Successfully", "", [
              {
                text: "OK",
                onPress: () => {
                  this.setState({ isModalVisible: false });
                },
              },
            ]);
          }
        })
        .catch((error) => {
          return Alert.alert(error.message);
        });
    } else {
      if (this.state.lastName === "") {
        Alert.alert("Please enter a valid last name");
      }
      if (this.state.firstName === "") {
        Alert.alert("Please enter a valid name");
      }
      if (this.state.contact.length !== 10) {
        Alert.alert("Please enter a valid 10 digit mobile number");
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View style={{ flex: 0.25 }}>
          <View
            style={{
              alignContent: "center",
              alignSelf: "center",
              padding: RFValue(50),
            }}
          >
            <Image
              source={require("../assets/CommunitySanta.png")}
              style={{ width: RFValue(200), height: RFValue(200) }}
            />
          </View>
          <View></View>
          <View style={{ flex: 0.15 }} />
          <View style={{ marginTop: RFValue(-110) }}>
            <Text style={styles.communitySantaText}>Community Santa</Text>
          </View>
        </View>
        <View style={{ flex: 0.45, marginTop: RFValue(200) }}>
          <View style={styles.TextInput}>
            <TextInput
              style={styles.loginBox}
              placeholder="abc@example.com"
              placeholderTextColor="gray"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
            <TextInput
              style={[styles.loginBox, { marginTop: RFValue(15) }]}
              secureTextEntry={true}
              placeholder="Enter Password"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              padding: RFValue(10),
              marginTop: RFValue(10),
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.userLogin(this.state.email, this.state.password);
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#6fc0b8" },
  loginBox: {
    width: "80%",
    height: RFValue(50),
    borderWidth: 1.5,
    borderColor: "#ffffff",
    fontSize: RFValue(20),
    paddingLeft: RFValue(10),
  },
  button: {
    width: "80%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: "#ffff",
    shadowColor: "#000",
    marginBottom: RFValue(10),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: { color: "#32867d", fontWeight: "200", fontSize: RFValue(20) },
  label: {
    fontSize: RFValue(13),
    color: "#717D7E",
    fontWeight: "bold",
    paddingLeft: RFValue(10),
    marginLeft: RFValue(20),
  },
  formInput: {
    width: "90%",
    height: RFValue(35),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  registerButton: {
    width: "75%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#32867d",
    marginTop: RFValue(10),
  },
  communitySantaText: {
    justifyContent: "center",
    color: "brown",
    alignSelf: "center",
    marginTop: RFValue(70),
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  scrollview: { flex: 1, backgroundColor: "#fff" },
  signupView: { flex: 0.05, justifyContent: "center", alignItems: "center" },
  signupText: { fontSize: RFValue(20), fontWeight: "bold", color: "#32867d" },
  TextInput: { flex: 0.5, alignItems: "center", justifyContent: "center" },
  dropdown: {
    alignSelf: "center",
    marginTop: RFValue(3),
    // borderRadius: RFValue(3),
    width: "90.5%",
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
});
