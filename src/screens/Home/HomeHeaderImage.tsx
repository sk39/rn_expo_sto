import React, {Component} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import Logo from "@common/components/Image/Logo";

interface Props {
    scroll: Animated.Value
}

@observer
export default class HomeHeaderImage extends Component<Props> {

    render() {
        const ani = {
            container: {
                transform: [
                    {
                        translateY: this.props.scroll.interpolate({
                            inputRange: [-200, 0, 200],
                            outputRange: [0, 0, -14],
                        })
                    }
                ]
            },
        }
        return (
            <Animated.View style={[styles.container, ani.container]}>
                <Logo gray size={620}/>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: -183,
        left: -130,
        opacity: 0.3
    }
});
