import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import DialogContent from "@common/components/ProcessDialog/DialogContent";
import Layout from "@constants/Layout";

@observer
export default class ConfirmContent extends PureComponent<any, any> {

    render() {
        const {onDone, onCancel, amount, amountUnit, item} = this.props;
        const token = Number(amount.value) / 2;
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
                    <Text style={styles.title}>Confirm</Text>
                    <View style={styles.dataWrapper}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.label}>Amount</Text>
                            <View style={styles.valWrapper}>
                                <Text style={styles.valueText}>{amount.value}</Text>
                                <View style={styles.unitWrapper}>
                                    <Text style={styles.unit}>{amountUnit}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.label}>Buy Token Qty</Text>
                            <View style={styles.valWrapper}>
                                <Text style={styles.valueText}>{token.toFixed(1)}</Text>
                                <View style={styles.unitWrapper}>
                                    <Text style={styles.unit}>{item.symbol}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.label}>Your Balance</Text>
                            <View style={styles.valWrapper}>
                                <Text style={styles.valueText}>327,640</Text>
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
        fontSize: 20,
        fontWeight: "700",
        color: Colors.labelFont,
        letterSpacing: 2,
        marginBottom: 6
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
        paddingLeft: 8,
        paddingRight: 2,
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
        color: Colors.primaryColor
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
        paddingTop: 16,
        paddingBottom: 32,
        width: Layout.window.width - 64,
    }
});

