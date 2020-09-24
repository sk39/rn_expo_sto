import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import {Icon} from "react-native-elements";
import InvestTokenState from "./InvestTokenState";
import PaymentInfo from "./PaymentInfo";
import DepositInfo from "./DepositInfo";

interface Props {
    tokenState: InvestTokenState;
}

@observer
export default class InvestConfirm extends PureComponent<Props> {

    render() {
        const {tokenState} = this.props;
        const item = tokenState.selectedItem;
        return (
            <View style={styles.container}>
                <Text style={styles.explain}>
                    Do you really want to invest?
                </Text>
                <SummaryMark symbol={item.symbol}/>
                <View style={styles.dataWrapper}>
                    <Area>
                        <PaymentInfo tokenState={tokenState}/>
                    </Area>
                    <Area>
                        <View style={styles.row}>
                            <Text style={styles.depositTitle}>Deposit</Text>
                            <DepositInfo tokenState={tokenState}/>
                        </View>
                        <View style={styles.border}/>
                    </Area>
                </View>
            </View>
        );
    }
}

function Area({children}) {
    return (
        <View style={styles.areaBody}>
            {children}
        </View>
    )
}

function SummaryMark({symbol}) {
    return (
        <View style={styles.summaryWrapper}>
            <View style={styles.summaryItem}>
                <Icon name='dollar-sign' type="feather" color={Colors.primary2} size={24}/>
            </View>
            <View style={{marginHorizontal: 6}}>
                <Icon name='arrow-right' type="feather" color={Colors.primary2} size={24}/>
            </View>
            <View style={styles.summaryItem}>
                <Text style={styles.summaryItemText}>{symbol}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 16,
        paddingTop: 32,
    },
    explain: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.labelFont,
    },
    depositTitle: {
        fontSize: 16,
        color: Colors.labelFont,
    },
    areaBody: {
        width: "100%",
        paddingHorizontal: 7
    },
    row: {
        width: "100%",
        paddingVertical: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dataWrapper: {
        width: "100%"
    },
    summaryWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 22,
        opacity: 0.8
    },
    summaryItem: {
        borderWidth: 3,
        borderColor: Colors.primary2,
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    summaryItemText: {
        color: Colors.primary2,
        fontWeight: "700",
        fontSize: 12,
    },
    border: {
        height: 1,
        backgroundColor: Colors.listBorder,
        marginVertical: 6,
    }
});

