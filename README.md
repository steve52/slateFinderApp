This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

To have access to native code, the project was [ejected](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md).

Install the React-Native CLI

```shell
$ npm install -g react-native-cli
```
# Running in iOS simulator (on macOS)
* Run the app
```shell
$ react-native run-ios
```

# Running in Android simulator (on macOS)
The easiest way to get an Android simulator is to install Android Studio. That will come with the AVD (Android Virtual Device) Manager
* Open any project in Android Studio
* Start up AVD (Android Virtual Device) Manager by clicking on the icon in the top right of the window
![AVD Manager icon in Android Studio](https://user-images.githubusercontent.com/961994/44492419-710c3080-a632-11e8-8a18-2bb6c9bfb7a8.png "AVD Manager icon in Android Studio")
* Choose a virtual device (or create a new one)
* Run the app
```shell
$ react-native run-android
```

# Running on an Android device
* On your device, enable debugging over USB
* Connect your device to your machine with a USB cable
* Run the app
```shell
$ react-native run-android
```

# Java version
React-native doesn't work with any version greater than Java 8, so make sure to check your version

```shell
$ java -version
```

## Helpful links
* [Getting Started with React-Native](https://facebook.github.io/react-native/docs/getting-started)
  * Choose your desired set-up

    ![](https://user-images.githubusercontent.com/961994/44492485-af095480-a632-11e8-9cd3-983bd31b74cf.png)
* [Running on iOS simulator or device](https://facebook.github.io/react-native/docs/running-on-simulator-ios)