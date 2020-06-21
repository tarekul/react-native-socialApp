import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import * as firebase from "firebase";

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => this.setState({ errorMessage: err.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require("../assets/icon.png")}
          style={{
            height: 80,
            width: 80,
            alignSelf: "center",
            marginVertical: 32,
          }}
        ></Image>
        <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            New to SocialApp?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
  },
  errorMessage: {
    marginHorizontal: 30,
    height: 72,
    justifyContent: "center",
  },
  form: {
    marginHorizontal: 30,
    marginBottom: 48,
    marginTop: 20,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    height: 40,
    fontSize: 15,
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: "#161F3D",
  },
  button: {
    backgroundColor: "#38A1F3",
    marginHorizontal: 30,
    height: 52,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
