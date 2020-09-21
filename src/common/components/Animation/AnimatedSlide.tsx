import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    delay: number;
    duration?: number;
    easing?: (value: number) => number;
    direction: "up" | "toLeft";
    changeOpacity?: boolean;
    moveDistance?: number;
}

@observer
export default class AnimatedSlide extends Component<Props> {

    static defaultProps = {
        duration: 400,
        easing: Easing.out(Easing.back()),
        direction: "up",
        changeOpacity: true,
        moveDistance: 16,
    };

    @observable phase = new Animated.Value(0);

    componentDidMount() {
        const {delay, duration, easing} = this.props;
        Animated.timing(this.phase, {
            easing,
            toValue: 1,
            duration,
            delay,
            useNativeDriver: true,
        }).start();
    }

    getDirectionAnimation() {
        const {direction, moveDistance} = this.props;

        if (direction === "up")
            return [{
                translateY: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [moveDistance, 0],
                }),
            }];

        if (direction === "toLeft")
            return [{
                translateX: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [moveDistance, 0],
                }),
            }];
    }

    render() {
        const {changeOpacity} = this.props;
        const aniStyle = {
            opacity: changeOpacity ? this.phase.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }) : 1,
            transform: this.getDirectionAnimation()
        };

        return (
            <Animated.View style={aniStyle}>
                {this.props.children}
            </Animated.View>
        );
    }
}
