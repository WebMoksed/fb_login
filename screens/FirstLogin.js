import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class FirstLogin extends Component {
  static navigationOptions = {
      header: null,
  }
  
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
     
    };
  }
  saveData = () => {
    let femail = this.state.email.trim()
    let fpass = this.state.password.trim()
    if (femail === "" || femail.length === 0) {
        alert("Must give input")
        return;

    }
    else if (fpass === "" || fpass.length === 0) {
        alert("Must give input")
        return;
    }
    else {
        let myarray = {
            email: this.state.email,
            password: this.state.password

        }
        console.log(myarray);
    }
}
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 10, fontSize: 18, }}>Login From</Text>
        <TextInput style={styles.InputType} onChangeText={(email)=>this.setState({email})} value={this.state.email}  placeholder='User Name' />
        <TextInput style={styles.InputType} onChangeText={(password)=>this.setState({password})} value={this.state.password} placeholder='Password' />
        <View style={{ marginBottom: 10 }}><Button onPress={() => { this.saveData() }} style={styles.loginBtn} title="Log In" /></View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  console.log(data.accessToken.toString())
                }
              )
            }
          }
          }
          onLogoutFinished={() => console.log("logout.")} />
        <View style={{marginTop:10, flexDirection:'row'}}>
        <Text>If you are not register</Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
            <Text style={{marginLeft:5, color:'red'}}>Signup Here</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  InputType: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 70 + '%',
    paddingLeft: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  loginBtn: {
    color: "#841584",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});