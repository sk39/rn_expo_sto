import React, {Component} from "react";
import {Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet} from "react-native";
import {Image as ImageCache} from "react-native-expo-image-cache";

interface Props {
    source: ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
}

export default class CashImage extends Component<Props> {

    render() {
        const {source, style} = this.props;
        if ((source as any).uri) {
            return (
                <ImageCache uri={(source as any).uri}
                            style={[styles.image, style]}/>
            )
        }

        return (
            <Image source={source} style={[styles.image, style]}/>
        )

    }
}

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
    }
});
