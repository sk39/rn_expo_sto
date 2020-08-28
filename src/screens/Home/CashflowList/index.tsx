import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {inject, observer} from "mobx-react";
import data from '@constants/dummyData/cashflow';
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";
import SimpleList from "@common/components/SimpleList";
import CashflowLineChart from "./CashflowLineChart";
import HomeChild from "../HomeChild";
import CashflowCollection from "./CashflowCollection";
import ViewUtils from "@common/utils/ViewUtils";
import Skeleton from "@common/components/Skeleton";

@inject('rootStore')
@observer
export default class CashflowList extends HomeChild {

    collection = new CashflowCollection();

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    async loadData() {
        const {auth, balance} = this.props.rootStore;
        if (!auth.loggedIn) {
            return;
        }
        try {
            this.processing = true;
            this.collection.setData([]);
            await ViewUtils.sleep(1200);
            let total = Number(balance.deposit);
            const list = data.map(item => {
                const totalBalance = total;
                total = total - Number(item.cashBalance);
                return Object.assign({}, item, {totalBalance})
            });
            if (total > 0) {
                list.push({
                    name: 'Deposit',
                    date: "2017-01-01",
                    cashBalance: String(total),
                    totalBalance: total
                })
            }

            this.collection.setData(list);
        } catch (e) {

        } finally {
            this.processing = false;
        }
    }

    renderItem({item, index}) {
        return (
            <AnimatedRow key={index} delay={32 * index}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.dateLabel}>{item.date}</Text>
                        <Text style={styles.eventLabel}>{item.name}</Text>
                    </View>
                    <View style={{alignItems: "flex-end"}}>
                        <NumberLabel
                            value={item.cashBalance}
                            decimals={0}
                            prefix={"$"}
                            style={styles.value}
                            prefixStyle={styles.unit}
                            sign
                        />
                        <View style={{height: 2}}/>
                        <NumberLabel
                            value={item.totalBalance}
                            decimals={0}
                            prefix={"Total $"}
                            style={styles.totalBalance}
                        />
                    </View>
                </View>
            </AnimatedRow>
        )
    }

    renderList() {
        const {auth} = this.props.rootStore;
        if (!auth.loggedIn || this.processing) {
            return (
                <Skeleton line={8}/>
            )
        }
        return (
            <SimpleList
                data={this.collection.list}
                renderItem={this.renderItem}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Cashflow</Text>
                    </View>
                    <View style={styles.chartWrapper}>
                        <CashflowLineChart collection={this.collection}/>
                    </View>
                </View>
                <View style={styles.listWrapper}>
                    {this.renderList()}
                </View>
                {this.renderLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    header: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    titleWrapper: {
        zIndex: 1,
        flexWrap: "nowrap"
    },
    title: {
        marginTop: 4,
        fontSize: 18,
        color: Colors.primaryColorDark,
        opacity: 0.52,
        fontWeight: "700",
        letterSpacing: 1,
    },
    chartWrapper: {
        flex: 1,
        // paddingTop: 16,
        paddingLeft: 22,
        // paddingBottom: 8,
    },
    listWrapper: {
        minHeight: 80,
        // paddingLeft: 12,
    },
    row: {
        // flex: 1,
        padding: 8,
        paddingVertical: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorderColor,
    },
    dateLabel: {
        color: Colors.labelFontThin,
        fontSize: 12,
        letterSpacing: 1,
    },
    eventLabel: {
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        letterSpacing: 1,
    },
    unit: {
        color: Colors.labelFont,
        letterSpacing: 4,
    },
    totalBalance: {
        color: Colors.labelFont,
        fontSize: 10
    }
});
