import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import BaseNumberPad from "@common/components/Input/InputNumber/BaseNumberPad";
import InputAmountLabel from "./InputAmountLabel";

interface Props {
    offeringPrice: number;
}

@observer
export default class InputAmountPad extends BaseNumberPad<Props> {

    renderHeader() {
        const {inputState} = this.props;
        return (
            <View style={styles.header}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Please Enter</Text>
                </View>
                <InputAmountLabel
                    value={this.numberPadState.value}
                    offeringPrice={this.props.offeringPrice}
                    unit={inputState.unit}
                    modal/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 8,
    },
    titleArea: {
        paddingHorizontal: 12,
        paddingBottom: 8
    },
    title: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.labelFontThin
    }
});
