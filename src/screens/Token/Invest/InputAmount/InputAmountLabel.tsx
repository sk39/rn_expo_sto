import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import NumberPadLabel from "@common/components/Input/InputNumber/NumberPadLabel";
import NumberLabel from "@common/components/Label/NumberLabel";
import {computed} from "mobx";
import Colors from "@constants/Colors";
import Format from "@constants/Format";

interface Props {
    value: string,
    unit?: string;
    offeringPrice: number;
    modal?: boolean;
    onPress?: () => void;
}

@observer
export default class InputAmountLabel extends PureComponent<Props> {

    @computed
    get amountBaseCcy() {
        const {value, offeringPrice} = this.props;
        if (!value || value.length === 0) {
            return null;
        }

        return Number(value) * offeringPrice;
    }

    render() {
        const {onPress, value, unit, modal} = this.props;
        return (
            <View>
                <NumberPadLabel value={value}
                                unit={unit}
                                modal={modal}
                                onPress={onPress}
                />
                <View style={styles.baseWrapper}>
                    <Text style={styles.label}>Payment</Text>
                    <View style={styles.valueWrapper}>
                        <NumberLabel value={this.amountBaseCcy}
                                     style={styles.valueText}
                                     prefix={Format.baseCcySymbol}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    baseWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        height: 36,
        paddingTop: 12,
        paddingRight: 22,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.labelFontThin
    },
    valueWrapper: {
        paddingLeft: 12,
        minWidth: 110,
        alignItems: "flex-end",
    },
    valueText: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.font,
        letterSpacing: 1,
    },
});
