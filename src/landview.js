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

class LandView extends Component {
  render() {
    return (
    <View style={styles.container} >
  <Text> Hi </Text>
    </View>

  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1c313a',
    padding: 10,
    paddingTop: 80
  }
});

export default LandView;
