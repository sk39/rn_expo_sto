import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import CodePadLabel from "./CodePadLabel";
import Colors from "@constants/Colors";
import BaseNumberPad from "@common/components/Input/InputNumber/BaseNumberPad";
import {KeyIconBtn} from "@common/components/Input/InputNumber/KeyBtn";
import CodePadState from "@common/components/Input/InputCode/CodePadState";

@observer
export default class CodePad extends BaseNumberPad<{}> {

    constructor(props) {
        super(props);
        this.numberPadState = new CodePadState(props.inputState)
    }

    renderHeader() {
        return (
            <View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>{t("screen.2fa.subTitle")}</Text>
                    <KeyIconBtn
                        iconName="clipboard"
                        iconType="feather"
                        mini
                        onPress={this.clipboard}
                    />
                </View>
                <View style={styles.labelWrapper}>
                    <CodePadLabel
                        value={this.numberPadState.value}
                        modal/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleArea: {
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Colors.listBorder
    },
    title: {
        fontSize: 12,
        fontWeight: "700",
    },
    labelWrapper: {
        paddingTop: 4,
    }
});
