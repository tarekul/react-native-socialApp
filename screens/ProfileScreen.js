import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import Fire from "../Fire";

export default class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <TouchableOpacity onPress={() => Fire.shared.signOut()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
