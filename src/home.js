'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
   Image,
  AsyncStorage,
  Alert,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggenIn: "",
      showProgress: false,
      accessToken: "",
    };
  }
  componentWillMount() {
    this.getToken();
  }
  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
          Actions.login();
      } else {
          this.setState({accessToken: accessToken});
      }
    } catch(error) {
        console.log("Something went wrong");
         Actions.login();
    }
  }
  async deleteToken() {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN)
        Actions.main();
    } catch (error) {
        console.log("Something went wrong");
    }
  }

  onLogout(){
    this.setState({showProgress: true});
    this.deleteToken();
  }

  confirmDelete() {
    Alert.alert("Are you sure?", "This action cannot be undone", [
      {text: 'Cancel'}, {text: 'Delete', onPress: () => this.onDelete()}
    ]);
  }

  async onDelete(){
    let access_token = this.state.accessToken
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/users/'+access_token,{
                              method: 'DELETE',
                            });
        let res = await response.text();
        if (response.status >= 200 && response.status < 300) {
          console.log("success sir: " + res)
          Actions.main();
        } else {
          let error = res;
          throw error;
        }
    } catch(error) {
        console.log("error: " + error)
    }
  }
  onUpdatePress() {
    Actions.update();
  }

  onLandPress() {
    Actions.landview();
  }

  render() {
    //We check to se if there is a flash message. It will be passed in user update.
    let flashMessage;
    if (this.props.flash) {
       flashMessage = <Text style={styles.flash}>{this.props.flash}</Text>;
    } else {
       flashMessage = null;
    }
    return (
      <View style={styles.container}>
        {flashMessage}
    <Image source={require('../img/agrimaan.png')} />
        <Text style={styles.text}> Your new token is {this.state.accessToken} </Text>

        <TouchableHighlight
        onPress={this.onUpdatePress.bind(this)}
        style={styles.button}
        >
          <Text style={styles.buttonText}>
            Update Account
          </Text>

        </TouchableHighlight>
        <TouchableHighlight
        onPress={this.onLandPress.bind(this)}
        style={styles.button}
        >
          <Text style={styles.buttonText}>
            Land Details
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onLogout.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.confirmDelete.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Delete Account
          </Text>
        </TouchableHighlight>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c313a',
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: '#FCF5FF',
    marginTop: 15,
    marginBottom: 15
  },
  text: {
    color: '#FCF5FF',
    marginBottom: 30
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  flash: {
    height: 40,
    backgroundColor: '#00ff00',
    padding: 10,
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20
  }
});

export default Home;
