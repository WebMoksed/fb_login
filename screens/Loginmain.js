import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, CheckBox, ToastAndroid } from 'react-native';

export default class Loginmain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      name: "",
      email: "",
      password: "",
      cpassword: "",
      checked: false,
      nameNotValidated: false,
      nameNotValidated1: false,
      requiredName: false,
      emailValid: false,
      passwordVal: false,
      Matchpass: false,
      validated: false,
      validated: false,
      vailded4: false
    };
  }
  chkBox = () => {
    if (this.state.checked === false) {
      this.setState({ checked: true, vailded4: true })
    }
    else {
      this.setState({ checked: false, vailded4: false })
    }
  }
  setName = (val) => {
    let name = val.trim()
    if (name === "") {
      this.setState({
        nameNotValidated: true
      })

    } else {
      this.setState({ name: name, nameNotValidated: false })
    }

  }
  UserName = (val) => {
    let Username = val.trim()
    if (Username === "") {
      this.setState({
        nameNotValidated1: true
      })

    } else {
      this.setState({ user: Username, nameNotValidated1: false })
    }

  }
  EmailValid = (val) => {
    let EmailV = val.trim()
    if (EmailV === "") {
      this.setState({
        emailValid: true,
      })
    }
    else {
      this.setState({ email: EmailV, emailValid: false })
    }
  }


  passwordValid = (val) => {
    let PassworReg = val.trim()
    if (PassworReg === "") {
      this.setState({ passwordVal: true })
    } else {
      this.setState({ password: PassworReg, passwordVal: false })
    }
  }
  Matchpasswor = (val) => {
    let mpassword = val.trim()
    if (mpassword === "") {
      this.setState({ Matchpass: true })
    } else {
      this.setState({ cpassword: mpassword, Matchpass: false })
    }
  }
 
  validate = () => {
    if (this.state.name === '') {
      this.setState({ nameNotValidated: true })
    } else if (this.state.user === '') {
      this.setState({ nameNotValidated1: true })
    } else if (this.state.email === '') {
      this.setState({ emailValid: true })
    }
    else if (this.state.password === '') {
      this.setState({ passwordVal: true })
    } else if (this.state.cpassword === '') {
      this.setState({ Matchpass: true })
    }
    else if (this.state.password.length > 0 && this.state.cpassword.length > 0) {
      const { password, cpassword } = this.state;
      // perform all neccassary validations
      if (password !== cpassword) {
        //alert("Passwords don't match");
        return;
      } else {
        //alert("Passwords match")
      }
    }
    if (!this.state.checked) {
      ToastAndroid.show(
        "Please select 'terms and condition' option",
        ToastAndroid.SHORT,
        
      );
      this.setState({ validated: false })
      
    }
    // else if (this.state.nameNotValidated === ) {
    //   this.confirmGo();
    // }
    // else {
    //   ToastAndroid.show(
    //     "Are you sure!",
    //     ToastAndroid.SHORT,
    //   );
    // }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 10, fontSize: 18, }}>Registration From</Text>
        <TextInput style={styles.InputType} placeholder='Name' onChangeText={(value) => this.setName(value)} />
        {
          this.state.nameNotValidated === true &&
          <View style={{ marginLeft: -140, marginBottom: 10 }}>
            <Text style={{ color: 'red' }}>Name Can not be empty</Text>
          </View>
        }
        <TextInput style={styles.InputType} placeholder='User Name' onChangeText={(value) => this.UserName(value)} />
        {
          this.state.nameNotValidated1 === true &&
          <View style={{ marginLeft: -100, marginBottom: 10 }}>
            <Text style={{ color: 'red' }}>User Name Can not be empty</Text>
          </View>
        }
        <TextInput style={styles.InputType} placeholder='Email' onChangeText={(value) => this.EmailValid(value)} />
        {
          this.state.emailValid === true &&
          <View style={{ marginLeft: -140, marginBottom: 10 }}>
            <Text style={{ color: 'red' }}>Email Can not be empty</Text>
          </View>
        }
        <TextInput secureTextEntry={true} style={styles.InputType} placeholder='password' onChangeText={(value) => this.passwordValid(value)} />
        {
          this.state.passwordVal === true &&
          <View style={{ marginLeft: -115, marginBottom: 10 }}>
            <Text style={{ color: 'red' }}>password Can not be empty</Text>
          </View>
        }
        <TextInput secureTextEntry={true} style={styles.InputType} placeholder='confirm password' onChangeText={(value) => this.Matchpasswor(value)} />
        {
          this.state.Matchpass === true &&
          <View style={{ marginLeft: -115, marginBottom: 10 }}>
            <Text style={{ color: 'red' }}>password Can not be empty</Text>
          </View>
        }
        <View style={{ flexDirection: 'row' }}><CheckBox onChange={() => this.chkBox()} value={this.state.checked} title='input' /><Text style={{ marginTop: 5 }}> Agree with terms and condtions</Text></View>
        <View style={{ marginBottom: 10 }}><Button style={styles.loginBtn} title="Register" onPress={() => { this.validate() }} /></View>
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