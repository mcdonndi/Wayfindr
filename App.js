/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import MapView from 'react-native-maps';


export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.startPoint = {text: ''};
    }

    render() {
        const { region } = this.props;
        console.log(region);

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 53.3421508,
                        longitude: -6.2535567,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#3F51B5',
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#E8EAF6',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#E8EAF6',
    marginBottom: 5,
  },
});
