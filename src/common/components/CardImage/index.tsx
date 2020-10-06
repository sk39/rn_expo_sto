import {
    Animated,
    Easing,
    ImageSourcePropType,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {observer} from "mobx-react";
import React, {Component} from "react";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import {observable, runInAction} from "mobx";
import Colors from "@constants/Colors";
import {CacheImage} from "@sk39/expo-image-cache";
import {CardPosition} from "@common/components/CardWithModal/CardModels";
import {Portal} from "react-native-portalize";

interface Props {
    image: ImageSourcePropType;
    onPress?: () => void;
    imageHeight?: number;
    activeAnimation?: boolean;
    durationActive?: number;
    durationPress?: number;
}

@observer
export default class CardImage extends Component<Props> {

    static defaultProps = {
        durationActive: 50,
        durationPress: 200,
    };

    @observable showPortal = false;
    @observable phaseActive = new Animated.Value(0);
    @observable phasePress = new Animated.Value(0);
    @observable pressItem: CardPosition = null;
    imageRef = React.createRef<View>();

    startAnimation = (callback) => {
        const {onPress, durationPress} = this.props;
        if (!onPress) {
            return;
        }

        this.phasePress.setValue(0)
        Animated.timing(this.phasePress, {
            easing: Easing.inOut(Easing.ease),
            toValue: 1,
            duration: durationPress,
            delay: 0,
            useNativeDriver: true,
        }).start(() => {
            callback();
        })
    }

    onPress = () => {
        const {onPress} = this.props;
        if (!onPress) {
            return;
        }

        this.imageRef.current.measure((fx, fy, width, height, px, py) => {
            runInAction(() => {
                // console.log({fx, fy, width, height, px, py})
                this.showPortal = true;
                this.pressItem = {px, py, height, width};
                this.startAnimation(() => {
                    this.showPortal = false;
                    this.phasePress.setValue(0);
                });
                setTimeout(onPress, 50)
            })
        })
    }
    onPressedIn = () => {
        const {onPress, activeAnimation, durationActive} = this.props;
        if (!onPress || !activeAnimation) {
            return;
        }

        Animated.timing(this.phaseActive, {
            easing: Easing.inOut(Easing.ease),
            toValue: 1,
            duration: durationActive,
            delay: 0,
            useNativeDriver: true,
        }).start();
    }

    onPressOut = () => {
        const {onPress, activeAnimation, durationActive} = this.props;
        if (!onPress || !activeAnimation) {
            return;
        }

        Animated.timing(this.phaseActive, {
            easing: Easing.inOut(Easing.ease),
            toValue: 0,
            duration: durationActive,
            delay: 0,
            useNativeDriver: true,
        }).start();
    }

    renderPortalImage() {
        if (!this.showPortal) {
            return null;
        }

        const touchPos = {
            position: "absolute",
            top: this.pressItem.py,
            left: this.pressItem.px,
            width: this.pressItem.width,
            height: this.pressItem.height,
        }

        const ani = {
            image: {
                opacity: this.phasePress.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0.4, 0],
                }),
                transform: [
                    {
                        scale: this.phasePress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.8],
                        }),
                        // translateY: this.phasePress.interpolate({
                        //     inputRange: [0, 1],
                        //     outputRange: [0, -touchPos.top / 1.8],
                        // })
                    }
                ]
            }
        };

        const {image} = this.props;
        return (
            <Portal>
                <Animated.View style={[styles.imageWrapper, touchPos, ani.image]}>
                    <CacheImage source={image}/>
                </Animated.View>
            </Portal>
        )
    }

    render() {
        const {image, imageHeight} = this.props;
        const ani = {
            touch: {
                opacity: this.phaseActive.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.7],
                }),
            }
        };

        return (
            <TouchableWithoutFeedback
                onPress={this.onPress}
                onPressIn={this.onPressedIn}
                onPressOut={this.onPressOut}>
                <Animated.View style={ani.touch}>
                    <View style={styles.cardWrapper}>
                        <View style={styles.card}>
                            <View
                                ref={this.imageRef}
                                style={[styles.imageWrapper, {height: imageHeight}]}>
                                <CacheImage source={image}/>
                            </View>
                            <View>
                                {this.props.children}
                            </View>
                        </View>
                        {this.renderPortalImage()}
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    cardWrapper: {
        ...Platform.select({
            ios: {
                ...getPlatformElevation(2)
            }
        })
    },
    card: {
        overflow: 'hidden',
        backgroundColor: Colors.cardBack,
        // borderRadius: 10,
        ...Platform.select({
            android: {
                ...getPlatformElevation(2)
            }
        })
    },
    imageWrapper: {
        overflow: 'hidden',
        backgroundColor: "#c1c1c1",
        padding: 0,
        width: "100%"
    }
});
