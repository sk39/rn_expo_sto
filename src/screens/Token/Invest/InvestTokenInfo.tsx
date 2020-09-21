import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {observer} from "mobx-react";
import {RootStoreProps} from "@store/RootStoreProvider";
import InvestTokenState from "./InvestTokenState";
import CashImage from "@common/components/Image/CashImage";
import NumberLabel from "@common/components/Label/NumberLabel";
import Format from "@constants/Format";
import Colors from "@constants/Colors";

interface Props {
    tokenState: InvestTokenState;
}

@observer
export default class InvestTokenInfo extends PureComponent<RootStoreProps & Props> {

    render() {
        const {tokenState} = this.props;
        const item = tokenState.selectedItem;
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <CashImage source={item.imageSource}/>
                </View>
                <View style={{alignItems: "flex-start"}}>
                    <Text style={styles.titleNameText}>{item.name}</Text>
                    <Text style={styles.titleSymbolText}>{item.symbol}</Text>
                    <View style={styles.offeringPrice}>
                        <NumberLabel style={styles.value} value={1} suffix={item.symbol} suffixStyle={styles.unit}/>
                        <Text style={styles.separate}>=</Text>
                        <NumberLabel style={styles.value} value={item.offeringPrice} prefix={Format.baseCcySymbol}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    image: {
        width: 134,
        height: 88,
        marginRight: 16,
        borderRadius: 4,
        overflow: "hidden"
    },
    titleNameText: {
        // color: "white",
        fontSize: 16,
        fontWeight: "700",
        // letterSpacing: 1
    },
    titleSymbolText: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.labelFontThin,
        // letterSpacing: 1,
        marginTop: 2,
    },
    offeringPrice: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    separate: {
        fontSize: 16,
        color: Colors.labelFont,
        marginHorizontal: 6
    },
    value: {
        fontWeight: "700",
        fontSize: 16,
        color: Colors.primary,
        letterSpacing: 1
    },
    unit: {
        marginTop: 2,
        marginLeft: 2,
        fontSize: 14,
        color: Colors.primary,
        letterSpacing: 0
    },
});

