import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import StoVM from "@common/model/StoVM";
import ViewUtils from "@common/utils/ViewUtils";
import NumberLabel from "@common/components/Label/NumberLabel";
import Format from "@constants/Format";
import {Icon} from "react-native-elements";

interface Props {
    selectedItem: StoVM
    phase?: string;
}

@observer
export default class DetailContents extends PureComponent<Props> {

    render() {
        const {selectedItem} = this.props;
        if (!selectedItem) {
            return null;
        }
        const item = selectedItem;
        return (
            <View style={styles.container}>

                <Title title="Description" paddingTop={6}/>
                <Text style={styles.descriptionDetail}>
                    {selectedItem.detail}
                </Text>

                <Title title="Information" paddingTop={32}/>
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

                <Title title="Legal" paddingTop={32}/>
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
                <View style={{height: 32}}/>
            </View>
        );
    }
}

function Title(props) {
    const {paddingTop, title} = props;
    return (
        <View style={{paddingTop, paddingBottom: 12}}>
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

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 56
    },
    descriptionDetail: {
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
        // letterSpacing: 1
    },
    subValue: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "700",
        color: Colors.primary,
        // letterSpacing: 1
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
    }
});
