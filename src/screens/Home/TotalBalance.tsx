import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {Text, View} from 'native-base';
import Colors from "@constants/Colors";
import data from "@constants/dummyData/userInfo";

@observer
export default class TotalBalance extends Component {

    render() {
        return (
            <View style={styles.balanceArea}>
                <Text style={styles.balanceLabel}>
                    Your Total Balance
                </Text>
                <Text style={styles.balanceValue}>
                    $ {data.balance}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    balanceArea: {
        flex: 1,
        paddingLeft: 24,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    balanceLabel: {
        color: Colors.primaryColorLight,
        fontSize: 16,
        fontWeight: "700",
        opacity: 0.65
    },
    balanceValue: {
        paddingLeft: 15,
        color: Colors.primaryColorLight,
        fontSize: 26,
        fontWeight: "700",
        letterSpacing: 1,
    }
});
