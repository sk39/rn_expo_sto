import React, {Component} from "react";
import {Animated, StyleProp, View, ViewStyle} from "react-native";
import {observer} from "mobx-react";

interface Props {
    style: any;
    imageWrapperStyle: StyleProp<ViewStyle>;
    scrollY: Animated.Value;
}

@observer
export default class ForDirectCard extends Component<Props> {

    render() {
        const {style, imageWrapperStyle} = this.props;
        const ani = {
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
            <View style={style}>
                <Animated.View style={ani.imageScale}>
                    <View style={imageWrapperStyle}>
                        {this.props.children[0]}
                    </View>
                </Animated.View>
                {this.props.children[1]}
            </View>
        )
    }
}
