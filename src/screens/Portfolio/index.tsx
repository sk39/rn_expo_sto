import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container} from 'native-base';
import Colors from "@constants/Colors";
import {observable} from "mobx";
import BackButtonBehavior from "@common/components/PageSupport/AppEventBehavior/BackButtonBehavior";
import PageHeader from "@common/components/PageSupport/PageHeader";
import MyScrollView from "@common/components/PageSupport/MyScrollView";
import BalanceState from "./Balance/BalanceState";
import MobxHelper from "@common/utils/MobxHelper";
import {RootStoreProps} from "@store/RootStoreProvider";
import ListPageSupport from "@common/components/PageSupport/ListPageSupport";
import BalanceSummary from "./Balance/BalanceSummary";
import BalanceTokenList from "./Balance/BalanceTokenList_";

@inject("rootStore")
@observer
export default class Portfolio extends Component<NavigationProps & RootStoreProps> {

    @observable scroll = new Animated.Value(0);

    balanceState: BalanceState;
    mobxHelper = new MobxHelper()

    constructor(props) {
        super(props);
        this.balanceState = new BalanceState(props.rootStore);
    }

    componentDidMount() {
        const {auth} = this.props.rootStore;
        this.mobxHelper.reaction(
            () => auth.loggedIn,
            (loggedIn) => this.loadData(loggedIn)
        )
        this.loadData(auth.loggedIn);
    }

    componentWillUnmount() {
        this.mobxHelper.onUnmount()
    }

    async loadData(loggedIn) {
        if (loggedIn)
            return this.balanceState.loadData();
        else
            this.balanceState.clear()
    }

    onRefresh = async () => {
        const {auth} = this.props.rootStore;
        return await this.loadData(auth.loggedIn);
    }

    renderContents() {
        const {auth} = this.props.rootStore
        if (!auth.loggedIn) {
            return null;
        }
        const {navigation} = this.props;
        return (
            <React.Fragment>
                <Area title="Summary" bodyStyle={styles.areaBodySummary}>
                    <BalanceSummary balanceState={this.balanceState} large/>
                </Area>
                <Area title="Funded">
                    <BalanceTokenList list={this.balanceState.ownTokens}
                                      navigation={navigation}/>
                </Area>
                <Area title="On order">
                    <BalanceTokenList list={this.balanceState.onOrderTokens}
                                      navigation={navigation}/>
                </Area>
            </React.Fragment>
        )
    }

    render() {
        const {auth} = this.props.rootStore
        return (
            <Container style={styles.back}>
                <PageHeader title={t("navigation.menu.Portfolio")}
                            navigation={this.props.navigation}/>
                <BackButtonBehavior navigation={this.props.navigation}/>
                <View style={styles.body}>
                    <MyScrollView onRefresh={this.onRefresh}>
                        {this.renderContents()}
                    </MyScrollView>
                </View>
                <ListPageSupport processing={this.balanceState.processing}
                                 errorMessage={this.balanceState.balancesStore.errorMessage}
                                 auth={auth}
                                 list={this.balanceState.summary}/>
            </Container>
        );
    }
}

function Area(props) {
    const {title, bodyStyle} = props;
    return (
        <View style={styles.area}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={bodyStyle || styles.areaBody}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.back,
    },
    body: {
        flex: 1,
        justifyContent: "center",
    },
    titleArea: {
        backgroundColor: Colors.back3,
        padding: 8,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 16,
        color: Colors.toolBarInverse,
        opacity: 0.7,
        fontWeight: "700",
        letterSpacing: 1,
    },
    area: {
        // paddingTop: 4,
        paddingBottom: 24,
    },
    areaBodySummary: {
        paddingTop: 24,
        paddingRight: 12
    },
    areaBody: {
        paddingTop: 16,
        paddingHorizontal: 12,
    }

});
