import React, {Component} from "react";
import {Easing, StyleSheet, View} from "react-native";
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import {Button, Text} from "native-base";
import commonStyles from "@common/utils/commonStyle";
import ErrorAnimation from "@common/components/Animation/ErrorAnimation";
import DisableLayer from "@common/components/Modal/DisableLayer";
import AnimatedRow from "@common/components/Animation/AnimatedRow";

interface Props {
    show: boolean;
    disablesLayerBackgroundColor?: string;
    cancelable?: boolean;
    onPress: () => void;
    error?: boolean;
    message?: string;
    style?: any,
    btnStyle?: any;
    btnTextStyle?: any;
    btnText?: string;
}

@observer
export default class Dialog extends Component<Props> {

    static defaultProps = {
        disablesLayerBackgroundColor: Colors.disablesLayerDark,
        btnText: t("btn.close")
    };

    renderContents() {
        const {show, error, message} = this.props;
        if (error) {
            return (
                <View>
                    <View style={styles.animationWrapper}>
                        <ErrorAnimation show={show}/>
                    </View>
                    <View style={styles.msgWrapper}>
                        <Text style={styles.errorMsg}>
                            {message}
                        </Text>
                    </View>
                </View>
            )
        }

        return this.props.children;
    }

    render() {
        const {show, disablesLayerBackgroundColor, error, cancelable, onPress} = this.props;
        const {btnText, btnStyle, btnTextStyle} = this.props;

        return (
            <DisableLayer show={show}
                          disablesLayerBackgroundColor={disablesLayerBackgroundColor}
                          cancelable={cancelable}
                          close={onPress}>
                <AnimatedRow delay={0}
                             duration={200}
                             easing={error ? Easing.out(Easing.back()) : Easing.ease}
                             moveDistance={error ? 80 : 20}>
                    <View style={styles.contentWrapper}>
                        <View>
                            {this.renderContents()}
                        </View>
                        <Button block style={[styles.btn, btnStyle]} onPress={onPress}>
                            <Text style={[styles.btnText, btnTextStyle]}>{btnText}</Text>
                        </Button>
                    </View>
                </AnimatedRow>
            </DisableLayer>
        )
    }
}

const styles = StyleSheet.create({
    contentWrapper: {
        ...commonStyles.modalContent,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Colors.backColor,
    },
    btn: commonStyles.modalBtn,
    btnText: {
        fontSize: 16,
        letterSpacing: 2
    },
    animationWrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 32,
        paddingBottom: 16
    },
    msgWrapper: {
        paddingTop: 8,
        paddingBottom: 32,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    errorMsg: {
        color: "#ca1a41",
        fontSize: 18,
    }
});
