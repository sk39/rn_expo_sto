import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from "@constants/Colors";
import {STO} from "@common/model/domainModel";
import {Divider} from "react-native-elements";

interface Props {
    item: STO;
    small?: boolean;
}

export default class ListItemContent extends Component<Props> {

    renderContent(item, small) {
        const {raise, maxRaise, closeDate, symbol} = item;
        const raisePer = (Number(raise) / Number(maxRaise));

        if (small) {
            return (
                <View style={stylesMini.barContainer}>
                    <Progress.Bar progress={raisePer}
                                  width={188}
                                  height={3}
                                  color={Colors.primary}
                                  borderColor={"rgba(0,0,0,0)"}
                                  unfilledColor={Colors.primaryLight}/>
                </View>
            )
        }

        return (
            <View style={styles.contents}>
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

    renderHeader(item, small) {
        const {name, symbol, description, maxRaise} = item;
        if (small) {
            return (
                <View style={stylesMini.nameContainer}>
                    <Text style={stylesMini.title}>{name}</Text>
                    <View style={stylesMini.raiseContainer}>
                        <Text style={stylesMini.valueText}>{maxRaise}</Text>
                        <Text style={stylesMini.unitText}>{symbol}</Text>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.header}>
                <View style={styles.nameContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.symbol}>{symbol}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        );
    }

    render() {
        const {item, small} = this.props;
        return (
            <React.Fragment>
                {this.renderHeader(item, small)}
                {!small && <Divider/>}
                {this.renderContent(item, small)}
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 6,
        backgroundColor: "white",
        flexWrap: "nowrap",
        maxHeight: 80,
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
        paddingHorizontal: 12
    },
    title: {
        color: Colors.font,
        fontSize: 16,
        fontWeight: "700"
    },
    symbol: {
        color: Colors.primary,
        fontSize: 14,
        marginLeft: 12,
        fontWeight: "700"
    },
    description: {
        color: Colors.labelFont,
        fontSize: 14
    },
    contents: {
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
        maxHeight: 60,
        overflow: "hidden"
    },
    rightContainer: {
        flex: 1,
        borderLeftColor: "#eee",
        borderLeftWidth: 1,
        padding: 8,
        paddingHorizontal: 4,
        flexDirection: "column",
        alignItems: "center",
        maxHeight: 60,
        overflow: "hidden"
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

const stylesMini = StyleSheet.create({
    barContainer: {
        padding: 6
    },
    nameContainer: {
        paddingTop: 8,
        paddingLeft: 12,
        paddingRight: 6,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    title: {
        color: Colors.font,
        fontSize: 14,
        // fontWeight: "700"
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
        fontSize: 14,
        fontWeight: '700',
        color: Colors.primary,
        letterSpacing: 1,
    },
});
