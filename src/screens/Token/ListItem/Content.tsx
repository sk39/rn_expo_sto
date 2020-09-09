import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from "@constants/Colors";
import {STO} from "@common/model/domainModel";

interface Props {
    item: STO;
}

export default class Content extends Component<Props> {
    render() {
        const {raise, maxRaise, closeDate, symbol} = this.props.item;
        const raisePer = (Number(raise) / Number(maxRaise));
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.titleText}>Raised</Text>
                        <View style={styles.raiseContainer}>
                            <Text style={[styles.valueText, styles.bigText]}>{raise}</Text>
                            {/*<Text style={styles.unitText}>{symbol}</Text>*/}
                            <Text style={styles.labelText}>/</Text>
                            <Text style={styles.valueText}>{maxRaise}</Text>
                            <Text style={styles.unitText}>{symbol}</Text>
                        </View>
                    </View>

                    <View style={styles.barContainer}>
                        <Progress.Bar progress={raisePer}
                                      width={200}
                                      height={3}
                                      color={Colors.primary}
                                      borderColor={"rgba(0,0,0,0)"}
                                      unfilledColor={Colors.primaryLight}/>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.titleText}>Close</Text>
                    <Text style={styles.dateText}>{closeDate}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white"
    },
    leftContainer: {
        padding: 8,
        paddingHorizontal: 14,
        paddingBottom: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    rightContainer: {
        flex: 1,
        borderLeftColor: "#eee",
        borderLeftWidth: 1,
        padding: 8,
        paddingHorizontal: 4,
        flexDirection: "column",
        alignItems: "center"
    },
    rowContainer: {
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    raiseContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingRight: 8
    },
    barContainer: {
        paddingVertical: 4,
        paddingHorizontal: 5
    },
    titleText: {
        fontSize: 14,
        color: Colors.labelFont
    },
    labelText: {
        fontSize: 13,
        color: Colors.labelFont,
        marginHorizontal: 3,
        marginBottom: 1
    },
    unitText: {
        fontSize: 13,
        color: Colors.unitFont,
        marginLeft: 8,
        marginBottom: 1
    },
    valueText: {
        paddingTop: 2,
        fontSize: 14,
        fontWeight: '700',
        color: Colors.primary
    },
    dateText: {
        paddingTop: 2,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.primary
    },
    bigText: {
        fontSize: 20,
        marginRight: 2
    }
});

