import React, {PureComponent} from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import Layout from "@constants/Layout";
import Toolbar from "./Toolbar";
import {inject, observer} from "mobx-react";
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import ProcessDialog from "@common/components/Modal/ProcessDialog";
import ConfirmContent from "./ConfirmContent";
import ViewUtils from "@common/utils/ViewUtils";
import InvestInfo from "./InvestInfo";
import InvestTokenState from "./InvestTokenState";
import PageBottomBtn from "@common/components/PageSupport/PageBottomBtn";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";
import InputAmount from "./InputAmount";

@inject('rootStore')
@observer
export default class InvestToken extends PureComponent<NavigationProps & RootStoreProps> {

    symbol: string;
    tokenState: InvestTokenState;

    constructor(props) {
        super(props);
        this.symbol = this.props.navigation.state.params.symbol;
        this.tokenState = new InvestTokenState(this.symbol, props.navigation, props.rootStore);
        this.loadData().then();
    }

    async loadData() {
        const item = await this.tokenState.get(this.symbol);
        this.tokenState.selectItem(item);
    }

    onPress = () => {
        this.tokenState.confirm();
    }

    onDone = () => {
        this.tokenState.invest();
    }

    onCancel = () => {
        this.tokenState.cancelConfirm();
    }

    onClose = () => {
        this.tokenState.cancelConfirm();
        this.props.navigation.goBack();
    }

    render() {
        const {selectedItem, processState, amount, confirming} = this.tokenState;
        if (!selectedItem) {
            return (
                <View style={styles.container}>
                    <BlockLoading loading/>
                </View>
            )
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Toolbar tokenState={this.tokenState}
                             onBackPress={this.onClose}/>
                    <ProcessDialog
                        model={processState}
                        onClose={this.onClose}
                        onError={this.onCancel}>
                        <ConfirmContent tokenState={this.tokenState}
                                        onDone={this.onDone}
                                        onCancel={this.onCancel}/>
                    </ProcessDialog>
                    <View style={{flex: 1, zIndex: 2}}>
                        <AnimatedRow key="description-row" delay={200}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.description}>How many tokens do you want to buy?</Text>
                            </View>
                        </AnimatedRow>

                        <View style={{flex: 1}}>
                            <ScrollView>
                                <View style={{paddingHorizontal: 24}}>
                                    <View style={styles.rowInputContainer}>
                                        <View style={styles.labelContainer}>
                                            <Text style={styles.label}>Amount</Text>
                                        </View>
                                        <InputAmount tokenState={this.tokenState}/>
                                    </View>
                                    <InvestInfo tokenState={this.tokenState}/>
                                    <View style={{height: ViewUtils.getBottomBtnHeight()}}/>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <PageBottomBtn
                        onPress={this.onPress}
                        text="Confirm"
                        loading={confirming}
                        disabled={amount.value.length === 0}
                        animation
                        animationDelay={200}
                    />
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
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: "space-between",
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder,
        paddingBottom: 12,
        // backgroundColor:"red"
    },
    titleContainer: {
        padding: 16,
        alignItems: 'flex-start',
    },
    labelContainer: {
        paddingTop: 18,
        paddingLeft: 7
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.labelFontThin
    },
    description: {
        color: Colors.labelFontThin,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "700",
    }
});

