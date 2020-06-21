import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Notification Screen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
