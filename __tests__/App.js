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
