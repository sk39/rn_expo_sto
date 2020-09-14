import React, {Component} from 'react';
import {Animated, RefreshControl, StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import Colors from "@constants/Colors";
import {observable, reaction} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";
import CashflowState from "./CashflowState";
import {RootStoreProps} from "@store/RootStoreProvider";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";
import Skeleton from "@common/components/PageSupport/Skeleton";
import SimpleList from "@common/components/List/SimpleList";
import CashflowListSupport from "./CashflowListSupport";
import Layout from "@constants/Layout";
import PageHeader from "@common/components/PageSupport/PageHeader";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";

@inject('rootStore')
@observer
export default class CashflowScreen extends Component<NavigationProps & RootStoreProps> {

    @observable refreshing = false;

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
        this.refreshing = true;
        await ViewUtils.sleep(300);
        this.refreshing = false;
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
        if (!auth.loggedIn || this.cashflowState.list.length === 0) {
            return (
                <Skeleton line={15} barStyle={styles.skeleton}/>
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
        const {navigation} = this.props;

        return (
            <Container style={styles.back}>
                <PageHeader title={t("navigation.menu.Cashflow")} navigation={this.props.navigation}/>
                <View>
                    <Animated.ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.refreshing}
                                            onRefresh={this.onRefresh}/>
                        }>
                        <View style={styles.listWrapper}>
                            {this.renderList()}
                        </View>
                    </Animated.ScrollView>
                    {/*<View style={styles.chartArea}>*/}
                    {/*    <CashflowLineChart cashflowState={this.cashflowState}/>*/}
                    {/*</View>*/}
                    <CashflowListSupport
                        processing={this.cashflowState.processing}
                        list={this.cashflowState.list}/>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.back,
    },
    chartArea: {
        width: Layout.window.width,
        // height: 50,
        paddingVertical: 8,
        // backgroundColor: Colors.secondThin
    },
    listWrapper: {
        paddingVertical: 10,
        ...getPlatformElevation(2)
    },
    row: {
        // backgroundColor: Colors.back,
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
        fontSize: 10
    },
    skeleton: {
        height: 16,
        marginVertical: 6,
        borderRadius: 12,
    }
});
