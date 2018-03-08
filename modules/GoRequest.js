import React from 'react'
import {Alert} from 'react-native'

export default class GoRequest{
    getRoutes = (oLat, oLong, dLat, dLong) => {
        return fetch('http://52.211.183.249:8080/getRoutes?oLat=' + oLat.toString() + '&oLong=' + oLong.toString() + '&dLat=' + oLat.toString() + '&dLong=' + oLong.toString())
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson
        })
        .catch((error) => {
            Alert.alert('ERROR', error.message.toString());
            console.error(error);
            });
    }
};