import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    delay: number
}

@observer
export default class AnimatedRow extends Component<Props> {

    @observable opacity = new Animated.Value(0);
    @observable translateY = new Animated.Value(16);

    componentDidMount() {
        this.opacity.setValue(0);
        this.translateY.setValue(16);
        Animated.parallel([
            Animated.timing(this.opacity, {
                easing: Easing.out(Easing.back()),
                toValue: 1,
                duration: 700,
                delay: this.props.delay,
                useNativeDriver: true,
            }),
            Animated.timing(this.translateY, {
                easing: Easing.out(Easing.back()),
                toValue: 0,
                duration: 700,
                delay: this.props.delay,
                useNativeDriver: true,
            }),
        ]).start();
    }

    render() {
        const aniStyle = {
            opacity: this.opacity,
            transform: [{translateY: this.translateY}],
        };

        return (
            <Animated.View style={aniStyle}>
                {this.props.children}
            </Animated.View>
        );
    }
}
