import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from "../../../../constants/Colors";

interface Props {
    isDetail: boolean,
    item: {
        raise: string,
        maxRaise: string,
        closeDate: string;
    };
}

export default class Content extends Component<Props> {
    render() {
        const {raise, maxRaise, closeDate} = this.props.item;
        const raisePer = (Number(raise) / Number(maxRaise));
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.titleText}>Raised</Text>
                        <View style={styles.raiseContainer}>
                            <Text style={[styles.valueText, styles.bigText]}>{raise}</Text>
                            <Text style={styles.unitText}>ETH</Text>
                            <Text style={styles.labelText}>/</Text>
                            <Text style={styles.valueText}>{maxRaise}</Text>
                            <Text style={styles.unitText}>ETH</Text>
                        </View>
                    </View>

                    <View style={styles.barContainer}>
                        <Progress.Bar progress={raisePer}
                                      width={200}
                                      height={3}
                                      color={Colors.primaryColor}
                                      borderColor={"rgba(0,0,0,0)"}
                                      unfilledColor={Colors.primaryColorLight}/>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.titleText}>Close</Text>
                    <Text style={styles.valueText}>{closeDate}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // height: 100,
        alignItems: 'center',
        // justifyContent: 'center',
        // flex: 1,
    },
    leftContainer: {
        // flex: 3,
        padding: 8,
        paddingHorizontal: 12,
        paddingBottom: 4,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#eeeaff"
    },
    rightContainer: {
        flex: 1,
        borderLeftColor: "#eee",
        borderLeftWidth: 1,
        padding: 8,
        paddingHorizontal: 12,
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
        // flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 5
    },
    titleText: {
        fontSize: 14,
        color: Colors.labelFont
    },
    labelText: {
        fontSize: 12,
        color: Colors.labelFont,
        marginHorizontal: 2,
        marginBottom: 1
    },
    unitText: {
        fontSize: 12,
        color: Colors.unitFont,
        marginHorizontal: 2,
        marginBottom: 1
    },
    valueText: {
        paddingTop: 2,
        fontSize: 14,
        fontWeight: '700',
        color: Colors.primaryColor
    },
    bigText: {
        fontSize: 20,
        marginRight: 2
    }

});

