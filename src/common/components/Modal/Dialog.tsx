import React, {Component} from "react";
import {BackHandler, Easing, StyleSheet, Text, View} from "react-native";
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import commonStyles from "@common/utils/commonStyle";
import ErrorAnimation from "@common/components/Animation/ErrorAnimation";
import DisableLayer from "@common/components/Modal/DisableLayer";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import ModalFooterBtn from "@common/components/Modal/ModalFooterBtn";

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

    componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    handleBackButtonPressAndroid = () => {
        if (this.props.show) {
            this.props.onPress();
            return true;
        }
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
        const {btnText} = this.props;

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
                        {this.renderContents()}
                        <ModalFooterBtn title={btnText} onPress={onPress}/>
                    </View>
                </AnimatedRow>
            </DisableLayer>
        )
    }
}

const styles = StyleSheet.create({
    contentWrapper: {
        ...commonStyles.modalContent,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: Colors.back,
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
