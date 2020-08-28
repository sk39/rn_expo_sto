import React, {Component} from "react";
import {Modal, StyleSheet, View} from "react-native";
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import {Button, Text} from "native-base";
import commonStyles from "@common/utils/commonStyle";
import ErrorAnimation from "@common/components/Dialog/ErrorAnimation";

interface Props {
    show: boolean;
    error?: boolean;
    message?: string;
    cancelable?: boolean;
    style?: any,
    btnStyle?: any;
    btnTextStyle?: any;
    btnText?: string;
    onPress?: (e?) => void;
    disablesLayerBackgroundColor?: string,
}

@observer
export default class Dialog extends Component<Props> {

    static defaultProps = {
        disablesLayerBackgroundColor: Colors.disablesLayerDark
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
        const {show, disablesLayerBackgroundColor, onPress, btnText, btnStyle, btnTextStyle} = this.props;
        return (
            <Modal transparent
                // animationType="slide"
                   visible={show}
                   onRequestClose={() => null}>
                <View style={[
                    styles.disablesLayer,
                    {backgroundColor: disablesLayerBackgroundColor}
                ]}>
                    <View style={styles.contentWrapper}>
                        <View>
                            {this.renderContents()}
                        </View>
                        <Button block style={[styles.btn, btnStyle]} onPress={onPress}>
                            <Text style={[styles.btnText, btnTextStyle]}>{btnText}</Text>
                        </Button>
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
    },
    errorMsg: {
        color: "#ca1a41",
        fontSize: 16,
    }
});
