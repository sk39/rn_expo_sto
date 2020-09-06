import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import CodePadLabel from "./CodePadLabel";
import Colors from "@constants/Colors";
import BaseNumberPad from "@common/components/Input/InputNumber/BaseNumberPad";
import {KeyIconBtn} from "@common/components/Input/InputNumber/KeyBtn";

@observer
export default class CodePad extends BaseNumberPad<{}> {

    renderHeader() {
        return (
            <View style={styles.header}>
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
    header: {
        // paddingTop: 12,
    },
    titleArea: {
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Colors.listBorderColor
    },
    title: {
        fontSize: 12,
        fontWeight: "700",
    },
    labelWrapper: {
        paddingTop: 4,
    }
});
