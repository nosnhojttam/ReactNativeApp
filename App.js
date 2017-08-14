import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Alert
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

export default class Login extends React.Component {
  static navigationOptions = {
   title: 'Welcome',
 };
  constructor(props) {
    super(props);
    this.state = {
      username: 'Username',
      password: 'Password',
    };
  }
  _onLoginPress(event) {
      //let username = this.state.username;
      //Alert.alert(username)
      fetch('http://104.236.179.123/api.php/api/')
      .then((response) => response.json())
      .then((responseJSON) => {
      console.log(responseJSON);
      })
      .catch((error) => {
          console.warn(error);
      });
  }

  _onSignupPress(event) {
    let username = this.state.username;
    let password = this.state.password;
    let myApiUrl = "http://104.236.179.123/api.php/api/"
    let usersPath = "users"

    fetch(`${myApiUrl}/${usersPath}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {username, password}
      })
    })
  }

  render() {
    //const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior = "padding" style={styles.container}>
      <StatusBar
        barStyle = "light-content"
      />
        <TextInput
          placeholder = "Username"
          placeholderTextColor = '#cccccc'
          returnKeyType="next"
          keyboardType = "email-address"
          autoCorrect = {false}
          autoCapitalize = "none"
          ref = {(el) => { this.username = el; }}
          onSubmitEditing = {()=> this.passwordInput.focus()}
          onChangeText ={(username)=> this.setState({username})}
          style = {styles.input}
          value = {this.state.username}>
        </TextInput>

        <TextInput
          placeholder ="Password"
          placeholderTextColor ='#cccccc'
          secureTextEntry
          returnKeyType="go"
          ref = {(input)=>this.passwordInput = input}
          onChangeText ={(password)=> this.setState({password})}
          style = {styles.input}
          value={this.state.password}>
        </TextInput>

        <TouchableOpacity onPress={this._onLoginPress.bind(this)} style = {styles.buttonContainer}>
          <Text style ={styles.loginbutton}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._onSignupPress.bind(this)} style = {styles.buttonContainer}>
          <Text style ={styles.loginbutton}>SIGNUP</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding :20,
    flex: 1,
    justifyContent: 'center',
  },
  input:{
    minWidth:300,
    flexWrap:'wrap',
    height : 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal : 10,
    color:'#000',
    marginBottom : 10,
    textAlign:'center'
  },
  buttonContainer:{
    backgroundColor: "#1980b9",
    paddingVertical:10,
    marginTop:15,
    marginBottom:20,
  },
  loginbutton:{
    color: '#ffffff',
    textAlign:'center',
    fontWeight:'700'
  }
});

const App = StackNavigator({
  Login: { screen: Login },
});
