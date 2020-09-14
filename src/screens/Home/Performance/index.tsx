import React from 'react';
import {StyleSheet, View} from 'react-native';
import {inject, observer} from "mobx-react";
import HomeChild from "../HomeChild";
import HomeChildTitle from "../HomeChildTitle";
import PerformanceBarChart from "./PerformanceBarChart";
import HomeListSupport from "../HomeListSupport";
import PerformanceState from "./PerformanceState";

@inject('rootStore')
@observer
export default class Performance extends HomeChild {

    performanceState: PerformanceState;

    constructor(props) {
        super(props);
        this.performanceState = new PerformanceState();
    }

    loadData(loggedIn) {
        if (loggedIn)
            this.performanceState.loadData();
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
        // justifyContent: "space-between",
        flexDirection: "row",
        paddingRight: 8,
        paddingLeft: 24,
    },
});
