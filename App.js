/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import OneSignal from "react-native-onesignal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, date: "" };
  }

  //OneSignal Init Code
  componentDidMount() {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("02259d41-3e1e-40de-89cd-5749271f3203");
    //END OneSignal Init Code

    //Prompt for push on iOSr
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.warn("Prompt response:", response);
    });

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.warn(
          "OneSignal: notification will show in foreground:",
          notificationReceivedEvent
        );
        let notification = notificationReceivedEvent.getNotification();
        const data = notification.additionalData;
        console.warn("notification: ", notification.body, notification.title);
        alert(notification.body);

        console.warn("additionalData: ", data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      }
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.warn("OneSignal: notification opened:", notification);
    });
  }
  onClick() {
    this.setState({ isLoading: true });
    var jsonBody = {
      app_id: "02259d41-3e1e-40de-89cd-5749271f3203",
      included_segments: ["Subscribed Users"],
      data: {
        foo: "bar",
      },
      contents: {
        title: "Test Notification\n",
        en: "English Message",
      },
    };
    fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic YmJjNjQxODctZTYxMS00ODM1LTg4ODYtNmUzY2EyNGEwOTk4",
      },
      body: JSON.stringify(jsonBody),
    })
      .then((httpResponse) => {
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  }
  onClick1() {
    let date = new Date();
    // date.setHours(date.getHours() + 5);
    // date.setMinutes(date.getMinutes() + 30);
    date.setSeconds(date.getSeconds() + 10);
    date = new Date(date);
    this.setState({ isLoading: true });
    var jsonBody = {
      app_id: "02259d41-3e1e-40de-89cd-5749271f3203",
      included_segments: ["Subscribed Users"],
      data: {
        foo: "bar",
      },
      contents: {
        title: "Test Notification\n",
        en: "English Message",
      },
      send_after: new Date(date),
    };
    this.setState({ date: date });
    fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic YmJjNjQxODctZTYxMS00ODM1LTg4ODYtNmUzY2EyNGEwOTk4",
      },
      body: JSON.stringify(jsonBody),
    })
      .then((httpResponse) => {
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 17 }}>
            Welcome to React Native Onesignal Notification
          </Text>
          <Text style={{ fontSize: 17 }}>{this.state.date.toString()}</Text>
          <View
            style={{
              height: "50%",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {this.state.isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null}
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 15,
                backgroundColor: "red",
              }}
              onPress={() => this.onClick()}
            >
              <Text
                style={{ fontSize: 14, color: "white", fontWeight: "bold" }}
              >
                Send Notification
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: "40%",
              width: "100%",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 15,
                margin: 10,
                backgroundColor: "red",
              }}
              onPress={() => this.onClick1()}
            >
              <Text
                style={{ fontSize: 14, color: "white", fontWeight: "bold" }}
              >
                Send Notification after 10 Sec
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default App;
