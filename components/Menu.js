import React, { Component } from 'react';
import { ScrollView, View, Text, Slider } from 'react-native';
import styles from "../Styles"

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxSoundLevel: 60,
        };
    }

    change(value) {
        this.setState(() => {
            return {
                maxSoundLevel: parseFloat(value),
            };
        });
        this.props.onChangeSoundLevel(value);
    }

    render() {
        return (
            <View>
                <View style={styles.menuTitleView}>
                    <Text style={styles.menuTitle}>
                        User Preferences
                    </Text>
                </View>
                <View style={styles.menuContentView}>
                    <Text style={styles.menuContent}>
                        Max sound level(dB): {this.state.maxSoundLevel}
                    </Text>
                    <Slider
                        minimumValue={20}
                        maximumValue={150}
                        step={1}
                        onValueChange={this.change.bind(this)}
                        value={60}
                    />
                </View>
            </View>
        );
    }
}
export default Menu;