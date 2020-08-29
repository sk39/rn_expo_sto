import React, {Component} from 'react';
import {Animated, Easing, Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    image: ImageSourcePropType;
    detailMode: boolean;
    phase?: string;
    isDetail: boolean;
    isHidden: boolean;
    scrollY?: Animated.Value;
}

@observer
export default class AnimatedCard extends Component<Props> {

    @observable marginTop = new Animated.Value(12);
    @observable marginHorizontal = new Animated.Value(16);
    @observable borderRadius = new Animated.Value(6);
    @observable elevation = new Animated.Value(9);
    @observable imageHeight = new Animated.Value(150);
    @observable imageScrollHeight = new Animated.Value(150);

    componentDidMount() {
        const {detailMode, isDetail, phase} = this.props;
        if (detailMode && isDetail && phase === "phase-x") {
            this.marginTop.setValue(0);
            this.marginHorizontal.setValue(0);
            this.borderRadius.setValue(0);
            this.elevation.setValue(1);
            this.imageHeight.setValue(240);
        } else if (detailMode && isDetail && phase === "phase-1") {
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
                    useNativeDriver: false,
                }),
                Animated.timing(this.marginHorizontal, {
                    easing: Easing.in(Easing.back()),
                    toValue: 0,
                    duration: 900,
                    delay: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(this.borderRadius, {
                    easing: Easing.in(),
                    toValue: 0,
                    duration: 900,
                    delay: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(this.elevation, {
                    easing: Easing.in(),
                    toValue: 1,
                    duration: 900,
                    delay: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(this.imageHeight, {
                    easing: Easing.in(Easing.back()),
                    toValue: 240,
                    duration: 900,
                    delay: 0,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    }

    render() {
        const {image, phase} = this.props;

        const aniStyle = {
            marginTop: this.marginTop,
            marginHorizontal: this.marginHorizontal,
            borderRadius: this.borderRadius,
            ...getPlatformElevation(this.elevation)
        };

        const imageWrapperStyle = {
            height: this.imageHeight
        };

        let todo: any = {flex: 1};
        if (phase !== "phase-3" && this.props.scrollY) {
            todo.transform = [
                {
                    translateY: this.props.scrollY.interpolate({
                        inputRange: [-200, 0, 200],
                        outputRange: [0, 0, 100],
                    })
                },
                // {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
            ];
        }

        return (
            <Animated.View
                style={{
                    ...styles.card,
                    ...aniStyle,
                }}>
                <Animated.View
                    style={[styles.imageWrapper, imageWrapperStyle]}>
                    <Animated.View
                        style={todo}>
                        <Image
                            style={styles.image}
                            source={image}
                        />
                    </Animated.View>
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
    imageWrapper: {
        overflow: 'hidden',
        backgroundColor: "#0f153c",
        padding: 0
    },
    image: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: null,
        height: null
    },
});
