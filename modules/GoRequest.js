import React from 'react'
import {Alert} from 'react-native'

export default class GoRequest{
    getRoutes = (oLat, oLong, dLat, dLong, cb) => {
        fetch('http://52.211.183.249:8080/getRoutes?oLat=' + oLat + '&oLong=' + oLong + '&dLat=' + dLat + '&dLong=' + dLong)
        .then((response) => response.json())
        .then((responseJson) => {
            let route = [];
            for (let p of responseJson.points) {
                route.push({
                    latitude: p.point.lat,
                    longitude: p.point.lng
                });
            }
            console.log(route);
            cb(route);
        })
        .catch((error) => {
            cb(error.message.toString());
            Alert.alert('ERROR', error.message.toString());
        });
    }
};