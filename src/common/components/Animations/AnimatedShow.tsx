import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    show: boolean,
    // containerStyle?: any,
    duration?: number,
    delay?: number
}

@observer
export default class AnimatedShow extends Component<Props> {

    @observable opacity = new Animated.Value(0);

    componentDidMount() {
        if (this.props.show) {
            this.startAnimation();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.show && this.props.show) {
            this.startAnimation();
        } else if (prevProps.show && !this.props.show) {
            this.opacity.setValue(0)
        }
    }

    startAnimation() {
        const {duration, delay} = this.props;
        this.opacity.setValue(0);
        Animated.parallel([
            Animated.timing(this.opacity, {
                easing: Easing.out(Easing.back()),
                toValue: 1,
                duration: duration || 700,
                delay: delay || 0,
                useNativeDriver: true,
            }),
        ]).start();
    }

    render() {
        const aniStyle = {
            opacity: this.opacity,
        };

        return (
            <Animated.View style={aniStyle}>
                {this.props.children}
            </Animated.View>
        );
    }
}
