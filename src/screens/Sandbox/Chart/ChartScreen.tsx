import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {observer} from "mobx-react";
import {Container} from 'native-base';
import Colors from "@constants/Colors";
import GradientLineExample from "./examples/GradientLineExample";
import AreaStackWithAxisExample from "./examples/AreaStackWithAxisExample";
import PieChartExample from "./examples/PieChartExample";
import AreaChartExample from "./examples/AreaChartExample";
import {Card} from "react-native-elements";
import BarChartExample from "./examples/BarChartExample";
import StackedBarChartExample from "./examples/StackedBarChartExample";

@observer
export default class ChartScreen extends Component<NavigationProps> {

    render() {
        return (
            <Container style={styles.container}>
                <ScrollView>
                    <Card containerStyle={styles.chartRow}>
                        <Text style={styles.chartRowTitle}>Pie Chart</Text>
                        <PieChartExample/>
                    </Card>
                    <Card containerStyle={styles.chartRow}>
                        <Text style={styles.chartRowTitle}>Gradient Line Chart</Text>
                        <GradientLineExample/>
                    </Card>
                    <Card containerStyle={styles.chartRow}>
                        <Text style={styles.chartRowTitle}>Area Chart</Text>
                        <AreaChartExample/>
                    </Card>
                    <Card containerStyle={styles.chartRow}>
                        <Text style={styles.chartRowTitle}>Area Stack Chart</Text>
                        <AreaStackWithAxisExample/>
                    </Card>
                    <Card containerStyle={styles.chartRow}>
                        <Text style={styles.chartRowTitle}>Bar Chart</Text>
                        <BarChartExample/>
                    </Card>
                    <Card containerStyle={styles.chartRow}>
                        <Text style={styles.chartRowTitle}>Stacked Bar Chart</Text>
                        <StackedBarChartExample/>
                    </Card>
                    <View style={{paddingBottom: 24}}/>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: Colors.back,
    },
    chartRow: {
        backgroundColor: Colors.cardBack,
        borderRadius: 5,
        borderColor: Colors.listBorder,
        padding: 0,
    },
    chartRowTitle: {
        color: Colors.tabDefault,
        fontSize: 16,
        paddingVertical: 8,
        textAlign: "center"
    }
});
