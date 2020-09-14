import React, {Component} from 'react'
import {PieChart} from 'react-native-svg-charts'
import BalanceState from "./BalanceState";
import {observer} from "mobx-react";
import {StyleSheet, View} from "react-native";

interface Props {
    balanceState: BalanceState;
    height?: number;
    outerRadius?: string;
    innerRadius?: string;
}

@observer
export default class BalancePieChart extends Component<Props> {

    static defaultProps = {
        height: 100,
        outerRadius: "98",
        innerRadius: "88"
    };

    render() {
        const {balanceState, height, outerRadius, innerRadius} = this.props
        const {chartData} = balanceState
        return (
            <View style={styles.container}>
                <PieChart style={{height}}
                          valueAccessor={({item}) => item.amount}
                          animate
                          data={chartData}
                          spacing={0}
                          outerRadius={outerRadius}
                          innerRadius={innerRadius}
                />
                <View style={styles.center}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    center: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
});
