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

class Update extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      errors: [],
      showProgress: false,
      accessToken: this.props.accessToken,
    };
  }
  componentWillMount() {
    this.fetchUserData();
  }

  async fetchUserData() {
    let access_token = this.state.accessToken;
    try {
      let response = await fetch("https://afternoon-beyond-22141.herokuapp.com/api/users/" + access_tok + + n+"/edit");
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let userData = JSON.parse(res);
          for(let data in userData) {
            console.log("data is: " + data);
            this.setState({[data]:userData[data]});
          }
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        //If something went wrong we will redirect to the login page
        Actions.login();
    }
  }
  async onUpdatePressed() {
    this.setState({showProgress: true});
    let access_token = this.state.accessToken;
    try {
      let response = await fetch("https://afternoon-beyond-22141.herokuapp.com/api/users/"+access_token, {
                              method: 'PATCH',
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
          //On success we redirect to home with flash success message${key} ${error}`
          Actions.home(res);
      } else {
          //Handle errors
          const error = res;
          throw error;
      }
    } catch(errors) {
        //errors are in JSON form so we must parse them first.
        let formErrors = JSON.parse(errors);
        //We will store all the errors in the array.
        let errorsArray = [];
        for(var key in formErrors) {
          //If array is bigger than one we need to split it.
          if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
          } else {
             errorsArray.push(`${key} ${formErrors[key]}`);
          }
        }
        this.setState({errors: errorsArray});
        this.setState({showProgress: false});
    }
  }
  render() {

    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} value={this.state.name}
          placeholderTextColor='#FCF5FF'
        />
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} value={this.state.email}
          placeholderTextColor='#FCF5FF'
        />

        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor='#FCF5FF'
        />
        <TextInput
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor='#FCF5FF'
        />

        <TouchableHighlight onPress={this.onUpdatePressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Update
          </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors} />
<ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader} />

      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:  '#1c313a',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    color: '#FCF5FF',
    marginTop: 10,
    padding: 4,
     alignSelf: 'stretch',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#F5FCFF'
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
    color: '#FCF5FF',
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Update;
