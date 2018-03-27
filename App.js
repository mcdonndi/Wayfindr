/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    TouchableHighlight,
    StatusBar,
    View,
    PermissionAndroid
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import SideMenu from 'react-native-side-menu';
import Menu from './components/Menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from "./Styles"
import GoRequest from "./modules/GoRequest";

async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                'title': 'Wayfindr Location Permission',
                'message': 'Wayfindr needs access to your location so it can be used to live update your journey'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
        } else {
            console.log("Location permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}

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

let gr = new GoRequest();

const isFunction = input => typeof input === 'function';
renderIf = predicate => elemOrThunk =>
    predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;

export default class App extends Component<{}> {

    constructor (props) {
        super(props);

        this.state = {
            mapView: {
                latitude: 53.3421508,
                longitude: -6.2535567,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            originMarker: {
                latitude: 53.3421508,
                longitude: -6.2535567,
            },
            destinationMarker: {
                latitude: 53.3421508,
                longitude: -6.2535567,
            },
            initialRegion: {
                latitude: 53.3421508,
                longitude: -6.2535567,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            searchDestinationVis: false,
            showOriginMarker: false,
            showDestinationMarker: false,
            oLat: null,
            oLong: null,
            dLat: null,
            dLong: null,
            RouteID: null,
            route: [],
            menuOpen: false,
            maxSoundLevel: 60
        };
    }

    handleSoundLevel = (soundLevel) => {
        this.setState({maxSoundLevel: soundLevel});
    };

    calculateDelta = (northEast, southWest) => {
        return northEast - southWest;
    };

    getClosestPointToCurrentLocation = () => {
        let shortestDis = null;
        let index = null;
        for (let [i, p] of this.state.route.entries()) {
            let d = this.getDistanceFromCurrentLocation(p.latitude, p.longitude);
            if (d < shortestDis || shortestDis === null) {
                shortestDis = d;
                index = i;
            }
        }
        return index;
    };

    getDistanceFromCurrentLocation = (lat, lng) => {
        navigator.geolocation.getCurrentPosition( (position) => {
            let currLat = position.coords.latitude;
            let currLng = position.coords.longitude;
            let R = 6371e3; // metres
            let phi1 = lat * Math.PI / 180;
            let phi2 = currLat * Math.PI / 180;
            let deltaPhi = (currLat-lat) * Math.PI / 180;
            let deltaLambda = (currLng-lng) * Math.PI / 180;

            let a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            return R * c;
        })
    };

    checkForUpdates = () => {
        if(this.state.route.length > 0) {
            console.log('Checking Go for update');
            let index = this.getClosestPointToCurrentLocation();
            gr.getUpdatedRoutes(this.state.RouteID, index, (route) => {
                if (route.noChange === false) {
                    Alert.alert(
                        'Environment Update',
                        'An upcoming area on your route is now conflicting with your preferences.\n' +
                        'Would you like to update your route?',
                        [
                            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => {
                                console.log('OK Pressed');
                                this.state.RouteID = route.RouteID;
                                this.state.route = route.points;
                                console.log(this.state.route);
                                this.forceUpdate();
                            }},
                        ],
                        { cancelable: false }
                    );
                }
            })
        }
    };

    componentDidMount() {
        this._interval = setInterval(this.checkForUpdates, 60000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        return (
            <SideMenu
                menu={<Menu
                    onChangeSoundLevel={this.handleSoundLevel}
                />}
                isOpen={this.state.menuOpen}
            >
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#3F51B5"
                        barStyle="light-content"
                    />
                    <MapView
                        style={styles.map}
                        initialRegion={this.state.initialRegion}
                        region={this.state.mapView}
                        customMapStyle={mapStyle}
                        zoomEnabled={true}
                        scrollEnabled={true}
                    >
                        <Polyline
                            coordinates={this.state.route}
                            strokeColor={"#E8EAF6"} // fallback for when `strokeColors` is not supported by the map-provider
                            strokeWidth={6}
                        />
                        {renderIf(this.state.showOriginMarker)(
                            <Marker
                                pinColor={'#3F51B5'}
                                coordinate={this.state.originMarker}
                            />
                        )}
                        {renderIf(this.state.showDestinationMarker)(
                            <Marker
                                pinColor={'#E8EAF6'}
                                coordinate={this.state.destinationMarker}
                            />
                        )}
                    </MapView>
                    <View style={styles.locationSearchView}>
                        <View style={styles.locationSearchViewTop}>
                            <TouchableHighlight style={styles.searchBarButtons}
                                onPress={() => {
                                    this.state.menuOpen = true;
                                    this.forceUpdate();
                                }}
                            >
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
                                    this.setState ({
                                        mapView: {
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                            latitudeDelta: this.calculateDelta(details.geometry.viewport.northeast.lat, details.geometry.viewport.southwest.lat),
                                            longitudeDelta: this.calculateDelta(details.geometry.viewport.northeast.lng, details.geometry.viewport.southwest.lng),
                                        },
                                        originMarker: {
                                        latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                        },
                                        searchDestinationVis: true,
                                        showOriginMarker: true,
                                        oLat: details.geometry.location.lat,
                                        oLong: details.geometry.location.lng,
                                    });
                                }}
                                getDefaultValue={() => ''}
                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyCOPygpIBgzbsKYbr1q0Yqc7rvPv6bnhv0',
                                    language: 'en', // language of the results
                                }}
                                styles={{
                                    container: {
                                        margin: 0,
                                        height: '100%',
                                        flex: 7
                                    },
                                    textInputContainer: {
                                        backgroundColor: '#E8EAF6',
                                        padding: 0,
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
                                onPress={() => {
                                    gr.getRoutes(this.state.oLat, this.state.oLong, this.state.dLat, this.state.dLong, this.state.maxSoundLevel, (route) => {
                                        this.state.RouteID = route.RouteID;
                                        this.state.route = route.points;
                                        console.log(this.state.route);
                                        this.forceUpdate();
                                    });
                                }}>
                                <Icon
                                    style={styles.searchBarIcons}
                                    name="search"
                                />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.locationSearchViewBottom}>
                            <GooglePlacesAutocomplete
                                style={styles.locationSearch}
                                placeholder='Enter Destination'
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                listViewDisplayed='auto'    // true/false/undefined
                                fetchDetails={true}
                                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                    console.log(data, details);
                                    this.setState ({
                                        mapView: {
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                            latitudeDelta: this.calculateDelta(details.geometry.viewport.northeast.lat, details.geometry.viewport.southwest.lat),
                                            longitudeDelta: this.calculateDelta(details.geometry.viewport.northeast.lng, details.geometry.viewport.southwest.lng),
                                        },
                                        destinationMarker: {
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                        },
                                        showDestinationMarker: true,
                                        dLat: details.geometry.location.lat,
                                        dLong: details.geometry.location.lng,
                                    })
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
                                        backgroundColor: '#E8EAF6',
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
                                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                            />
                        </View>
                    </View>
                </View>
            </SideMenu>
        );
    }
}