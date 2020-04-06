import React, {Component} from "react";
import {Modal, StyleSheet, View} from "react-native";
import Colors from "@constants/Colors";
import {Text} from "native-base";
import ProcessDialogState from "./ProcessDialogState";
import ProcessAnimation from "./ProcessAnimation";
import DialogContent from "./DialogContent";
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import Layout from "@constants/Layout";

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

    @observable finAnimation: boolean = false;

    static defaultProps = {
        indicatorColor: Colors.primaryColor,
        indicatorBackgroundColor: "#fff",
        disablesLayerBackgroundColor: Colors.disablesLayerDark
    };

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
                <DialogContent show={this.finAnimation} btnText="Close" onPress={this.onClose}>
                    <View style={styles.textWrapper}>
                        <Text style={[styles.msg, styles.successMsg]}>Success!</Text>
                    </View>
                </DialogContent>
            )
        } else if (isError) {
            return (
                <DialogContent show={this.finAnimation} btnText="Close" onPress={this.onError}>
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
            <Modal transparent
                   animationType="none"
                   visible={showDialog}
                   onRequestClose={() => null}>
                <View style={[
                    styles.disablesLayer,
                    {backgroundColor: disablesLayerBackgroundColor}
                ]}>
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
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    disablesLayer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    indicatorWrapper: {
        height: 360,
        width: Layout.window.width - 56,
        borderRadius: 10,
        // paddingBottom:12,
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
    successMsg: {},
    errorMsg: {
        color: "#ca1a41",
        fontSize: 16,
    }
});
