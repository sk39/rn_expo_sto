import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {inject, observer} from "mobx-react";
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";
import SimpleList from "@common/components/SimpleList";
import CashflowLineChart from "./CashflowLineChart";
import HomeChild from "../HomeChild";
import CashflowState from "./CashflowState";
import Skeleton from "@common/components/Skeleton";
import NoAuthMessage from "../NoAuthMessage";
import BlockLoading from "@common/components/BlockLoading";

@inject('rootStore')
@observer
export default class CashflowList extends HomeChild {

    cashflowState: CashflowState;

    constructor(props) {
        super(props);
        const {auth, balance} = this.props.rootStore;
        this.cashflowState = new CashflowState(auth, balance);
        this.renderItem = this.renderItem.bind(this);
    }

    loadData() {
        this.cashflowState.loadData();
    }

    clear() {
        this.cashflowState.clear();
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
        if (!auth.loggedIn || this.cashflowState.processing) {
            return (
                <Skeleton line={8}/>
            )
        }
        return (
            <SimpleList
                data={this.cashflowState.list}
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
                        <CashflowLineChart cashflowState={this.cashflowState}/>
                    </View>
                </View>
                <View style={styles.listWrapper}>
                    {this.renderList()}
                </View>
                <NoAuthMessage/>
                <BlockLoading
                    loading={this.cashflowState.processing}
                    disablesLayerColor="rgba(247,246,255,0.66)"/>
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
        paddingLeft: 22,
    },
    listWrapper: {
        minHeight: 80,
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
