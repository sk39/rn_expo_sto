import React, {Component} from "react";
import {Animated, ImageSourcePropType, StyleSheet, View} from "react-native";
import {observer} from "mobx-react";
import Layout from "@constants/Layout";
import {CacheImage} from "@sk39/expo-image-cache";

interface Props {
    source: ImageSourcePropType;
    scrollY: Animated.Value;
}

@observer
export default class DetailImage extends Component<Props> {

    render() {
        const {source} = this.props;
        const h = Layout.card.imageHeightLarge;
        const ani = {
            imageScale: {
                opacity: this.props.scrollY.interpolate({
                    inputRange: [0, h / 1.3],
                    outputRange: [1, 0],
                }),
                transform: [
                    {
                        translateY: this.props.scrollY.interpolate({
                            inputRange: [-h, 0, h],
                            outputRange: [0, 0, h / 4],
                        })
                    }
                ]
            }
        };

        return (
            <Animated.View style={ani.imageScale}>
                <View style={styles.imageWrapper}>
                    <CacheImage style={styles.image}
                                source={source}/>
                </View>
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

