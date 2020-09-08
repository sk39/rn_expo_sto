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
export default class AnimatedSlideUp extends Component<Props> {

    static defaultProps = {
        duration: 400,
        easing: Easing.out(Easing.back()),
        moveDistance: 56,
    };

    @observable translateY = new Animated.Value(56);

    componentDidMount() {
        const {delay, duration, easing, moveDistance} = this.props;
        this.translateY.setValue(moveDistance);
        Animated.parallel([
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
            transform: [{translateY: this.translateY}],
        };

        return (
            <Animated.View style={aniStyle}>
                {this.props.children}
            </Animated.View>
        );
    }
}
