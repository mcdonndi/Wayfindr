import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-maps', () => {
    const React = require.requireActual('react');
    const MapView = require.requireActual('react-native-maps');

    class MockCallout extends React.Component {
        render() {
            return React.createElement('Callout', this.props, this.props.children);
        }
    }

    class MockMarker extends React.Component {
        render() {
            return React.createElement('Marker', this.props, this.props.children);
        }
    }

    class MockMapView extends React.Component {
        render() {
            return React.createElement('MapView', this.props, this.props.children);
        }
    }

    MockCallout.propTypes = MapView.Callout.propTypes;
    MockMarker.propTypes = MapView.Marker.propTypes;
    MockMapView.propTypes = MapView.propTypes;
    return MockMapView;
});

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
