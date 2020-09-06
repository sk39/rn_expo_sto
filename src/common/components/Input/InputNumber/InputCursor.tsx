import React, {Component} from 'react';
import {Animated, Easing, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    barStyle?: StyleProp<ViewStyle>
}

@observer
export default class InputCursor extends Component<Props> {

    @observable opacity = new Animated.Value(0);

    componentDidMount() {
        this.opacity.setValue(0);
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.opacity, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.delay(300),
                Animated.timing(this.opacity, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.delay(200),
            ])
        ).start();
    }

    render() {
        const {barStyle} = this.props;
        const aniStyle = {
            opacity: this.opacity,
        };

        return (
            <Animated.View style={aniStyle}>
                <View style={[styles.bar, barStyle]}/>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        height: 22,
        width: 2.5,
        marginTop: 2,
        backgroundColor: "#24c3d2"
    }
});
