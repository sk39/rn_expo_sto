import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import InputNumberState from "@common/components/Input/InputNumberState";
import {Button} from "react-native-elements";
import NumberPadState from "./NumberPadState";
import NumberPadLabel from "./NumberPadLabel";
import Colors from "@constants/Colors";
import ClipboardAccessor from "@common/plugins/ClipboardAccessor";
import {KeyBtn, KeyIconBtn} from "@common/components/Input/InputNumber/KeyBtn";
import Layout from "@constants/Layout";

interface Props {
    inputState: InputNumberState,
    onClose: () => void;
}

export default class BaseNumberPad<T> extends Component<Props & T> {

    numberPadState: NumberPadState;

    constructor(props) {
        super(props);
        this.numberPadState = new NumberPadState(props.inputState)
    }

    onOpen() {
        this.numberPadState.start()
    }

    cancel = () => {
        this.props.onClose();
    }

    enter = () => {
        if (this.numberPadState.enter()) {
            this.props.onClose();
        }
    }

    clipboard = async () => {
        const content = await ClipboardAccessor.getNumber(0);
        if (content && content.length <= this.props.inputState.maxLength) {
            this.numberPadState.setValue(content)
        }
    }

    renderNum(num) {
        return (
            <KeyBtn
                key={num}
                title={String(num)}
                disabled={!this.numberPadState.canAppend}
                onPress={() => this.numberPadState.append(num)}
            />
        )
    }

    renderPad() {
        return (
            <View>
                <View style={styles.row}>
                    {[7, 8, 9].map(num => this.renderNum(num))}
                </View>
                <View style={styles.row}>
                    {[4, 5, 6].map(num => this.renderNum(num))}
                </View>
                <View style={styles.row}>
                    {[1, 2, 3].map(num => this.renderNum(num))}
                </View>
                <View style={styles.row}>
                    <KeyBtn
                        title={"."}
                        disabled={!this.numberPadState.canDot}
                        onPress={() => this.numberPadState.dot()}
                    />
                    {this.renderNum(0)}
                    <KeyIconBtn
                        iconName="delete"
                        iconType="feather"
                        disabled={!this.numberPadState.canRemove}
                        onPress={() => this.numberPadState.remove()}
                    />
                </View>
            </View>
        )
    }

    renderHeader() {
        const {inputState} = this.props;
        return (
            <View style={styles.header}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Please Enter</Text>
                </View>
                <NumberPadLabel
                    value={this.numberPadState.value}
                    unit={inputState.unit}
                    modal/>
            </View>
        )
    }

    renderFooter() {
        return (
            <View style={styles.footer}>
                <Button
                    title={t("btn.cancel")}
                    type="clear"
                    titleStyle={{color: Colors.labelFont}}
                    buttonStyle={styles.bottomBtn}
                    onPress={this.cancel}
                />
                <Button
                    title="Clear"
                    type="clear"
                    titleStyle={{color: Colors.fontColor, fontWeight: "700"}}
                    buttonStyle={styles.bottomBtn}
                    onPress={() => this.numberPadState.clear()}
                />
                <Button
                    title={t("btn.set")}
                    type="clear"
                    titleStyle={{color: Colors.primaryColor, fontWeight: "700"}}
                    buttonStyle={styles.bottomBtn}
                    onPress={this.enter}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.back}>
                {this.renderHeader()}
                <View style={styles.body}>
                    {this.renderPad()}
                </View>
                {this.renderFooter()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        // backgroundColor: Colors.backColor
    },
    header: {
        paddingTop: 10,
    },
    titleArea: {
        paddingHorizontal: 12,
        paddingBottom: 8
    },
    title: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.labelFontThin
    },
    body: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        width: "100%"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingVertical: 8,
        // paddingHorizontal: 32,
        borderTopWidth: 1,
        borderTopColor: Colors.listBorderColor
    },
    row: {
        flexDirection: "row",
        width: "100%",
    },
    bottomBtn: {
        // width: 80,
        height: 56,
        width: (Layout.window.width) / 3,
    }
});
