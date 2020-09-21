import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from "mobx-react";
import HomeChildTitle from "../HomeChildTitle";
import PerformanceBarChart from "./PerformanceBarChart";
import HomeListSupport from "../HomeListSupport";
import PerformanceState from "./PerformanceState";
import RootStore from "@store/RootStore";

interface Props {
    rootStore: RootStore;
    navigation: Navigation
}

@observer
export default class Performance extends Component<Props> {

    performanceState: PerformanceState;

    constructor(props) {
        super(props);
        this.performanceState = new PerformanceState();
    }

    loadData(loggedIn) {
        loggedIn
            ? this.performanceState.loadData()
            : this.performanceState.clear();
    }

    onLinkPress = () => {
        alert("TODO:")
    }

    render() {
        return (
            <View style={styles.container}>
                <HomeChildTitle title="Performance"
                                linkTitle="Detail"
                                onLinkPress={this.onLinkPress}
                />
                <PerformanceBarChart
                    performanceState={this.performanceState}/>
                <HomeListSupport
                    needAuth
                    processing={this.performanceState.processing}
                    list={this.performanceState.list}
                />
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
});
