import React, {Component} from 'react';
import {Animated, Keyboard, Platform, StyleSheet, View} from 'react-native';
import Colors from "@constants/Colors";
import ViewUtils from "@common/utils/ViewUtils";
import {Button} from "react-native-elements";
import {observer} from "mobx-react";
import AnimatedSlideUp from "@common/components/Animation/AnimatedSlideUp";
import {observable} from "mobx";

interface Props {
    onPress: any;
    text: string;
    loading?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    animation?: boolean;
    animationDelay?: number;
}

@observer
export default class PageBottomBtn extends Component<Props> {

    @observable opacity = new Animated.Value(1);

    constructor(props) {
        super(props);
        this.onShowKeyboard = this.onShowKeyboard.bind(this);
        this.onHideKeyboard = this.onHideKeyboard.bind(this);
        if (Platform.OS === 'android') {
            Keyboard.addListener("keyboardDidShow", this.onShowKeyboard);
            Keyboard.addListener("keyboardDidHide", this.onHideKeyboard);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            Keyboard.removeListener("keyboardDidShow", this.onShowKeyboard);
            Keyboard.removeListener("keyboardDidHide", this.onHideKeyboard);
        }
    }

    onShowKeyboard() {
        Animated.timing(this.opacity, {
            toValue: 0,
            useNativeDriver: false,
            duration: 200,
        }).start();
    }

    onHideKeyboard() {
        this.opacity.setValue(1);
    }

    renderContents() {
        const {onPress, text, loading, disabled} = this.props;
        const aniStyle = {
            opacity: this.opacity,
        };
        return (
            <Animated.View style={aniStyle}>
                <Button title={text}
                        containerStyle={[styles.btnWrapper]}
                        buttonStyle={styles.btn}
                        titleStyle={styles.text}
                        loading={loading}
                        disabled={disabled}
                        onPress={onPress}
                />
            </Animated.View>
        );
    }

    render() {
        const {hidden, animation, animationDelay} = this.props;
        if (hidden) {
            return null;
        }

        if (animation) {
            return (
                <View style={styles.container}>
                    <AnimatedSlideUp delay={animationDelay || 500}>
                        {this.renderContents()}
                    </AnimatedSlideUp>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                {this.renderContents()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        borderRadius: 0,
    },
    btnWrapper: {
        borderRadius: 0,
    },
    btn: {
        height: ViewUtils.getBottomBtnHeight(),
        flex: 1,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColorDark,
    },
    text: {
        color: Colors.primaryColorLight,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1
    }
});
