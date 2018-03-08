/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    Text,
    StatusBar,
    TextInput,
    View
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from "./Styles"
import GoRequest from "./modules/GoRequest";

mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8ec3b9"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1a3646"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#64779e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#334e87"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6f9ba5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3C7680"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#304a7d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c6675"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#255763"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#b0d5ce"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3a4762"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0e1626"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4e6d70"
            }
        ]
    }
];

var gr = new GoRequest();

export default class App extends Component<{}> {

    constructor (props) {
        super(props);

        this.state = {
            region: {
                latitude: 53.3421508,
                longitude: -6.2535567,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            initialRegion: {
                latitude: 53.3421508,
                longitude: -6.2535567,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            searchDestinationVis: false,
            oLat: null,
            oLong: null,
            dLat: null,
            dLong: null,
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#3F51B5"
                    barStyle="light-content"
                />
                <MapView
                    style={styles.map}
                    initialRegion={this.state.initialRegion}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange.bind(this)}
                    customMapStyle={mapStyle}
                    zoomEnabled={true}
                    scrollEnabled={true}
                />
                <View style={styles.locationSearchView}>
                    <View style={styles.locationSearchViewTop}>
                        <TouchableHighlight style={styles.searchBarButtons}>
                            <Icon
                                style={styles.searchBarIcons}
                                name="menu"
                            />
                        </TouchableHighlight>
                        <GooglePlacesAutocomplete
                            style={styles.locationSearch}
                            placeholder='Enter Location'
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                                this.setState ({region: {
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                },
                                searchDestinationVis: true,
                                oLat: details.geometry.location.lat,
                                oLong: details.geometry.location.lng,});
                            }}
                            getDefaultValue={() => ''}
                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyCOPygpIBgzbsKYbr1q0Yqc7rvPv6bnhv0',
                                language: 'en', // language of the results
                            }}
                            styles={{
                                container: {
                                    flex: 7
                                },
                                textInputContainer: {
                                    width: '100%'
                                },
                                description: {
                                    fontWeight: 'bold'
                                }
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                types: 'address'
                            }}
                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />
                        <TouchableHighlight style={styles.searchBarButtons}
                            onPress={() => gr.getRoutes(this.state.oLat, this.state.oLong, this.state.dLat, this.state.dLong)}>
                            <Icon
                                style={styles.searchBarIcons}
                                name="search"
                            />
                        </TouchableHighlight>
                    </View>
                    <GooglePlacesAutocomplete
                        style={styles.locationSearch}
                        placeholder='Enter Destination'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                            this.setState ({region: {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            },
                            dLat: details.geometry.location.lat,
                            dLong: details.geometry.location.lng,})
                        }}
                        getDefaultValue={() => ''}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyCOPygpIBgzbsKYbr1q0Yqc7rvPv6bnhv0',
                            language: 'en', // language of the results
                        }}
                        styles={{
                            container: (!this.state.searchDestinationVis && styles.displayNone) || (styles.displayFlex),
                            textInputContainer: {
                                width: '70%'
                            },
                            description: {
                                width: '70%',
                                fontWeight: 'bold'
                            }
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'address'
                        }}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                </View>
            </View>
        );
    }
}