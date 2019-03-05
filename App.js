import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import FirstLogin from './screens/FirstLogin';
import Loginmain from './screens/Loginmain';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return <AppNavigator />;
  }
}


const AppNavigator = createStackNavigator(
  {
    Home: FirstLogin,
    Signup: Loginmain,
  },
  {
    initialRouteName: "Home"
  },
);

export default createAppContainer(AppNavigator);