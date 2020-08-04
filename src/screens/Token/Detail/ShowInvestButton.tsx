import React, {Component} from 'react';
import {Animated, Easing, InteractionManager, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Colors from "@constants/Colors";
import {observable} from "mobx";
import Layout from "@constants/Layout";
import {observer} from "mobx-react";
import ViewUtils from "@common/utils/ViewUtils";

interface Props {
    isHidden: boolean;
    isInvestMode: boolean;
    onStart: Function;
    onClose: Function;
}

const BTN_HEIGHT = ViewUtils.getBottomBtnHeight();
@observer
export default class ShowInvestButton extends Component<Props> {

    @observable height = new Animated.Value(BTN_HEIGHT);
    @observable backgroundNum = new Animated.Value(0);
    @observable translateY = new Animated.Value(112);

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions().then(() => {
            this.showAnimation(this.props);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isHidden && this.props.isHidden) {
            this.hideAnimation(this.props);
        }

        if (!prevProps.isInvestMode && this.props.isInvestMode) {
            this.height.setValue(BTN_HEIGHT);
            this.backgroundNum.setValue(0);
            Animated.parallel([
                Animated.spring(this.height, {
                    toValue: Layout.window.height,
                    useNativeDriver: false,
                }),
                Animated.timing(this.backgroundNum, {
                    easing: Easing.in(Easing.back()),
                    toValue: 100,
                    duration: 250,
                    delay: 100,
                    useNativeDriver: false,
                })
            ]).start();
        } else if (prevProps.isInvestMode && !this.props.isInvestMode) {
            Animated.parallel([
                Animated.timing(this.height, {
                    easing: Easing.in(Easing.back()),
                    toValue: BTN_HEIGHT,
                    duration: 500,
                    delay: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(this.backgroundNum, {
                    easing: Easing.in(Easing.back()),
                    toValue: 0,
                    duration: 500,
                    delay: 350,
                    useNativeDriver: false,
                })
            ]).start();
        }
    }

    showAnimation(props) {
        Animated.timing(this.translateY, {
            easing: Easing.out(Easing.back()),
            toValue: 0,
            delay: props.delay,
            useNativeDriver: false,
        }).start();
    }

    hideAnimation(props) {
        Animated.timing(this.translateY, {
            easing: Easing.in(Easing.back()),
            toValue: 112,
            delay: props.delay,
            useNativeDriver: false,
        }).start();
    }

    onPress() {
        if (this.props.isInvestMode) {
            return;
        }
        this.props.onStart();
    }

    render() {
        const {height, backgroundNum, translateY} = this;

        const backgroundColor = backgroundNum.interpolate({
            inputRange: [0, 100],
            outputRange: [Colors.primaryColorDark, Colors.backColor]
        });

        const animationStyle = {
            transform: [{translateY}],
            height,
            backgroundColor
        };

        const child = this.props.isInvestMode
            ? this.props.children
            : <Text style={styles.text}>Invest</Text>;

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.buttonContainer, animationStyle]}>
                    <TouchableWithoutFeedback onPress={this.onPress}>
                        <View style={[styles.btn]}>
                            {child}
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        marginHorizontal: 0,
        flex: 1,
    },
    buttonContainer: {
        flex: 1
    },
    btn: {
        height: BTN_HEIGHT,
        flex: 1,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.primaryColorLight,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 1
    }
});
