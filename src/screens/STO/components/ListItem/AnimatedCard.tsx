import React, {Component} from 'react';
import {Animated, Easing, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import Colors from "../../../../constants/Colors";
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    image: ImageSourcePropType;
    detailMode: boolean;
    phase?: string;
    isDetail: boolean;
    isHidden: boolean;
}

@observer
export default class AnimatedCard extends Component<Props> {

    @observable marginTop = new Animated.Value(12);
    @observable marginHorizontal = new Animated.Value(16);
    @observable borderRadius = new Animated.Value(6);
    @observable elevation = new Animated.Value(9);
    @observable imageHeight = new Animated.Value(150);
    @observable imageScrollHeight = new Animated.Value(150);

    onParentScroll(scrollY) {
        this.imageScrollHeight.setValue(Math.max(240 - scrollY, 24));
    }

    componentDidMount() {
        const {detailMode, isDetail, phase} = this.props;

        if (detailMode && isDetail && phase === "phase-1") {
            this.marginTop.setValue(12);
            this.marginHorizontal.setValue(16);
            this.borderRadius.setValue(6);
            this.elevation.setValue(9);
            this.imageHeight.setValue(150);
            this.imageScrollHeight.setValue(150);
            Animated.parallel([
                Animated.timing(this.marginTop, {
                    easing: Easing.in(Easing.back()),
                    toValue: 0,
                    duration: 900,
                    delay: 0,
                }),
                Animated.timing(this.marginHorizontal, {
                    easing: Easing.in(Easing.back()),
                    toValue: 0,
                    duration: 900,
                    delay: 0,
                }),
                Animated.timing(this.borderRadius, {
                    easing: Easing.in(),
                    toValue: 0,
                    duration: 900,
                    delay: 0,
                }),
                Animated.timing(this.elevation, {
                    easing: Easing.in(),
                    toValue: 1,
                    duration: 900,
                    delay: 0,
                }),
                Animated.timing(this.imageHeight, {
                    easing: Easing.in(Easing.back()),
                    toValue: 240,
                    duration: 900,
                    delay: 0,
                }),
                Animated.timing(this.imageScrollHeight, {
                    easing: Easing.in(Easing.back()),
                    toValue: 240,
                    duration: 900,
                    delay: 0,
                }),
            ]).start();
        }
    }

    render() {
        const {image, detailMode} = this.props;

        const aniStyle = {
            marginTop: this.marginTop,
            marginHorizontal: this.marginHorizontal,
            borderRadius: this.borderRadius,
            ...getPlatformElevation(this.elevation)
        };

        const imageWrapperStyle = {
            height: this.imageHeight,
            backgroundColor: "#0f153c",
            padding: 0
        };
        const imageStyle = {
            height: this.imageScrollHeight,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0
        };

        return (
            <Animated.View
                style={{
                    ...styles.card,
                    ...aniStyle,
                }}>
                <Animated.View style={imageWrapperStyle}>
                    <Animated.Image
                        style={imageStyle}
                        source={image}
                    />
                </Animated.View>
                <View>
                    {this.props.children}
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 6,
        borderWidth: 0,
        overflow: 'hidden',
        backgroundColor: Colors.cardBackColor
    },
    imageWrapper: {},
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0
    },
});
