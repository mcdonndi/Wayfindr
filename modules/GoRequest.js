import React from 'react'
import {Alert} from 'react-native'

export default class GoRequest{
    getRoutes = (oLat, oLong, dLat, dLong, maxSoundLevel, cb) => {
        fetch('http://52.211.183.249:8080/getRoutes?oLat=' + oLat + '&oLong=' + oLong + '&dLat=' + dLat + '&dLong=' + dLong + '&maxSoundLevel=' + maxSoundLevel)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            let route = {
                RouteID: responseJson.RouteID,
                points: []};
            for (let p of responseJson.Points) {
                route.points.push({
                    latitude: p.Point.lat,
                    longitude: p.Point.lng
                });
            }
            console.log(route);
            cb(route);
        })
        .catch((error) => {
            cb(error.message.toString());
            Alert.alert('ERROR', error.message.toString());
        });
    };

    getUpdatedRoutes = (RouteID, pnum, cb) => {
        fetch('http://52.211.183.249:8080/getRoutes?rid=' + RouteID + '&pnum=' + pnum)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.noChange === false) {
                    let route = {
                        RouteID: responseJson.RouteID,
                        noChange: responseJson.noChange,
                        points: []
                    };
                    for (let p of responseJson.Points) {
                        route.points.push({
                            latitude: p.Point.lat,
                            longitude: p.Point.lng
                        });
                    }
                    console.log(route);
                    cb(route);
                } else {
                    cb({
                        noChange: responseJson.noChange,
                    });
                }
            })
            .catch((error) => {
                cb(error.message.toString());
                Alert.alert('ERROR', error.message.toString());
            });
    };
};