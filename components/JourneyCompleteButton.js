import React, { Component } from 'react';
import { TouchableHighlight, Text, View} from 'react-native';
import styles from "../Styles"

class JourneyCompleteButton extends Component {

    render() {
        return (
            <View
                style={styles.journeyCompleteButton}
            >
                <TouchableHighlight
                    onPress={() => {
                        this.props.onRouteFinish();
                    }}
                >
                    <Text style={styles.journeyCompleteText}>
                        Finished Journey
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
export default JourneyCompleteButton;