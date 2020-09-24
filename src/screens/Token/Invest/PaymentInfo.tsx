import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import Colors from "@constants/Colors";
import NumberLabel from "@common/components/Label/NumberLabel";
import {observer} from "mobx-react";
import {RootStoreProps} from "@store/RootStoreProvider";
import InvestTokenState from "./InvestTokenState";
import Format from "@constants/Format";
import {If} from "@common/components/PageSupport/If";
import commonStyles from "@common/utils/commonStyle";

interface Props {
    tokenState: InvestTokenState;
}

@observer
export default class PaymentInfo extends PureComponent<RootStoreProps & Props> {

    render() {
        let index = 0;
        const {tokenState} = this.props;
        return (
            <React.Fragment>
                <Row index={index++} title="Amount" noBorder>
                    <If test={tokenState.amountBaseCcy != null}>
                        <NumberLabel value={tokenState.amount.value}
                                     style={[styles.valueText, {color: Colors.labelFont}]}
                                     suffix={tokenState.amount.unit}
                                     suffixStyle={[styles.unit]}/>
                        <Text style={styles.eq}>=</Text>
                    </If>
                    <NumberLabel value={tokenState.amountBaseCcy}
                                 style={styles.valueText}
                                 prefixStyle={styles.baseCcy}
                                 prefix={Format.baseCcySymbol}/>
                </Row>
                <Row index={index++} title="Fees">
                    <NumberLabel value={tokenState.fees}
                                 style={styles.valueText}
                                 prefixStyle={styles.baseCcy}
                                 prefix={Format.baseCcySymbol}/>
                </Row>
                <View style={styles.border}/>
                <Row index={index++} title="Total" bold>
                    <NumberLabel value={tokenState.paymentTotal}
                                 style={styles.valueText}
                                 prefixStyle={styles.baseCcy}
                                 prefix={Format.baseCcySymbol}/>
                </Row>
                <View style={styles.border}/>
            </React.Fragment>
        );
    }
}

function Row(props) {
    const {title, bold, children} = props;
    return (
        <View style={styles.rowContainer}>
            <View style={styles.titleContainer}>
                <Text style={[styles.label, bold ? {fontWeight: "700"} : {}]}>{title}</Text>
            </View>
            <View style={styles.valueContainer}>
                {children}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        minHeight: 34,
    },
    titleContainer: {},
    valueContainer: {
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: "flex-end",
        paddingLeft: 16
    },
    label: {
        fontSize: 14,
        color: Colors.labelFont
    },
    valueText: {
        ...commonStyles.amountLabel,
        color: Colors.primary,
    },
    unit: {
        fontSize: 12,
        fontWeight: "700",
        marginTop: 3,
        marginLeft: 2,
        letterSpacing: 0,
    },
    baseCcy: {
        marginRight: 1,
    },
    eq: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.labelFont,
        marginHorizontal: 12
    },
    border: {
        height: 1,
        backgroundColor: Colors.listBorder,
        marginVertical: 6,
    }
});

