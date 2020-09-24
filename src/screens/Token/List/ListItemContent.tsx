import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "@constants/Colors";
import {Icon} from "react-native-elements";
import StoVM from "@common/model/StoVM";
import InvestmentGoalLabel from "@common/components/Label/InvestmentGoalLabel";
import NumberLabel from "@common/components/Label/NumberLabel";

interface Props {
    item: StoVM;
}

export default class ListItemContent extends Component<Props> {

    renderContent(item) {
        const {investmentGoal, raisePerText, daysToGo, investors} = item;
        return (
            <React.Fragment>
                <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
                    <View style={styles.barContainer}>
                        <View style={[styles.bar, {width: `${raisePerText}%`}]}/>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.raiseContainer}>
                        <View style={[styles.raiseRow]}>
                            <NumberLabel value={raisePerText} decimals={1} style={styles.raisePerText} suffix="%"/>
                            <Text style={styles.raisePerTitle}>Funded</Text>
                        </View>
                        <View style={{height: 2}}/>
                        <View style={styles.raiseRow}>
                            <Text style={styles.goalTitle}>Goal</Text>
                            <InvestmentGoalLabel value={investmentGoal}
                                                 style={styles.goalValue}/>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.rightValWrapper}>
                            <Icon type="feather"
                                  name="users"
                                  size={styles.rightValText.fontSize}
                                  color={Colors.unitFont}/>
                            <Text style={styles.rightValText}>{investors}</Text>
                        </View>
                        <Text style={styles.rightUnitText}>investors</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.rightValWrapper}>
                            <Icon type="feather"
                                  name="clock"
                                  size={styles.rightValText.fontSize}
                                  color={Colors.unitFont}/>
                            <Text style={styles.rightValText}>{daysToGo}</Text>
                        </View>
                        <Text style={styles.rightUnitText}>days to go</Text>
                    </View>
                </View>
            </React.Fragment>
        );
    }

    renderHeader(item) {
        const {name, symbol, summary} = item;
        return (
            <View style={styles.header}>
                <View style={styles.nameContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.symbol}>{symbol}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description} numberOfLines={2}>{summary}</Text>
                </View>
            </View>
        );
    }

    render() {
        const {item} = this.props;
        return (
            <React.Fragment>
                {this.renderHeader(item)}
                {/*<Divider/>*/}
                {this.renderContent(item)}
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 8,
        backgroundColor: "white",
        flexWrap: "nowrap",
        maxHeight: 85,
        overflow: "hidden"
    },
    nameContainer: {
        paddingTop: 8,
        flexDirection: "row",
        alignItems: "flex-end",
        flexWrap: "nowrap",
    },
    descriptionContainer: {
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    title: {
        color: Colors.font,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
    symbol: {
        color: Colors.labelFont,
        fontSize: 12,
        marginLeft: 12,
        fontWeight: "700",
        marginBottom: 1,
    },
    description: {
        color: Colors.labelFont,
        fontSize: 14,
        lineHeight: 21,
    },
    contents: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white"
    },
    barContainer: {
        backgroundColor: Colors.primaryLight,
        height: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    bar: {
        position: "absolute",
        backgroundColor: Colors.primary,
        top: 0,
        bottom: 0,
        left: 0
    },
    dataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 4,
        paddingBottom: 10,
    },
    raiseContainer: {
        flex: 1.2,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    raiseRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    raisePerTitle: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primary,
    },
    raisePerText: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.primary,
    },
    goalTitle: {
        fontSize: 12,
        color: Colors.font,
        marginRight: 8,
    },
    goalValue: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.font,
    },
    rightContainer: {
        flex: 0.8,
        paddingHorizontal: 16,
        // paddingTop: 2,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    rightValWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    rightValText: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '700',
        color: Colors.font
    },
    rightUnitText: {
        fontSize: 12,
        color: Colors.unitFont,
        marginTop: 1,
    },
});

