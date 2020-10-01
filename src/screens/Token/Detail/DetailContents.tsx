import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import Colors, {NotifyColor} from "@constants/Colors";
import {observer} from "mobx-react";
import StoVM from "@common/model/StoVM";
import ViewUtils from "@common/utils/ViewUtils";
import NumberLabel from "@common/components/Label/NumberLabel";
import Format from "@constants/Format";
import {Icon} from "react-native-elements";
import InvestmentGoalLabel from "@common/components/Label/InvestmentGoalLabel";
import Layout from "@constants/Layout";
import STOStatusLabel from "@common/components/Label/STOStatusLabel";

interface Props {
    item: StoVM
}

@observer
export default class DetailContents extends PureComponent<Props> {

    renderTitle(item) {
        const {name, symbol, summary} = item;
        return (
            <View style={styles.pageTileArea}>
                <View style={styles.nameContainer}>
                    <Text style={styles.tokenName}>{name}</Text>
                    <Text style={styles.symbol}>{symbol}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{summary}</Text>
                </View>
            </View>
        );
    }

    renderFund(item) {
        const {raisePerText, investmentGoal, daysToGo, investors} = item;
        return (
            <React.Fragment>
                <View style={styles.alignCenter}>
                    <View style={styles.barContainer}>
                        <View style={[styles.bar, {width: `${raisePerText}%`}]}/>
                    </View>
                    <View style={styles.raiseGoalArea}>
                        <View style={[styles.raiseRow]}>
                            <NumberLabel value={raisePerText}
                                         decimals={1}
                                         style={styles.raisePerText} suffix="%"/>
                            <Text style={styles.raisePerTitle}>Funded</Text>
                        </View>
                        <View style={styles.raiseRow}>
                            <Text style={styles.goalTitle}>Goal</Text>
                            <InvestmentGoalLabel value={investmentGoal}
                                                 style={styles.goalValue}/>
                        </View>
                    </View>
                </View>
                <View style={styles.blockArea}>
                    <STOStatusLabel item={item}
                                    containerStyle={styles.blockContainer}
                                    titleStyle={styles.statusTitle}/>
                    <Block icon="users"
                           value={investors}
                           unit="investors"
                           notifyColor={NotifyColor.normal}/>

                    <Block icon="clock"
                           value={daysToGo}
                           unit="days to go"
                           notifyColor={daysToGo < 5 ? NotifyColor.waring : NotifyColor.success}/>
                </View>
            </React.Fragment>
        )
    }

    renderInformation(item) {
        return (
            <View>
                <Row title="Name">
                    <Text style={styles.value}>{item.name}</Text>
                </Row>
                <Row title="Symbol">
                    <Text style={styles.value}>{item.symbol}</Text>
                </Row>
                <Row title="Status">
                    <Text style={styles.value}>{t(`screen.tokens.status.${item.status}`)}</Text>
                </Row>
                <Row title="Close Date">
                    <Text style={styles.value}>{ViewUtils.dateFormat(item.closeDate)}</Text>
                    <NumberLabel style={styles.subValue}
                                 value={item.daysToGo}
                                 suffix={"days to go"}
                                 suffixStyle={{marginLeft: 4}}/>
                </Row>
                <Row title="Investment Goal">
                    <NumberLabel style={styles.value} value={item.investmentGoal} prefix={Format.baseCcySymbol}/>
                </Row>
                <Row title="Funded">
                    <NumberLabel style={styles.value} value={item.investedAmount} prefix={Format.baseCcySymbol}/>
                    <NumberLabel style={styles.subValue} value={item.raisePerText} decimals={1} suffix={"%"}/>
                </Row>
                <Row title="Investors">
                    <NumberLabel style={styles.value} value={item.investors}/>
                </Row>
                <Row title="Offering Price">
                    <View style={styles.flexRow}>
                        <NumberLabel style={styles.value} value={1} suffix={item.symbol} suffixStyle={styles.unit}/>
                        <Text style={styles.separate}>=</Text>
                        <NumberLabel style={styles.value} value={item.offeringPrice} prefix={Format.baseCcySymbol}/>
                    </View>
                </Row>
            </View>
        )
    }

    renderRegal(item) {
        return (
            <View>
                <Row title="Issuer">
                    <Text style={styles.value}>{"Hoge Fund"}</Text>
                </Row>
                <Row title="Country">
                    <Text style={styles.value}>{"Japan"}</Text>
                </Row>
                <Row title="KYC">
                    <Required/>
                </Row>
                <Row title="AML">
                    <Required/>
                </Row>
            </View>
        )
    }

    render() {
        const {item} = this.props;
        if (!item) {
            return null;
        }

        return (
            <View style={styles.container}>
                {this.renderTitle(item)}

                {this.renderFund(item)}

                <View style={{height: 12}}/>
                <Title title="Description"/>
                <Text style={styles.description}>
                    {item.detail}
                </Text>

                <View style={{height: 24}}/>
                <Title title="Information"/>
                {this.renderInformation(item)}

                <View style={{height: 24}}/>
                <Title title="Legal"/>
                {this.renderRegal(item)}
            </View>
        );
    }
}

function Title(props) {
    const {title} = props;
    return (
        <View style={{paddingVertical: 20}}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

function Row(props) {
    const {title, children} = props;
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{title}</Text>
            <View style={{alignItems: "flex-end"}}>
                {children}
            </View>
        </View>
    )
}

function Required() {
    return (
        <View style={styles.flexRow}>
            <Icon type="feather" name="check" size={16} color={Colors.primary}/>
            <Text style={[styles.value, {fontSize: 14, marginLeft: 4, letterSpacing: 0}]}>{"Required"}</Text>
        </View>
    )
}

function Block({icon, value, unit, notifyColor}) {
    const {backgroundColor, color} = notifyColor;
    return (
        <View style={[styles.blockContainer, {backgroundColor}]}>
            <View style={styles.blockWrapper}>
                <Icon type="feather"
                      name={icon}
                      size={styles.blockValText.fontSize}
                      color={color}/>
                <Text style={[styles.blockValText, {color}]}>{value}</Text>
            </View>
            <Text style={[styles.blockUnitText, {color}]}>{unit}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 32,
    },
    description: {
        color: Colors.labelFont,
        fontSize: 14,
        lineHeight: 22
    },
    row: {
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: Colors.listBorder,
        borderBottomWidth: 1,
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.labelFont,
        opacity: 0.9,
    },
    label: {
        fontSize: 14,
        color: Colors.labelFont
    },
    value: {
        fontSize: 14,
        color: Colors.font,
    },
    subValue: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primary,
    },
    unit: {
        marginTop: 2,
        marginLeft: 2,
        fontSize: 12,
        color: Colors.labelFont
    },
    separate: {
        fontSize: 14,
        color: Colors.labelFont,
        marginHorizontal: 6
    },
    pageTileArea: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 20,
        flexWrap: "nowrap",
        overflow: "hidden"
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        flexWrap: "nowrap",
    },
    descriptionContainer: {
        paddingTop: 10,
    },
    tokenName: {
        color: Colors.font,
        fontSize: 18,
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
    barContainer: {
        backgroundColor: Colors.primaryLight,
        height: 6,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        width: Layout.window.width - 40
    },
    bar: {
        position: "absolute",
        backgroundColor: Colors.primary,
        borderRadius: 6,
        top: 0,
        bottom: 0,
        left: 0
    },
    alignCenter: {
        alignItems: 'center',
    },
    raiseGoalArea: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    raiseRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 6,
    },
    raisePerTitle: {
        marginLeft: 4,
        marginRight: 18,
        fontSize: 18,
        // fontWeight: "700",
        color: Colors.primary,
    },
    raisePerText: {
        fontSize: 22,
        marginBottom: -2,
        fontWeight: "700",
        color: Colors.primary,
    },
    goalTitle: {
        fontSize: 18,
        color: Colors.font,
        marginRight: 10,
    },
    goalValue: {
        fontSize: 18,
        // fontWeight: "700",
        color: Colors.font,
    },
    blockArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20
    },
    blockContainer: {
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 8,
        width: "31%",
        height: 68,
    },
    statusTitle: {
        fontSize: 16,
    },
    blockWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    blockValText: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: '700',
        color: Colors.font
    },
    blockUnitText: {
        fontSize: 16,
        color: Colors.font,
        marginTop: 2,
    }
});
