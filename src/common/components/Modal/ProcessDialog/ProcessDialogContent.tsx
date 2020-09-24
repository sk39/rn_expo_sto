import React, {PureComponent} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native'
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import AnimatedSlide from "@common/components/Animation/AnimatedSlide";
import ProcessAnimation from "./ProcessAnimation";
import ProcessDialogState from "./ProcessDialogState";
import ModalFooterBtn from "@common/components/Modal/ModalFooterBtn";

interface Props {
    model: ProcessDialogState;
    startMinHeight: number;
    endMinHeight: number;
    onClose: () => void;
    renderSuccess?: () => any;
    renderError?: () => any;
}

@observer
export default class ProcessDialogContent extends PureComponent<Props> {

    static defaultProps = {
        startMinHeight: null,
        endMinHeight: 300
    };

    @observable finAnimation: boolean = false;
    @observable phase = new Animated.Value(0);

    componentDidMount() {
        Animated.timing(this.phase, {
            easing: Easing.inOut(Easing.ease),
            toValue: 1,
            duration: 400,
            delay: 0,
            useNativeDriver: false,
        }).start();
    }

    @action
    onAnimationFinish = () => {
        this.finAnimation = true
    }

    @action
    onClose = () => {
        this.finAnimation = false;
        this.props.onClose();
    }

    renderFooter() {
        const {model, onClose} = this.props
        const {state} = model;
        if (this.finAnimation && (state === "success" || state === "error")) {
            return (
                <View style={styles.footer}>
                    <AnimatedSlide delay={0} easing={Easing.linear} moveDistance={0}>
                        <ModalFooterBtn title={t("btn.close")}
                                        onPress={onClose}/>
                    </AnimatedSlide>
                </View>
            )
        }
    }

    render() {
        const {model, startMinHeight, endMinHeight} = this.props
        const {state} = model;

        let body;
        if (this.finAnimation && state === "success") {
            const {renderSuccess} = this.props;
            body = renderSuccess ? renderSuccess() : (
                <AnimatedSlide delay={0} direction="toLeft" moveDistance={20}>
                    <SuccessContent message={model.message}/>
                </AnimatedSlide>
            )
        } else if (this.finAnimation && state === "error") {
            const {renderError} = this.props;
            body = renderError ? renderError() : (
                <AnimatedSlide delay={0} direction="toLeft" moveDistance={20}>
                    <ErrorContent message={model.message}/>
                </AnimatedSlide>
            )
        } else {
            body = (
                <Text style={styles.processText}>
                    Processing...
                </Text>
            )
        }

        const ani = {
            minHeight: startMinHeight != null ? this.phase.interpolate({
                inputRange: [0, 1],
                outputRange: [startMinHeight, endMinHeight],
            }) : endMinHeight,
        }

        return (
            <Animated.View style={[styles.container, ani]}>
                <View style={styles.procAnimationWrapper}>
                    <ProcessAnimation
                        state={state}
                        onAnimationFinish={this.onAnimationFinish}/>
                </View>
                <View style={styles.bodyWrapper}>
                    {body}
                </View>
                {this.renderFooter()}
            </Animated.View>
        )
    }
}

function SuccessContent({message}) {
    return (
        <View style={{alignItems: "center"}}>
            <Text style={[styles.successMsg]}>Success!</Text>
            <Text style={[styles.successSubMsg]}>{message}</Text>
        </View>
    )
}

function ErrorContent({message}) {
    return (
        <Text style={[styles.errorMsg]}>{message}</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 44,
    },
    procAnimationWrapper: {
        paddingTop: 44,
    },
    bodyWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        paddingHorizontal: 12,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    // content: {

    successMsg: {
        fontSize: 22,
        fontWeight: "700",
        marginVertical: 6,
        color: Colors.primary,
        letterSpacing: 2,
    },
    successSubMsg: {
        fontSize: 16,
        marginVertical: 6,
        marginBottom: 24,
        color: Colors.font,
    },
    errorMsg: {
        color: Colors.error,
        fontSize: 16,
    },
    processText: {
        color: Colors.labelFontThin,
        fontSize: 22,
    },
});
