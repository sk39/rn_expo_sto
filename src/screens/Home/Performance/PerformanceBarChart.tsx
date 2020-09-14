import React, {PureComponent} from 'react'
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts'
import Colors, {BarChartColor} from "@constants/Colors";
import {StyleSheet, Text, View} from "react-native";
import ViewUtils from "@common/utils/ViewUtils";
import PerformanceState from "./PerformanceState";
import {observer} from "mobx-react";

interface Props {
    performanceState: PerformanceState
}

@observer
export default class PerformanceBarChart extends PureComponent<Props> {

    render() {
        const data = this.props.performanceState.list
        const data1 = data.map(item => ({value: item.invest, label: item.term}))
        const data2 = data.map(item => ({value: item.current, label: item.term}))

        const barData = [
            {
                data: data1,
                svg: {
                    fill: BarChartColor[1],
                },
            },
            {
                data: data2,
                svg: {
                    fill: BarChartColor[0],
                },
            },
        ]

        return (
            <View>
                <View style={{paddingLeft: 60, paddingVertical: 6, paddingHorizontal: 8}}>
                    <BarChart
                        animate
                        style={{height: 200}}
                        data={barData}
                        yAccessor={({item}) => item.value}
                        contentInset={{top: 0, left: 30, right: 30, bottom: 0}}
                        spacingInner={0.7}
                        spacingOuter={0.2}
                        gridMin={0}
                    >
                        <Grid/>
                    </BarChart>
                    <YAxis
                        style={{
                            position: 'absolute', top: 0, bottom: 0, left: 8
                        }}
                        data={data2}
                        yAccessor={({item, index}) => item.value}
                        numberOfTicks={4}
                        contentInset={{
                            top: 12, bottom: 40,
                        }}
                        min={0}
                        formatLabel={(value, index) => `$${ViewUtils.numberFormat(value)}`}
                        svg={{
                            fontSize: 10,
                            fill: Colors.labelFont
                        }}
                    />
                    <XAxis
                        data={data1}
                        svg={{
                            fill: Colors.labelFont,
                            fontSize: 12,
                            fontWeight: 'bold',
                            // originY: 30,
                            y: 8,
                        }}
                        xAccessor={({item, index}) => index}
                        // scale={ scale }
                        numberOfTicks={4}
                        style={{marginHorizontal: 24, height: 30}}
                        contentInset={{left: 30, right: 30}}
                        formatLabel={(value, index) => data1[index].label}
                    />
                </View>
                <View style={styles.legendArea}>
                    <View style={styles.legend}>
                        <View style={[styles.legendMark, {backgroundColor: BarChartColor[1]}]}/>
                        <Text>Invest</Text>
                    </View>
                    <View style={styles.legend}>
                        <View style={[styles.legendMark, {backgroundColor: BarChartColor[0]}]}/>
                        <Text>Current</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    legendArea: {
        width: "100%",
        // paddingHorizontal: 6,
        paddingBottom: 24,
        flexDirection: "row",
        justifyContent: "center"
    },
    legend: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
    },
    legendMark: {
        width: 12,
        height: 12,
        marginRight: 12
    }
});
