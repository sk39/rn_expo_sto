import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";
import {observer} from "mobx-react";
import NumberPadLabel from "@common/components/Input/InputNumber/NumberPadLabel";
import NumberLabel from "@common/components/Label/NumberLabel";
import {computed} from "mobx";
import Colors from "@constants/Colors";

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
                    <NumberLabel value={this.amountBaseCcy}
                                 style={styles.valueText}
                                 suffix={"USD"}
                                 suffixStyle={styles.unit}
                                 decimals={0}/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    baseWrapper: {
        alignItems: "flex-end",
        justifyContent: "center",
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
    valueText: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.font,
        letterSpacing: 1,
    },
    unit: {
        color: Colors.unitFont,
        fontSize: 10,
        marginLeft: 10
    },
});
