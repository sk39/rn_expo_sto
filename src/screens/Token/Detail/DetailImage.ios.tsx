import {Animated, ImageSourcePropType, StyleSheet, View} from "react-native";
import {observer} from "mobx-react";
import React, {Component} from "react";
import Layout from "@constants/Layout";
import CashImage from "@common/components/Image/CashImage";

interface Props {
    source: ImageSourcePropType;
    scrollY: Animated.Value;
}

@observer
export default class DetailImageIos extends Component<Props> {

    render() {
        const {source, scrollY} = this.props;
        const h = Layout.card.imageHeightLarge;
        const ani = {
            container: {
                transform: [
                    {
                        translateY: scrollY.interpolate({
                            inputRange: [-h, 0, h],
                            outputRange: [-h, -1, -1],
                        })
                    }
                ]
            },
            imageScale: {
                opacity: this.props.scrollY.interpolate({
                    inputRange: [0, h / 1.3],
                    outputRange: [1, 0],
                }),
                transform: [
                    {
                        translateY: this.props.scrollY.interpolate({
                            inputRange: [-h, 0, h],
                            outputRange: [0, 1, h / 2],
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
                <Animated.View style={ani.imageScale}>
                    <View style={styles.imageWrapper}>
                        <CashImage style={styles.image}
                                   source={source}/>
                    </View>
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    imageWrapper: {
        overflow: 'hidden',
        padding: 0,
        width: "100%",
        height: Layout.card.imageHeightLarge,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null
    },
});
