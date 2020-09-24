import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    delay: number;
    duration?: number;
    easing?: (value: number) => number;
    changeOpacity?: boolean;
    initScale?: number;
}

@observer
export default class AnimatedScale extends Component<Props> {

    static defaultProps = {
        duration: 240,
        easing: Easing.out(Easing.back()),
        changeOpacity: true,
        initScale: 0.6,
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

    render() {
        const {changeOpacity, initScale} = this.props;
        const aniStyle = {
            opacity: changeOpacity ? this.phase.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }) : 1,
            transform: [{
                scale: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [initScale, 1],
                }),
            }]
        };

        return (
            <Animated.View style={aniStyle}>
                {this.props.children}
            </Animated.View>
        );
    }
}
