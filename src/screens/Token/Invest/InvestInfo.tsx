import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";
import {observer} from "mobx-react";
import {RootStoreProps} from "@store/RootStoreProvider";
import InvestTokenState from "./InvestTokenState";

interface Props {
    tokenState: InvestTokenState;
}

@observer
export default class InvestInfo extends PureComponent<RootStoreProps & Props> {

    renderItem({title, value, unit, decimals, index}) {
        const delay = 200 + (index + 1) * 32;
        return (
            <AnimatedRow key={index} delay={delay}>
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.label}>{title}</Text>
                    </View>
                    <NumberLabel value={value}
                                 suffix={unit}
                                 style={styles.valueText}
                                 suffixStyle={styles.unit}
                                 decimals={decimals}/>
                </View>
            </AnimatedRow>
        );
    };

    render() {
        let index = 0;
        const {tokenState} = this.props;
        return (
            <View>
                {this.renderItem({
                    title: "Offering Price",
                    value: tokenState.offeringPrice,
                    unit: "USD",
                    decimals: 0,
                    index: index++
                })}
                {this.renderItem({
                    title: "Minimum Payment",
                    value: tokenState.offeringPrice,
                    unit: "USD",
                    decimals: 0,
                    index: index++
                })}
                {this.renderItem({
                    title: "Your Balance",
                    value: tokenState.userDeposit,
                    unit: "USD",
                    decimals: 0,
                    index: index++
                })}
                {this.renderItem({
                    title: "Buy Token Qty",
                    value: tokenState.buyToken,
                    unit: "USD",
                    decimals: 2,
                    index: index++
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 7,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorderColor,
        minHeight: 40,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
    },
    valueText: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primaryColor,
        letterSpacing: 1,
    },
    unit: {
        width: 44,
        color: Colors.unitFont,
        fontSize: 12,
        marginLeft: 8
    },
});

