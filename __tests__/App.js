import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-maps', () => {
    const React = require.requireActual('react');
    const MapView = require.requireActual('react-native-maps');

    class MockMapView extends React.Component {
        static Marker = props => React.createElement('Marker', props, props.children);
        static Polyline = props => React.createElement('Polyline', props, props.children);

        render() {
            return React.createElement('MapView', this.props, this.props.children);
        }
    }

    MockMapView.propTypes = MapView.propTypes;
    return MockMapView;
});

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('calculateDeltas function', () => {
    it('returns the correct maxSoundLevel', () => {
        let app = new App();
        let returnedValue = app.calculateDelta(4, 2);
        expect(returnedValue).toBe(2);
    })
});

describe('calculateRouteMapView function', () => {
    it('returns the expected mapView object', () => {
        let app = new App();
        let returnedValue = app.calculateRouteMapview(-3, -1, 3, 5, 5, 0, 0, -5);
        expect(returnedValue).toEqual({
            latitude: 1,
            longitude: 0,
            latitudeDelta: 4,
            longitudeDelta: 10
        });
    })
});
