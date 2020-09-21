import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import {Icon} from "react-native-elements";
import InvestTokenState from "./InvestTokenState";
import InvestInfo from "./InvestInfo";

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
                <Text style={styles.title}>Do you really want to invest?</Text>
                <View style={styles.summaryWrapper}>
                    <View style={styles.summaryItem}>
                        <Icon name='dollar-sign' type="feather" color={Colors.primary2} size={24}/>
                    </View>
                    <View style={{marginHorizontal: 6}}>
                        <Icon name='arrow-right' type="feather" color={Colors.primary2} size={24}/>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryItemText}>{item.symbol}</Text>
                    </View>
                </View>
                <View style={styles.dataWrapper}>
                    <InvestInfo tokenState={tokenState} showAmount/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 16,
        paddingTop: 32,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.labelFont,
        letterSpacing: 0,
        marginBottom: 24
    },
    dataWrapper: {
        width: "100%",
        paddingTop: 14
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
    }
});

