import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import SimpleList from "@common/components/List/SimpleList";
import NumberLabel from "@common/components/Label/NumberLabel";
import Skeleton from "@common/components/PageSupport/Skeleton";
import BalancePieChart from "../../Portfolio/Balance/BalancePieChart";
import BalanceState from "../../Portfolio/Balance/BalanceState";
import Format from "@constants/Format";
import Layout from "@constants/Layout";
import commonStyles from "@common/utils/commonStyle";

interface Props {
    balanceState: BalanceState;
    large?: boolean;
    checkAuth?: boolean;
}

@observer
export default class BalanceSummary extends Component<Props> {

    renderItem = ({item, index}) => {
        const styles = stylesNormal;
        const stylesChange = this.props.large ? stylesLarge : stylesNormal;
        return (
            <View key={index}>
                <AnimatedRow delay={120 * index}>
                    <View style={styles.row}>
                        <View style={styles.titleWrapper}>
                            <View style={[styles.mark, {backgroundColor: item.color}]}/>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={styles.valueWrapper}>
                                <NumberLabel
                                    value={item.balanceBaseCurrency}
                                    decimals={0}
                                    prefix={Format.baseCcySymbol}
                                    style={stylesChange.value}
                                />
                            </View>
                        </View>
                    </View>
                </AnimatedRow>
            </View>
        )
    }

    renderList() {
        const {balanceState} = this.props;
        const {checkAuth} = this.props;
        if (checkAuth &&
            (!balanceState.authStore.loggedIn || balanceState.summary.length === 0)) {
            return (
                <Skeleton line={4}/>
            )
        }
        return (
            <SimpleList
                data={balanceState.summary}
                renderItem={this.renderItem}/>
        )
    }

    render() {
        const {balanceState, large} = this.props;
        const styles = large ? stylesLarge : stylesNormal;
        return (
            <View style={styles.container}>
                <View style={styles.chartWrapper}>
                    <BalancePieChart balanceState={balanceState} height={large ? 170 : 100}>
                        <Text style={styles.totalBalanceLabel}>
                            Total
                        </Text>
                        <NumberLabel
                            value={balanceState.total}
                            decimals={0}
                            prefix={Format.baseCcySymbol}
                            style={styles.totalBalance}/>
                    </BalancePieChart>
                </View>
                <View style={styles.listWrapper}>
                    {this.renderList()}
                </View>
            </View>
        )
    }
}

const stylesNormal = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        paddingRight: 8,
        paddingLeft: 24,
    },
    chartWrapper: {
        width: 120,
    },
    listWrapper: {
        flex: 1,
        paddingLeft: 16,
    },
    totalBalanceLabel: {
        marginTop: -5,
        color: Colors.labelFont,
        fontSize: 10,
        opacity: 0.6,
        fontWeight: "700",
        letterSpacing: 1,
        ...Platform.select({
            ios: {
                marginBottom: 2,
            },
        })
    },
    totalBalance: {
        ...commonStyles.amountLabel,
        color: Colors.font,
        opacity: 0.8,
        fontSize: 14,
    },
    row: {
        padding: 10,
        paddingVertical: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 36,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder,
    },
    titleWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        color: Colors.labelFont,
        fontSize: 14,
        fontWeight: "700",
    },
    valueWrapper: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    value: {
        ...commonStyles.amountLabel,
        color: Colors.font,
        fontSize: 14,
        ...Platform.select({
            ios: {
                fontWeight: "500"
            },
        })
    },
    mark: {
        width: 8,
        height: 8,
        // borderRadius: 50,
        marginRight: 8
    }
});

const stylesLarge = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    chartWrapper: {
        width: 200,
    },
    listWrapper: {
        paddingTop: 16,
        paddingHorizontal: 48,
        width: Layout.window.width,
    },
    totalBalanceLabel: {
        marginTop: -7,
        color: Colors.labelFont,
        fontSize: 16,
        opacity: 0.6,
        fontWeight: "700",
        letterSpacing: 1,
        ...Platform.select({
            ios: {
                marginBottom: 2,
            },
        })
    },
    totalBalance: {
        ...commonStyles.amountLabel,
        color: Colors.font,
        opacity: 0.8,
        fontSize: 22,
    },
    value: {
        ...commonStyles.amountLabel,
        color: Colors.font,
        fontSize: 16,
        ...Platform.select({
            ios: {
                fontWeight: "500"
            },
        })
    },
});
