import {Animated, Easing} from "react-native";
import {observer} from "mobx-react";
import React, {Component} from "react";
import {observable} from "mobx";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import Layout from "@constants/Layout";

interface Props {
    style: any;
    imageWrapperStyle: any;
    scrollY?: Animated.Value;
}

@observer
export default class AnimatedCard extends Component<Props> {

    @observable phase = new Animated.Value(0);

    open(duration): Promise<any> {
        return new Promise(resolve => {
            Animated.sequence([
                Animated.timing(this.phase, {
                    easing: Easing.inOut(Easing.ease),
                    toValue: 1,
                    duration,
                    delay: 0,
                    useNativeDriver: false,
                }),
            ]).start(resolve);
        })
    }

    close(duration): Promise<any> {
        return new Promise(resolve => {
            Animated.sequence([
                Animated.timing(this.phase, {
                    easing: Easing.inOut(Easing.ease),
                    toValue: 0,
                    duration,
                    delay: 0,
                    useNativeDriver: false,
                }),
            ]).start(resolve);
        })
    }

    render() {
        const {style, imageWrapperStyle} = this.props;
        const CardLayout = Layout.card;
        const ani = {
            card: {
                marginHorizontal: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                }),
                borderRadius: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                }),
                ...getPlatformElevation(2)
            },
            image: {
                height: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [CardLayout.imageHeight, CardLayout.imageHeightLarge],
                })
            },
            imageScale: {
                transform: [
                    {
                        translateY: this.props.scrollY.interpolate({
                            inputRange: [-200, 0, 200],
                            outputRange: [0, 0, 60],
                        })
                    }
                ]
            }
        };

        return (
            <Animated.View style={[style, ani.card]}>
                <Animated.View style={ani.imageScale}>
                    <Animated.View style={[imageWrapperStyle, ani.image]}>
                        {this.props.children[0]}
                    </Animated.View>
                </Animated.View>
                {this.props.children[1]}
            </Animated.View>
        )
    }

}

