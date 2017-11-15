import React, {Component} from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  KeyboardAvoidingView

} from 'react-native';

var buffer = require('buffer');

export default class login extends Component {
      constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
      }

  render() {
      var errorCtrl = <View />;

      if(!this.state.success && this.state.badCredentials){
        errorCtrl = <Text style={styles.error}>
          That username and password combination does not work
        </Text>;
      }

      if(!this.state.success && this.state.unknownError){
        errorCtrl = <Text style={styles.error}>
          We experienced an unexpected issue
        </Text>;
      }

    return (
      
      <View style={styles.container}>
      <Image style={styles.logo} source={require('../assests/Octocat.png')}/>
      <Text style={styles.header}>Github Browser</Text>
      <TextInput
        onChangeText={(text)=> this.setState({username: text})}
        style={styles.Input} placeholder="Github Username" autoCapitalize = 'none'/>
      <TextInput
        onChangeText={(text)=> this.setState({password: text})}
        style={styles.Input} placeholder="Github Password" autoCapitalize = 'none' secureTextEntry={true}/>
      <TouchableHighlight
        onPress={this.onLoginPressed.bind(this)}
        style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>

      {errorCtrl}

      <ActivityIndicator
          animating={this.state.showProgress}
          size="small"
          style={styles.loader}
        />
    </View>
  );
  }
  onLoginPressed(){
    this.setState({showProgress: true});

    var authService = require('./AuthService');
    authService.login({
        username: this.state.username,
        password: this.state.password
      }, (results)=> {
        this.setState(Object.assign({
          showProgress: false
        }, results));

        if (results.success && this.props.onLogin) {
            this.props.onLogin();
        }
    })

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10
  },
  logo: {
    width: 70,
    height: 80,
    alignItems: 'center'
  },
  header: {
    fontSize: 30,
    marginTop: 10
  },
  Input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'skyblue',
    alignSelf: 'stretch'
  },
  button: {
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    alignSelf: 'stretch'
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 22,
    color: '#ffffff'
  },
  loader:{
    marginTop:10,
  },
  error:{
    color: 'red',
    paddingTop: 10,
  }

});
