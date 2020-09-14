import {Animated, StyleProp, View, ViewStyle} from "react-native";
import {observer} from "mobx-react";
import React, {Component} from "react";

interface Props {
    style: any;
    imageWrapperStyle: StyleProp<ViewStyle>;
    scrollY: Animated.Value;
}

@observer
export default class ForDirectCardIOS extends Component<Props> {

    render() {
        const {style, scrollY, imageWrapperStyle} = this.props;
        const ani = {
            container: {
                transform: [
                    {
                        translateY: scrollY.interpolate({
                            inputRange: [-200, 0, 200],
                            outputRange: [-200, -1, -1],
                        })
                    }
                ]
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
                <View style={style}>
                    <Animated.View style={ani.imageScale}>
                        <View style={imageWrapperStyle}>
                            {this.props.children[0]}
                        </View>
                    </Animated.View>
                    {this.props.children[1]}
                </View>
            </Animated.View>
        )
    }
}

