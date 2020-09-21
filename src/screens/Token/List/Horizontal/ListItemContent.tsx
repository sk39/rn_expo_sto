import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "@constants/Colors";
import StoVM from "@common/model/StoVM";
import NumberLabel from "@common/components/Label/NumberLabel";

interface Props {
    item: StoVM;
}

export default class HorizontalListItemContent extends Component<Props> {

    render() {
        const {item} = this.props;
        const {investmentGoal, raisePerText, name} = item;
        return (
            <React.Fragment>
                <View style={styles.nameContainer}>
                    <Text style={styles.title}>{name}</Text>
                </View>
                <View style={styles.raiseContainer}>
                    <NumberLabel value={investmentGoal}
                                 style={[styles.valueText]}
                                 prefix="$"/>
                </View>
                <View style={styles.barWrapper}>
                    <View style={styles.barContainer}>
                        <View style={[styles.bar, {width: `${raisePerText}%`}]}/>
                    </View>
                </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    barWrapper: {
        paddingHorizontal: 12,
        paddingTop: 5,
        paddingBottom: 8,
    },
    barContainer: {
        backgroundColor: Colors.primaryLight,
        width: 180,
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
    nameContainer: {
        paddingTop: 4,
        paddingLeft: 8,
        // paddingBottom: 2,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    title: {
        color: Colors.labelFont,
        fontSize: 12,
        fontWeight: "700"
    },
    raiseContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingRight: 8
    },
    unitText: {
        fontSize: 10,
        color: Colors.unitFont,
        marginLeft: 2,
        marginBottom: 1
    },
    valueText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.font,
        // letterSpacing: 1,
    },
});
