import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";
import {observer} from "mobx-react";
import {RootStoreProps} from "@store/RootStoreProvider";
import InvestTokenState from "./InvestTokenState";
import {Icon} from "react-native-elements";
import Format from "@constants/Format";

interface Props {
    tokenState: InvestTokenState;
    showAmount?: boolean;
}

@observer
export default class InvestInfo extends PureComponent<RootStoreProps & Props> {

    render() {
        let index = 0;
        const {tokenState, showAmount} = this.props;
        const {symbol} = tokenState.selectedItem

        return (
            <View>
                <Row index={index++} title="Amount" hide={!showAmount}>
                    <NumberLabel value={tokenState.amount.value}
                                 style={styles.valueLargeText}
                                 suffix={tokenState.amount.unit}
                                 suffixStyle={[styles.unit, {marginTop: 4}]}/>
                </Row>
                <Row index={index++} title="Payment" hide={!showAmount}>
                    <View style={styles.afterContainer}>
                        <NumberLabel value={tokenState.amountBaseCcy}
                                     style={styles.valueLargeText}
                                     prefix={Format.baseCcySymbol}/>
                    </View>
                </Row>
                <Row index={index++} title="Your Tokens">
                    <NumberLabel value={tokenState.userTokens}
                                 style={styles.beforeText}
                                 suffix={symbol}
                                 suffixStyle={styles.unit}/>
                    <View style={styles.afterContainer}>
                        <ArrowIcon/>
                        <NumberLabel value={tokenState.afterUserTokens}
                                     style={styles.valueText}
                                     suffix={symbol}
                                     suffixStyle={[styles.unit, {marginTop: 2}]}/>
                    </View>
                </Row>
                <Row index={index++} title="Your Deposit">
                    <NumberLabel value={tokenState.userDeposit}
                                 style={styles.beforeText}
                                 prefix={Format.baseCcySymbol}/>
                    <View style={styles.afterContainer}>
                        <ArrowIcon/>
                        <NumberLabel value={tokenState.afterUserDeposit}
                                     style={styles.valueText}
                                     prefix={Format.baseCcySymbol}/>
                    </View>
                </Row>
            </View>
        );
    }
}

function Row(props) {
    const {index, title, hide, children} = props;
    if (hide) {
        return null;
    }
    const delay = 100 + (index + 1) * 100;
    return (
        <AnimatedRow key={index} delay={delay}>
            <View style={styles.rowContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>{title}</Text>
                </View>
                <View style={styles.valueContainer}>
                    {children}
                </View>
            </View>
        </AnimatedRow>
    )
}

function ArrowIcon() {
    return (
        <View style={styles.iconWrapper}>
            <Icon name={"arrow-right"}
                  type="feather"
                  color={Colors.labelFontThin}
                  size={16}/>
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder,
    },
    titleContainer: {},
    valueContainer: {
        alignItems: 'flex-end',
        justifyContent: "flex-end",
        paddingLeft: 16
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.labelFontThin
    },
    valueText: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primary,
        letterSpacing: 1,
    },
    valueLargeText: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primary,
        letterSpacing: 1,
    },
    beforeText: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.labelFont,
        letterSpacing: 1,
    },
    unit: {
        color: Colors.unitFont,
        fontSize: 10,
        fontWeight: "400",
        marginLeft: 4
    },
    iconWrapper: {
        paddingRight: 10
    },
    afterContainer: {
        flexDirection: "row",
        alignItems: 'center',
    }
});

