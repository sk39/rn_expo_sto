import React, {Component} from 'react';
import {BackHandler} from 'react-native'

interface Props {
    navigation: Navigation
    onPress?: () => boolean;
}

export default class BackButtonBehavior extends Component<Props> {

    componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    handleBackButtonPressAndroid = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }

        if (this.props.onPress) {
            return this.props.onPress();
        } else {
            this.props.navigation.navigate("Home");
            return true;
        }
    };

    render() {
        return null;
    }
}
