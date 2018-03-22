import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
   Picker,
  Text,
  View
} from 'react-native';
import RadioButton from 'radio-button-react-native';

class LandDetails extends Component {
  constructor() {
    super();

    this.state = {
      Lno: "",
      Lsize: "",
      crop: "",
      value: "",
      latitude: null,
     longitude: null,
     error: null,
    };
  }

  componentDidMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
  );
}
onSavePressed() {
  Actions.landview();
}
handleOnPress(value) {
    this.setState({ value });
}
  render() {
    return (
      <View style={styles.container}>


        <TextInput
          onChangeText={(text) => this.setState({ Lno: text })}
          style={styles.input}
          placeholder="Land Number"
          placeholderTextColor='#FCF5FF'
          keyboardType="numeric"
        />

        <TextInput
          onChangeText={(text) => this.setState({ Lsize: text })}
          style={styles.input}
          placeholder="Land Size"
            keyboardType="numeric"
          placeholderTextColor='#FCF5FF'
        />

        <TextInput
          onChangeText={(text) => this.setState({ crop: text })}
          style={styles.input}
          placeholder="Type of crop grown"
          placeholderTextColor='#FCF5FF'
        />
<Text style={styles.text}> Land Location </Text>
        <Text style={styles.textR}>Latitude: {this.state.latitude}</Text>
      <Text style={styles.textR}>Longitude: {this.state.longitude}</Text>
{this.state.error ? <Text>Error: {this.state.error}</Text> : null}


<Text style={styles.text}> Water Resource </Text>
<RadioButton currentValue={this.state.value} value={0} onPress={this.handleOnPress.bind(this)}>
                <Text style={styles.textR}>Yes</Text>
</RadioButton>
<RadioButton currentValue={this.state.value} value={1} onPress={this.handleOnPress.bind(this)}>
                <Text style={styles.textR}>No</Text>
                </RadioButton>

<TouchableHighlight onPress={this.onSavePressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Save
          </Text>
</TouchableHighlight>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  text: {
    color: '#FFF',
    fontSize: 23,
    textAlign: 'left',
  },
  textR: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'left',
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default LandDetails;
