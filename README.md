# Wayfindr
Mobile application for project in the Advanced Software Engineering module in Trinity College Dublin.

The following instructions apply to running the application on Android

## Dependencies
* Node v4
* Android SDK (Marshmallow)
* React Native CLI

## Setup
First step is to clone the repository
```
git clone https://github.com/mcdonndi/Wayfindr.git
```

Next you need to install all the node dependencies
```
npm install
```

To run the application, use the command
```
npm run android
```

The above command will only work if there is an Android emulator running on the machine or if an android phone with developer setting enabled is connected to the machine. Once the command is run the app will be loaded onto the Android device.

### Installing Android Emulator
The Android emulator can be installed while installing the Android SDK. It can then be run by starting Android Studio and clicking the AVD button in the top right corner of the IDE.

### Developer Options for Android
In order to enable developer options for Android you must follow the below steps:
* Navigate to the settings menu
* Scroll down to "About phone" and tap it
* Scroll down to "Build number"
* Tap "Build Number" 7 times
After this the developer settings should be enabled on the Android device