import React, {PureComponent} from 'react';
import {FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import InvestButton from "./InvestButton";
import Layout from "@constants/Layout";
import Toolbar from "./Toolbar";
import InputNumber from "@common/components/Input/InputNumber";
import {observer} from "mobx-react";
import InputNumberState from "@common/components/Input/InputNumberState";
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import ProcessDialogState from "@common/components/ProcessDialog/ProcessDialogState";
import ProcessDialog from "@common/components/ProcessDialog";
import ConfirmContent from "./ConfirmContent";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import userData from "@constants/dummyData/userInfo";

const offeringPrice = 200;

const FieldList = [
    {
        name: 'Offering Price',
        description: "TODO:description",
        render: (item) => {
            return (
                <View style={styles.valWrapper}>
                    <Text style={styles.valueText}>{offeringPrice}</Text>
                    <View style={styles.unitWrapper}>
                        <Text style={styles.unit}>{"USD"}</Text>
                    </View>
                </View>
            )
        }
    },
    {
        name: 'Minimum Payment',
        description: "TODO:description",
        render: (item) => {
            return (
                <View style={styles.valWrapper}>
                    <Text style={styles.valueText}>{offeringPrice}</Text>
                    <View style={styles.unitWrapper}>
                        <Text style={styles.unit}>{"USD"}</Text>
                    </View>
                </View>
            )
        }
    },
    {
        name: 'Your Balance',
        description: "TODO:description",
        render: (item) => {
            return (
                <View style={styles.valWrapper}>
                    <Text style={[styles.valueText]}>{userData.balance}</Text>
                    <View style={styles.unitWrapper}>
                        <Text style={styles.unit}>{"USD"}</Text>
                    </View>
                </View>
            )
        }
    },
    {
        name: 'Buy Token Qty',
        description: "TODO:description",
        render: (item, amount) => {
            if (!amount.value || amount.value.length === 0) {
                return (
                    <View style={styles.valWrapper}>
                        <Text style={styles.valueEmptyText}>(No entry amount)</Text>
                    </View>
                )
            }
            const token = Number(amount.value) / offeringPrice;
            return (
                <View style={styles.valWrapper}>
                    <Text style={styles.valueText}>{token.toFixed(1)}</Text>
                    <View style={styles.unitWrapper}>
                        <Text style={styles.unit}>{item.symbol}</Text>
                    </View>
                </View>
            )
        }
    }
];

@observer
export default class Invest extends PureComponent<any, any> {

    amount: InputNumberState;
    processState: ProcessDialogState = new ProcessDialogState();

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.amount = new InputNumberState();
        this.amount.setUnit("USD")
    }

    renderItem = ({item, index}) => {
        const fieldDef = item;
        const delay = 1000 + (index + 1) * 32;
        const selectedItem = this.props.item;
        return (
            <AnimatedRow delay={delay}>
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.label}>{fieldDef.name}</Text>
                        <Text style={styles.rowDescriptionText}>{fieldDef.description}</Text>
                    </View>
                    {fieldDef.render(selectedItem, this.amount)}
                </View>
            </AnimatedRow>
        );
    };

    handleChangeAmount() {

    }

    onPress() {
        this.processState.confirm();
    }

    onDone() {
        this.processState.startProcessing();
        setTimeout(() => {
            if (Number(this.amount.value) > 0) {
                this.processState.success();
            } else {
                this.processState.error("Amount must be more than zero.");
            }
        }, 1000)
    }

    onCancel() {
        this.processState.clear();
    }

    onClose() {
        this.processState.clear();
        this.props.onClose();
    }

    render() {
        const {onClose, item, isInvestMode} = this.props;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Toolbar item={item} onBackPress={onClose}/>
                    <ProcessDialog
                        model={this.processState}
                        onClose={this.onClose}
                        onError={this.onCancel}
                    >
                        <ConfirmContent amount={this.amount}
                                        amountUnit="USD"
                                        item={item}
                                        onDone={this.onDone}
                                        onCancel={this.onCancel}/>
                    </ProcessDialog>
                    <View style={{flex: 1, zIndex: 20}}>
                        <AnimatedRow key="description-row" delay={1000}>
                            <View style={styles.inputWrapper}>
                                <View style={{padding: 12}}>
                                    <Text style={styles.description}>How many tokens do you want to buy?</Text>
                                </View>
                                <View style={styles.rowInputContainer}>
                                    <Text style={[styles.label, {paddingTop: 12, paddingLeft: 12}]}>Amount</Text>
                                    <InputNumber inputState={this.amount}/>
                                </View>
                            </View>
                        </AnimatedRow>
                        <View style={{paddingTop: 12, paddingHorizontal: 24}}>
                            <FlatList
                                data={FieldList}
                                keyExtractor={item => item.name}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </View>
                    <InvestButton onPress={this.onPress}
                                  isHidden={!isInvestMode}
                                  disabled={this.amount.value.length === 0}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Layout.window.width,
    },
    rowInputContainer: {
        alignItems: 'flex-start',
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 24,
        paddingTop: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: "#e1e1e1",
        marginBottom: 6,
    },
    rowContainer: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 7,
        borderBottomWidth: 1,
        borderBottomColor: "#e1e1e1",
    },
    inputWrapper: {
        backgroundColor: "white",
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        ...getPlatformElevation(2),
        marginTop: -54,
    },
    label: {
        // color: Colors.labelFont,
        fontSize: 14,
        fontWeight: "500",
    },
    rowDescriptionText: {
        fontSize: 10,
        color: 'gray',
    },
    valWrapper: {
        flexDirection: "row",
        alignItems: 'center',
    },
    valueText: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primaryColor,
    },
    valueEmptyText: {
        fontSize: 18,
        fontWeight: "400",
        color: "#b3b1ba",
    },
    unitWrapper: {
        marginLeft: 8
    },
    unit: {
        width: 44,
        color: Colors.unitFont,
        fontSize: 12,
    },
    description: {
        color: Colors.primaryColor,
        textAlign: "center",
        fontSize: 18,
        paddingTop: 4,
    }
});

