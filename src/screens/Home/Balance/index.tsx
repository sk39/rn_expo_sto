import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from "mobx-react";
import HomeListSupport from "../HomeListSupport";
import HomeChildTitle from "../HomeChildTitle";
import BalanceState from "../../Portfolio/Balance/BalanceState";
import RootStore from "@store/RootStore";
import BalanceSummary from "../../Portfolio/Balance/BalanceSummary";

interface Props {
    rootStore: RootStore;
    navigation: Navigation
}

@observer
export default class Balance extends Component<Props> {

    balanceState: BalanceState;

    constructor(props) {
        super(props);
        this.balanceState = new BalanceState(props.rootStore);
    }

    loadData(loggedIn) {
        loggedIn
            ? this.balanceState.loadData()
            : this.balanceState.clear();
    }

    onLinkPress = () => {
        this.props.navigation.navigate("Portfolio")
    }

    render() {
        const {balanceState} = this;
        return (
            <View style={styles.container}>
                <HomeChildTitle title="Your Balances"
                                linkTitle="Portfolio"
                                onLinkPress={this.onLinkPress}
                />
                <BalanceSummary balanceState={balanceState} checkAuth/>
                <HomeListSupport processing={this.balanceState.processing}
                                 needAuth
                                 errorMessage={this.balanceState.balancesStore.errorMessage}
                                 list={this.balanceState.summary}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    }
});
