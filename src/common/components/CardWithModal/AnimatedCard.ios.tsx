import {Animated, Easing} from "react-native";
import {observer} from "mobx-react";
import React, {Component} from "react";
import {observable} from "mobx";
import Layout from "@constants/Layout";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";

interface Props {
    style: any;
    imageWrapperStyle: any;
    scrollY?: Animated.Value;
}

@observer
export default class AnimatedCardIOS extends Component<Props> {

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
                    easing: Easing.cubic,
                    toValue: 0,
                    duration,
                    delay: 0,
                    useNativeDriver: false,
                }),
            ]).start(resolve);
        })
    }

    render() {
        const {style, scrollY, imageWrapperStyle} = this.props;
        const winWidth = Layout.window.width;
        const CardLayout = Layout.card;
        const ani = {
            container: {
                transform: [
                    {
                        translateY: scrollY.interpolate({
                            inputRange: [-200, 0, 200],
                            outputRange: [-200, -1, -1],
                        })
                    }
                ],
                ...getPlatformElevation(2)
            },
            card: {
                marginHorizontal: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                }),
                borderRadius: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                }),
                width: this.phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [winWidth - 24, winWidth],
                }),
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
                            outputRange: [0, 1, 100],
                        })
                    },
                    {
                        scale: this.props.scrollY.interpolate({
                            inputRange: [-200, 0, 200],
                            outputRange: [2, 1, 1],
                        })
                    }
                ]
            }
        };

        return (
            <Animated.View style={[ani.container]}>
                <Animated.View style={[style, ani.card]}>
                    <Animated.View style={ani.imageScale}>
                        <Animated.View style={[imageWrapperStyle, ani.image]}>
                            {this.props.children[0]}
                        </Animated.View>
                    </Animated.View>
                    {this.props.children[1]}
                </Animated.View>
            </Animated.View>
        )
    }

}

