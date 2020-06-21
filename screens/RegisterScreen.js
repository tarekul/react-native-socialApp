import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Fire from "../Fire";

import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";

export default class RegisterScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    user: {
      name: "",
      email: "",
      password: "",
      avatar: null,
    },
    errorMessage: null,
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  handleSignUp = () => {
    Fire.shared.createUser(this.state.user);
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require("../assets/icon.png")}
          style={{ alignSelf: "center" }}
        ></Image>
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={32}
            color="#FFF"
          ></Ionicons>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={styles.greeting}
          >{`Hello!\nSign up to get started.`}</Text>
          <TouchableOpacity
            style={styles.avatarPlaceholder}
            onPress={this.handlePickAvatar}
          >
            <Image
              source={{ uri: this.state.user.avatar }}
              style={styles.avatar}
            />
            <Ionicons
              name="ios-add"
              size={40}
              color="#FFF"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.form}
        >
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(name) =>
                this.setState({ user: { ...this.state.user, name } })
              }
              value={this.state.user.name}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) =>
                this.setState({ user: { ...this.state.user, email } })
              }
              value={this.state.user.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) =>
                this.setState({ user: { ...this.state.user, password } })
              }
              value={this.state.user.password}
            ></TextInput>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign in</Text>
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
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    backgroundColor: "#E1E2E6",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    marginTop: 48,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
