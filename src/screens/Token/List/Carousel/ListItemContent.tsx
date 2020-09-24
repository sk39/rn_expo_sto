import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "@constants/Colors";
import StoVM from "@common/model/StoVM";
import {Icon} from "react-native-elements";
import InvestmentGoalLabel from "@common/components/Label/InvestmentGoalLabel";

interface Props {
    item: StoVM;
}

export default class CarouselListItemContent extends Component<Props> {

    render() {
        const {item} = this.props;
        const {raisePerText, investmentGoal, name, summary} = item;
        const {daysToGo, investors} = item;
        return (
            <View style={styles.back}>
                <View style={styles.nameContainer}>
                    <View>
                        <Text style={[styles.text, styles.title]}>{name}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{summary}</Text>
                    </View>
                </View>
                <View style={styles.raiseContainer}>
                    <View style={styles.barContainer}>
                        <View style={[styles.bar, {width: `${raisePerText}%`}]}/>
                    </View>
                    <InvestmentGoalLabel value={investmentGoal}
                                         style={[styles.text, styles.valueText]}/>
                    <View style={styles.rightValWrapper}>
                        <Icon type="feather"
                              name="users"
                              size={styles.rightValText.fontSize}
                              color={"white"}/>
                        <Text style={[styles.text, styles.rightValText]}>{investors}</Text>
                    </View>
                    <View style={styles.rightValWrapper}>
                        <Icon type="feather"
                              name="clock"
                              size={styles.rightValText.fontSize}
                              color={"white"}/>
                        <Text style={[styles.text, styles.rightValText]}>{daysToGo}</Text>
                        <Text style={[styles.text, styles.rightUnitText]}>days</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.08)",
        bottom: 0,
        left: 0,
        right: 0,
    },
    nameContainer: {
        padding: 8,
        paddingHorizontal: 16,
    },
    text: {
        color: "white",
        textShadowOffset: {width: 1, height: 1},
        textShadowColor: Colors.font,
        textShadowRadius: 10,
        fontSize: 13,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
    raiseContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 24,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    barContainer: {
        backgroundColor: Colors.link,
        height: 8,
        width: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "white",
        borderWidth: 1,
        overflow: "hidden",
        marginBottom: 5,
        marginRight: 5,
    },
    bar: {
        position: "absolute",
        backgroundColor: "white",
        top: 0,
        bottom: 0,
        left: 0
    },
    unitText: {
        marginLeft: 2,
        fontSize: 10,
        marginTop: 3,
    },
    valueText: {
        fontSize: 14,
        fontWeight: '700',
    },
    separate: {
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 2,
    },
    rightValWrapper: {
        flexDirection: 'row',
        paddingLeft: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightValText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: "700",
    },
    rightUnitText: {
        marginLeft: 2,
        fontSize: 10,
        marginTop: 3,
    }
});
