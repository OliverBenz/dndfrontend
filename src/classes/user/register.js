'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { storeData } from '../../services/asyStorage';

import CustomInput from '../../components/textInput';

type Props = {};

export default class Login extends Component<Props>{
  static navigationOptions = {
    title: 'Register',
  };

  constructor(props){
    super(props);
    
    this.state = {
      email: "",
      password: "",
      passwordCheck: "",
      firstname: "",
      lastname: ""
    };

  }
  render(){
    return(
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          {/* <Text style={styles.text}>Firstname: </Text> */}
          <CustomInput style={styles.input} onChange={(e) => this.setState({ firstname: e.nativeEvent.text })} value={this.state.firstname} placeholder="Firstname" />

          {/* <Text style={styles.text}>Lastname: </Text> */}
          <CustomInput style={styles.input} onChange={(e) => this.setState({ lastname: e.nativeEvent.text })} value={this.state.lastname} placeholder="Lastname" />
        </View>

        <View style={{flexDirection: 'row'}}>
          {/* <Text style={styles.text}>E-Mail: </Text> */}
          <CustomInput style={styles.input} onChange={(e) => this.setState({ email: e.nativeEvent.text })} value={this.state.email} placeholder="E-Mail" />
        </View>

        <View style={{flexDirection: 'row'}}>
          {/* <Text style={styles.text}>Password: </Text> */}
          <CustomInput style={styles.input} onChange={(e) => this.setState({ password: e.nativeEvent.text })} value={this.state.password} secureTextEntry={true} placeholder="Password" />

          {/* <Text style={styles.text}>Repeat Password: </Text> */}
          <CustomInput style={styles.input} onChange={(e) => this.setState({ passwordCheck: e.nativeEvent.text })} value={this.state.passwordCheck} secureTextEntry={true} placeholder="Repeat Password" />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this._registerAPI()}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _registerAPI = () => {
    if(this.state.firstname !== "" && this.state.lastname !== "" && this.state.password !== "" && this.state.email !== "" && this.state.password == this.state.passwordCheck){
      getData("ip").then((ip) => {
        fetch(ip + "userRegister", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "email": this.state.email,
            "password": this.state.password
          }),
        })
        .then((res) => res.json())
        .then((resJ) => {
          storeData("sessionId", resJ).then(() => {
            this.props.navigation.navigate('Home');
          });
        });
      });
    }
  }
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18
  },
  input: {
    marginBottom: 20,
    flex: 1
  },
});