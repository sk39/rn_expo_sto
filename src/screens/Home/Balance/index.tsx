import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {inject, observer} from "mobx-react";
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import {ActionSheet, Icon} from "native-base";
import SimpleList from "@common/components/List/SimpleList";
import NumberLabel from "@common/components/Label/NumberLabel";
import HomeChild from "../HomeChild";
import Skeleton from "@common/components/PageSupport/Skeleton";
import HomeListSupport from "../HomeListSupport";
import HomeChildTitle from "../HomeChildTitle";
import BalancePieChart from "../../Portfolio/Balance/BalancePieChart";
import BalanceState from "../../Portfolio/Balance/BalanceState";

@inject("rootStore")
@observer
export default class BalanceList extends HomeChild {

    balanceState: BalanceState;

    constructor(props) {
        super(props);
        this.balanceState = new BalanceState(props.rootStore.balance);
    }

    loadData(loggedIn) {
        if (loggedIn)
            this.balanceState.loadData().then();
    }

    showDetail(item) {
        this.props.navigation.navigate("TokenDetail", {symbol: item.symbol})
    }

    showInvest(item) {
        this.props.navigation.navigate("InvestToken", {symbol: item.symbol})
    }

    onSelect(item, index) {
        let actions = [];
        if (!item.symbol) {
            actions.push({label: "Deposit", method: () => alert("TODO:")})
            actions.push({label: "Withdraw", method: () => alert("TODO:")})
        } else {
            actions.push({label: "Show Detail", method: this.showDetail.bind(this)})
            actions.push({label: "Invest", method: this.showInvest.bind(this)})
        }

        actions.push({label: t("btn.cancel")});
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

    onLinkPress = () => {
        this.props.navigation.navigate("Portfolio")
    }

    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity key={item.symbol || "base"} onPress={() => this.onSelect(item, index)}>
                <AnimatedRow delay={120 * index}>
                    <View style={styles.row}>
                        <View style={styles.tokenNameWrapper}>
                            <View style={[styles.mark, {backgroundColor: item.color}]}/>
                            <Text style={styles.tokenName}>{item.name}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={styles.valueWrapper}>
                                <NumberLabel
                                    value={item.balanceBaseCurrency}
                                    decimals={0}
                                    prefix={"$"}
                                    style={styles.balanceBaseCurrency}
                                />
                            </View>
                            <Icon name='more-vertical' type="Feather" style={styles.moreIcon}/>
                        </View>
                    </View>
                </AnimatedRow>
            </TouchableOpacity>
        )
    }

    renderList() {
        const {auth} = this.props.rootStore;
        if (!auth.loggedIn || this.balanceState.list.length === 0) {
            return (
                <Skeleton line={4}/>
            )
        }
        return (
            <SimpleList
                data={this.balanceState.list}
                renderItem={this.renderItem}/>
        )
    }

    render() {
        const {balanceState} = this;
        return (
            <View style={styles.container}>
                <HomeChildTitle title="Your Balances"
                                linkTitle="Detail"
                                onLinkPress={this.onLinkPress}
                />
                <View style={styles.body}>
                    <View style={styles.chartWrapper}>
                        <BalancePieChart balanceState={balanceState}>
                            <Text style={styles.totalBalanceLabel}>
                                Total
                            </Text>
                            <NumberLabel
                                value={balanceState.total}
                                decimals={0}
                                prefix={"$"}
                                style={styles.totalBalance}/>
                        </BalancePieChart>
                    </View>
                    <View style={styles.listWrapper}>
                        {this.renderList()}
                    </View>
                </View>
                <HomeListSupport processing={this.balanceState.processing}
                                 needAuth
                                 errorMessage={this.balanceState.balancesStore.errorMessage}
                                 list={this.balanceState.list}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    body: {
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
        color: Colors.font,
        opacity: 0.8,
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 1,
    },
    row: {
        padding: 8,
        paddingVertical: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 36,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder,
    },
    moreIcon: {
        fontSize: 16,
        marginLeft: 8,
        color: Colors.labelFontThin
    },
    tokenName: {
        color: Colors.labelFont,
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 1
    },
    label: {
        color: Colors.labelFont,
        fontSize: 16,
    },
    valueWrapper: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    balanceBaseCurrency: {
        color: Colors.font,
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 1,
    },
    tokenNameWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    mark: {
        width: 8,
        height: 8,
        // borderRadius: 50,
        marginRight: 8
    }
});
