<script src = "http://10.56.30.193:8097" > </script>

import React, {Component} from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator

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
    return (

      <View style={styles.container}>
      <Image style={styles.logo} source={require('../assests/Octocat.png')}/>
      <Text style={styles.header}>Github Browser</Text>
      <TextInput
        onChangeText={(text)=> this.setState({Username: text})}
        style={styles.Input} placeholder="Github Username" autoCapitalize = 'none'/>
      <TextInput
        onChangeText={(text)=> this.setState({Password: text})}
        style={styles.Input} placeholder="Github Password" autoCapitalize = 'none' secureTextEntry="true"/>
      <TouchableHighlight
        onPress={this.onLoginPressed.bind(this)}
        style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>
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

        var b = new buffer.Buffer(this.state.Username + ':' + this.state.Password);
        var encodedAuth = (b.toString('base64'));


        fetch('https://api.github.com/user',{
          headers: {
            'Authorization' : 'Basic ' + encodedAuth
            }

        })
        .then((respnse)=>{
          return respnse.json();
        })
        .then((results)=>{
          console.log(results);
          this.setState({showProgress: false});
        });
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

  }

});
