import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";
import {observer} from "mobx-react";
import {RootStoreProps} from "@store/RootStoreProvider";
import InvestTokenState from "./InvestTokenState";
import {Icon} from "react-native-elements";

interface Props {
    tokenState: InvestTokenState;
    showAmount?: boolean;
}

@observer
export default class InvestInfo extends PureComponent<RootStoreProps & Props> {

    renderAmount({title, tokenState, index}) {
        const delay = 200 + (index + 1) * 32;
        return (
            <AnimatedRow key={index} delay={delay}>
                <View style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.label}>{title}</Text>
                    </View>
                    <View style={styles.valueContainer}>
                        <NumberLabel value={tokenState.amount.value}
                                     style={styles.valueText}
                                     suffix={tokenState.amount.unit}
                                     suffixStyle={styles.unit}
                                     decimals={2}/>
                        <View style={styles.afterContainer}>
                            <NumberLabel value={tokenState.amountBaseCcy}
                                         style={styles.valueText}
                                         suffix={"USD"}
                                         suffixStyle={styles.unit}
                                         decimals={0}/>
                        </View>
                    </View>
                </View>
            </AnimatedRow>
        );
    }

    renderItem({title, before, value, unit, decimals, index}) {
        const delay = 200 + (index + 1) * 32;
        return (
            <AnimatedRow key={index} delay={delay}>
                <View style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.label}>{title}</Text>
                    </View>
                    <View style={styles.valueContainer}>
                        <NumberLabel value={before}
                                     style={styles.beforeText}
                                     suffix={unit}
                                     suffixStyle={styles.unit}
                                     decimals={decimals}/>
                        <View style={styles.afterContainer}>
                            <View style={styles.iconWrapper}>
                                <Icon name={"arrow-right"}
                                      type="feather"
                                      color={Colors.labelFontThin}
                                      size={16}/>
                            </View>
                            <NumberLabel value={value}
                                         style={styles.valueText}
                                         suffix={unit}
                                         suffixStyle={styles.unit}
                                         decimals={decimals}/>
                        </View>
                    </View>
                </View>
            </AnimatedRow>
        );
    };

    render() {
        let index = 0;
        const {tokenState, showAmount} = this.props;
        return (
            <View>
                {showAmount ? this.renderAmount({
                    title: "Amount",
                    tokenState: tokenState,
                    index: index++
                }) : null}
                {this.renderItem({
                    title: "Your Tokens",
                    before: tokenState.userTokens,
                    value: tokenState.afterUserTokens,
                    unit: tokenState.selectedItem.symbol,
                    decimals: 0,
                    index: index++
                })}
                {this.renderItem({
                    title: "Your Balance",
                    before: tokenState.userDeposit,
                    value: tokenState.afterUserDeposit,
                    unit: "USD",
                    decimals: 0,
                    index: index++
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        alignItems: 'flex-start',
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 7,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorderColor,
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
        fontSize: 16,
        fontWeight: "700",
        color: Colors.primaryColor,
        letterSpacing: 1,
    },
    beforeText: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.labelFont,
        letterSpacing: 1,
    },
    unit: {
        color: Colors.unitFont,
        fontSize: 12,
        marginLeft: 8
    },
    iconWrapper: {
        paddingRight: 10
    },
    afterContainer: {
        flexDirection: "row",
        alignItems: 'center',
    }
});

