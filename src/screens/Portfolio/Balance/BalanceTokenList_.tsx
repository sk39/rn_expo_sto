import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import {ActionSheet, Icon} from "native-base";
import SimpleList from "@common/components/List/SimpleList";
import NumberLabel from "@common/components/Label/NumberLabel";
import Format from "@constants/Format";
import {BalanceTokenVM} from "./BalanceState";
import {CacheImage} from "@sk39/expo-image-cache";
import commonStyles from "@common/utils/commonStyle";

interface Props {
    list: BalanceTokenVM[];
    navigation: Navigation;
}

@observer
export default class BalanceTokenList extends Component<Props> {

    showDetail = (item) => {
        this.props.navigation.navigate("TokenDetail", {symbol: item.symbol})
    }

    showInvest = (item) => {
        this.props.navigation.navigate("InvestToken", {symbol: item.symbol})
    }

    onSelect(item) {
        let actions = [
            {label: "Show Detail", method: this.showDetail},
            {label: "Invest", method: this.showInvest},
            {label: t("btn.cancel")}
        ];
        const CANCEL_INDEX = actions.length - 1;
        ActionSheet.show(
            {
                options: actions.map(a => a.label),
                cancelButtonIndex: CANCEL_INDEX,
                title: `${item.name} Actions`
            },
            buttonIndex => {
                const action = actions[buttonIndex];
                if (action && action.method) {
                    action.method(item)
                }
            }
        )
    }

    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity key={index}
                              onPress={() => this.onSelect(item)}>
                <AnimatedRow delay={120 * index}>
                    <View style={styles.row}>
                        <View style={styles.tokenNameWrapper}>
                            <View style={styles.image}>
                                <CacheImage source={item.imageSource}/>
                            </View>
                            <Text style={styles.tokenName}>{item.name}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={styles.valueWrapper}>
                                <NumberLabel
                                    value={item.balanceBaseCurrency}
                                    prefix={Format.baseCcySymbol}
                                    style={styles.balanceBaseCurrency}
                                />
                                <NumberLabel
                                    value={item.balance}
                                    style={styles.value}
                                    suffix={item.symbol}
                                    suffixStyle={styles.unit}
                                />
                            </View>
                            <Icon name='more-vertical' type="Feather" style={styles.moreIcon}/>
                        </View>
                    </View>
                </AnimatedRow>
            </TouchableOpacity>
        )
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={[styles.headerCell]}>
                    <Text style={styles.headerText}>Token</Text>
                </View>
                <View style={[styles.headerCell, {paddingRight: 24}]}>
                    <Text style={styles.headerText}>Amount</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <SimpleList
                    data={this.props.list}
                    renderItem={this.renderItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingBottom: 8,
        borderBottomColor: Colors.listBorder,
        borderBottomWidth: 1,
    },
    headerCell: {},
    headerText: {
        color: Colors.labelFontThin,
        fontSize: 12,
    },
    image: {
        width: 66,
        height: 44,
        marginVertical: 4,
        marginRight: 10,
        borderRadius: 4,
        overflow: "hidden"
    },
    row: {
        padding: 8,
        paddingVertical: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder,
    },
    moreIcon: {
        fontSize: 16,
        marginLeft: 10,
        color: Colors.labelFontThin
    },
    tokenName: {
        color: Colors.font,
        fontSize: 14,
    },
    valueWrapper: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    value: {
        ...commonStyles.amountLabel,
        marginTop: 2,
        color: Colors.labelFont,
        fontSize: 14,
        fontWeight: "400"
    },
    unit: {
        color: Colors.unitFont,
        fontSize: 10,
        fontWeight: "700",
        lineHeight: 18,
        marginTop: 4,
        marginLeft: 4,
    },
    balanceBaseCurrency: {
        ...commonStyles.amountLabel,
        color: Colors.font,
        ...Platform.select({
            ios: {
                fontWeight: "500"
            },
        })
    },
    tokenNameWrapper: {
        flexDirection: "row",
        alignItems: "center"
    }
});
