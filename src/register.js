
'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      errors: [],
      showProgress: false,
    };
  }


  async storeToken(accessToken) {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        console.log("Token was stored successfull ");
    } catch (error) {
        console.log("Something went wrong");
    }
  }
  async onRegisterPressed() {
    this.setState({ showProgress: true });
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/users', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  name: this.state.name,
                                  email: this.state.email,
                                  password: this.state.password,
                                  password_confirmation: this.state.password_confirmation,
                                }
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
          Actions.home();
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch (errors) {
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      //We will store all the errors in the array.
      let errorsArray = [];
      for (var key in formErrors) {
        //If array is bigger than one we need to split it.
        if (formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      this.setState({ errors: errorsArray });
      this.setState({ showProgress: false });
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <TextInput
          onChangeText={(text) => this.setState({ name: text })}
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor='#FCF5FF'
        />
        <TextInput
          onChangeText={(text) => this.setState({ age: text })}
          style={styles.input}
          placeholder="Age"
          placeholderTextColor='#FCF5FF'
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={(text) => this.setState({ add: text })}
          style={styles.input}
          placeholder="Address"
          placeholderTextColor='#FCF5FF'
        />
        <TextInput
          onChangeText={(text) => this.setState({ mob: text })}
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor='#FCF5FF'
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={(text) => this.setState({ aadhar: text })}
          style={styles.input}
          placeholder="Aadhar Number"
          placeholderTextColor='#FCF5FF'
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={(text) => this.setState({ email: text })}
          style={styles.input}
          placeholder="Username"
          placeholderTextColor='#FCF5FF'
        />

        <TextInput
          onChangeText={(text) => this.setState({ password: text })}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor='#FCF5FF'
        />
        <TextInput
          onChangeText={(text) => this.setState({ password_confirmation: text })}
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor='#FCF5FF'
        />


        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors} />
<ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader} />

      </View>
    );
  }
}

const Errors = (props) => (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1c313a',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    alignSelf: 'stretch',
    lineHeight: 23,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    color: '#FCF5FF',
    borderColor: '#FCF5FF'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    color: '#FFF',
    fontSize: 30
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Register;
