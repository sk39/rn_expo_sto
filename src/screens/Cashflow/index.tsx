import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import Colors from "@constants/Colors";
import {reaction} from "mobx";
import CashflowState from "./CashflowState";
import {RootStoreProps} from "@store/RootStoreProvider";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";
import SimpleList from "@common/components/List/SimpleList";
import BackButtonBehavior from "@common/components/PageSupport/AppEventBehavior/BackButtonBehavior";
import MyScrollView from "@common/components/PageSupport/MyScrollView";
import PageHeader from "@common/components/PageSupport/PageHeader";
import ListPageSupport from "@common/components/PageSupport/ListPageSupport";
import Format from "@constants/Format";

@inject('rootStore')
@observer
export default class CashflowScreen extends Component<NavigationProps & RootStoreProps> {

    cashflowState: CashflowState;
    disposer;

    constructor(props) {
        super(props);
        const {auth, balance} = this.props.rootStore;
        this.cashflowState = new CashflowState(auth, balance);
    }

    componentDidMount() {
        this.loadData();
        const {auth} = this.props.rootStore;
        this.disposer = reaction(
            () => auth.loggedIn,
            (loggedIn) => {
                if (loggedIn) {
                    this.loadData();
                } else {
                    this.clear();
                }
            }
        )
    }

    componentWillUnmount() {
        if (this.disposer)
            this.disposer();
    }

    loadData() {
        this.cashflowState.loadData();
    }

    clear() {
        this.cashflowState.clear();
    }

    onRefresh = async () => {
        return await this.cashflowState.loadData();
    }

    renderItem = ({item, index}) => {
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
                            prefix={Format.baseCcySymbol}
                            style={styles.value}
                            prefixStyle={styles.unit}
                            sign
                        />
                        <View style={{height: 4}}/>
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
        const {list} = this.cashflowState;
        return (
            <SimpleList data={list} renderItem={this.renderItem}/>
        )
    }

    render() {
        const {auth} = this.props.rootStore;
        const {list, processing} = this.cashflowState;
        return (
            <Container style={styles.back}>
                <PageHeader title={t("navigation.menu.Cashflow")}
                            navigation={this.props.navigation}/>
                <BackButtonBehavior navigation={this.props.navigation}/>
                <MyScrollView onRefresh={this.onRefresh}>
                    <View style={styles.listWrapper}>
                        {this.renderList()}
                    </View>
                </MyScrollView>
                <ListPageSupport auth={auth}
                                 processing={processing}
                                 list={list}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.back,
    },
    listWrapper: {
        paddingTop: 10,
        paddingBottom: 24,
    },
    row: {
        padding: 16,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder,
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
        fontSize: 12,
        letterSpacing: 1,
    },
    skeleton: {
        height: 16,
        marginVertical: 6,
        borderRadius: 12,
    }
});
