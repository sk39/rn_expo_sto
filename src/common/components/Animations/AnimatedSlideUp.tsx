import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    delay: number
}

@observer
export default class AnimatedSlideUp extends Component<Props> {

    // @observable opacity = new Animated.Value(0);
    @observable translateY = new Animated.Value(56);

    componentDidMount() {
        this.translateY.setValue(56);
        Animated.parallel([
            Animated.timing(this.translateY, {
                easing: Easing.out(Easing.back()),
                toValue: 0,
                duration: 400,
                delay: this.props.delay,
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
