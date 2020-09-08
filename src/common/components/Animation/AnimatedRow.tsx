import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    delay: number;
    duration?: number;
    easing?: (value: number) => number;
    moveDistance?: number;
}

@observer
export default class AnimatedRow extends Component<Props> {

    static defaultProps = {
        duration: 700,
        easing: Easing.out(Easing.back()),
        moveDistance: 16,
    };

    @observable opacity = new Animated.Value(0);
    @observable translateY = new Animated.Value(16);

    componentDidMount() {
        const {delay, duration, easing, moveDistance} = this.props;
        this.opacity.setValue(0);
        this.translateY.setValue(moveDistance);
        Animated.parallel([
            Animated.timing(this.opacity, {
                easing,
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(this.translateY, {
                easing,
                toValue: 0,
                duration,
                delay,
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
