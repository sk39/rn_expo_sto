import {Animated} from "react-native";
import {observer} from "mobx-react";
import React, {Component} from "react";

interface Props {
    phase: Animated.Value;
}

@observer
export default class AnimatedCardContents extends Component<Props> {
    render() {
        const {phase} = this.props;
        const ani = {
            contents: {
                transform: [
                    {
                        translateY: phase.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                        })
                    },
                ],
                opacity: phase.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                })
            }
        };

        return (
            <Animated.View style={ani.contents}>
                {this.props.children}
            </Animated.View>
        )
    }
}


