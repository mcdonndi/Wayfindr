import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    locationSearchView: {
        width: '80%',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
    },
    locationSearchViewTop: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        backgroundColor: '#E8EAF6',
    },
    displayNone: {
        display: 'none'
    },
    displayFlex: {
        display: 'flex'
    },
    searchBarButtons: {
        flex: 1.5,
    },
    searchBarIcons: {
        ...StyleSheet.absoluteFillObject,
        fontSize: 24,
        color: '#3F51B5',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    locationSearch: {
        flex: 7,
    },
    menuView: {
        backgroundColor: '#E8EAF6',
    },
    menuTitleView: {
        backgroundColor: '#3F51B5',
        padding: 10
    },
    menuTitle: {
        fontSize: 21,
        color: '#E8EAF6',
    },
    menuContentView: {
        padding: 10
    },
    menuContent: {
        fontSize: 15,
        color: '#000',
    }
});