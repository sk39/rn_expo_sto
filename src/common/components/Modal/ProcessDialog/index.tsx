import React, {Component} from "react";
import {Easing, StyleSheet, View} from "react-native";
import Colors from "@constants/Colors";
import {Text} from "native-base";
import ProcessDialogState from "./ProcessDialogState";
import ProcessAnimation from "./ProcessAnimation";
import DialogContent from "./DialogContent";
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import commonStyles from "@common/utils/commonStyle";
import DisableLayer from "@common/components/Modal/DisableLayer";
import AnimatedRow from "@common/components/Animation/AnimatedRow";

interface Props {
    model: ProcessDialogState;
    onClose: any,
    onError: any,
    indicatorColor?: string,
    indicatorBackgroundColor?: string,
    disablesLayerBackgroundColor?: string,
}

@observer
export default class ProcessDialog extends Component<Props> {

    static defaultProps = {
        indicatorColor: Colors.primaryColor,
        indicatorBackgroundColor: "#fff",
        disablesLayerBackgroundColor: Colors.disablesLayerDark
    };

    @observable finAnimation: boolean = false;

    constructor(props) {
        super(props);
        this.onAnimationFinish = this.onAnimationFinish.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onError = this.onError.bind(this);
    }

    @action
    onAnimationFinish(finish, error) {
        this.finAnimation = finish || error;
    }

    @action
    onClose() {
        this.finAnimation = false;
        this.props.onClose();
    }

    @action
    onError() {
        this.finAnimation = false;
        this.props.onError();
    }

    renderContents() {
        const {model} = this.props;
        const {showConfirm, processing, isFinish, isError, errorMsg} = model;
        if (isFinish) {
            return (
                <DialogContent show={this.finAnimation} btnText={t("btn.close")} onPress={this.onClose}>
                    <View style={styles.textWrapper}>
                        <Text style={[styles.msg, styles.successMsg]}>Success!</Text>
                    </View>
                </DialogContent>
            )
        } else if (isError) {
            return (
                <DialogContent show={this.finAnimation} btnText={t("btn.close")} onPress={this.onError}>
                    <View style={styles.textWrapper}>
                        <Text style={[styles.msg, styles.errorMsg]}>{errorMsg}</Text>
                    </View>
                </DialogContent>
            )
        } else if (showConfirm) {
            return this.props.children
        } else if (processing) {
            return (
                <DialogContent show>
                    <View style={styles.textWrapper}>
                        <Text style={styles.msg}>Processing...</Text>
                    </View>
                </DialogContent>
            )
        }
    }

    render() {
        const {model, disablesLayerBackgroundColor, indicatorBackgroundColor} = this.props;
        const {showDialog, processing, isFinish, isError} = model;
        return (
            <DisableLayer show={showDialog}
                          disablesLayerBackgroundColor={disablesLayerBackgroundColor}
                          close={this.onClose}>
                <AnimatedRow delay={0}
                             duration={200}
                             easing={Easing.ease}
                             moveDistance={20}>
                    <View style={[
                        styles.indicatorWrapper,
                        {backgroundColor: indicatorBackgroundColor}
                    ]}>
                        <ProcessAnimation
                            processing={processing}
                            finish={isFinish}
                            error={isError}
                            onAnimationFinish={this.onAnimationFinish}
                        />
                        {this.renderContents()}
                    </View>
                </AnimatedRow>
            </DisableLayer>
        )
    }
}

const styles = StyleSheet.create({
    indicatorWrapper: {
        ...commonStyles.modalContent,
        height: 420,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 98,
    },
    closeBtn: {
        borderRadius: 0,
        borderBottomRightRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: "#ccc"
    },
    content: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    textWrapper: {
        height: 120,
        padding: 12,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    msg: {
        marginVertical: 12,
        fontSize: 20,
        color: Colors.labelFont,
    },
    successMsg: {
        fontSize: 32,
        color: Colors.primaryColor,
        letterSpacing: 2
    },
    errorMsg: {
        color: "#ca1a41",
        fontSize: 16,
    }
});
