import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import DialogContent from "@common/components/ProcessDialog/DialogContent";
import Layout from "@constants/Layout";
import {Icon} from "react-native-elements";
import NumberLabel from "@common/components/Label/NumberLabel";
import userData from "@constants/dummyData/userInfo";

const offeringPrice = 200;

@observer
export default class ConfirmContent extends PureComponent<any, any> {

    render() {
        const {onDone, onCancel, amount, amountUnit, item} = this.props;
        const token = Number(amount.value) / offeringPrice;
        return (
            <DialogContent
                show
                cancelable
                btnText="Done"
                btnStyle={styles.btnStyle}
                btnTextStyle={styles.btnTextStyle}
                onPress={onDone}
                onCancel={onCancel}>
                <View style={styles.container}>
                    <Text style={styles.title}>Do you really want to invest?</Text>
                    <View style={styles.summaryWrapper}>
                        <View style={styles.summaryItem}>
                            <Icon name='dollar-sign' type="feather" color={Colors.primaryColor2} size={24}/>
                        </View>
                        <View style={{marginHorizontal: 6}}>
                            <Icon name='arrow-right' type="feather" color={Colors.primaryColor2} size={24}/>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryItemText}>{item.symbol}</Text>
                        </View>
                    </View>
                    <View style={styles.dataWrapper}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.label}>Amount</Text>
                            <View style={styles.valWrapper}>
                                <NumberLabel
                                    value={amount.value}
                                    decimals={0}
                                    style={styles.valueText}/>
                                <View style={styles.unitWrapper}>
                                    <Text style={styles.unit}>{amountUnit}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.label}>Buy Token Qty</Text>
                            <View style={styles.valWrapper}>
                                <NumberLabel
                                    value={token}
                                    decimals={2}
                                    style={styles.valueText}/>
                                <View style={styles.unitWrapper}>
                                    <Text style={styles.unit}>{item.symbol}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.label}>Your Balance</Text>
                            <View style={styles.valWrapper}>
                                <NumberLabel
                                    value={userData.balance}
                                    decimals={0}
                                    style={styles.valueText}/>
                                <View style={styles.unitWrapper}>
                                    <Text style={styles.unit}>{"USD"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </DialogContent>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 180,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.labelFont,
        letterSpacing: 0,
        marginBottom: 24
    },
    btnStyle: {
        backgroundColor: Colors.primaryColor,
    },
    btnTextStyle: {
        color: "white",
        fontWeight: "700"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingTop: 8,
        paddingLeft: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#e1e1e1",
    },
    label: {
        color: Colors.labelFont,
        fontSize: 14,
        fontWeight: "500",
    },
    valWrapper: {
        flexDirection: "row",
        alignItems: 'center',
    },
    valueText: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primaryColor,
        letterSpacing: 1,
    },
    unitWrapper: {
        marginLeft: 6
    },
    unit: {
        width: 40,
        color: Colors.unitFont,
        marginBottom: 1,
        fontSize: 12,
    },
    dataWrapper: {
        paddingHorizontal: 24,
        paddingTop: 8,
        width: Layout.window.width - 64,
    },
    summaryWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        opacity: 0.8
    },
    summaryItem: {
        borderWidth: 3,
        borderColor: Colors.primaryColor2,
        // padding: 32,
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    summaryItemText: {
        color: Colors.primaryColor2,
        fontWeight: "700",
        fontSize: 12,
    }
});

