import React, {PureComponent} from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import Layout from "@constants/Layout";
import {inject, observer} from "mobx-react";
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import ViewUtils from "@common/utils/ViewUtils";
import InvestInfo from "./InvestInfo";
import InvestTokenState from "./InvestTokenState";
import PageBottomBtn from "@common/components/PageSupport/PageBottomBtn";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";
import InputAmount from "./InputAmount";
import Agreement from "./Agreement";
import PageHeader from "@common/components/PageSupport/PageHeader";
import InvestTokenInfo from "./InvestTokenInfo";
import ConfirmContent from "@common/components/Modal/ProcessDialog/ConfirmContent";
import ProcessDialog from "@common/components/Modal/ProcessDialog";
import InvestConfirm from "./InvestConfirm";

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

    confirm = () => {
        this.tokenState.confirm();
    }

    invest = () => {
        this.tokenState.invest();
    }

    onClose = () => {
        this.props.navigation.goBack();
    }

    closeModal = () => {
        const st = this.tokenState.processState.state;
        this.tokenState.cancelConfirm();
        if (st === "success") {
            this.props.navigation.goBack();
        }
    }

    renderConfirm = () => {
        return (
            <ConfirmContent
                onPress={this.invest}
                onCancel={this.closeModal}
            >
                <InvestConfirm tokenState={this.tokenState}/>
            </ConfirmContent>
        )
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
                    <PageHeader title={"Invest Security Token"}
                                onBackPress={this.onClose}/>
                    <ProcessDialog
                        model={processState}
                        onClose={this.closeModal}
                        renderConfirm={this.renderConfirm}
                    />
                    <View style={{flex: 1, paddingBottom: ViewUtils.getBottomBtnHeight()}}>
                        <ScrollView>
                            <Title>Target</Title>
                            <View style={styles.area}>
                                <InvestTokenInfo tokenState={this.tokenState}/>
                            </View>
                            <Title>Invest Amount</Title>
                            <View style={[styles.area, styles.inputContainer]}>
                                <Text style={styles.inputLabel}>Amount</Text>
                                <InputAmount tokenState={this.tokenState}/>
                            </View>
                            <Title>Post Invest</Title>
                            <View style={[styles.area, {paddingTop: 4}]}>
                                <InvestInfo tokenState={this.tokenState}/>
                            </View>
                            <View style={{height: ViewUtils.getBottomBtnHeight()}}/>
                        </ScrollView>
                        <AnimatedRow delay={200}>
                            <Agreement tokenState={this.tokenState}/>
                        </AnimatedRow>
                    </View>

                    <PageBottomBtn
                        onPress={this.confirm}
                        text="Confirm"
                        loading={confirming}
                        disabled={amount.value.length === 0 || !this.tokenState.agreed}
                        animation
                        animationDelay={200}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

function Title(props) {
    return (
        <View style={styles.titleWrapper}>
            <Text style={styles.title}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Layout.window.width,
        backgroundColor: Colors.back
    },
    description: {
        color: Colors.labelFontThin,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "700",
    },
    titleWrapper: {
        backgroundColor: Colors.back2,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.labelFont
    },
    area: {
        padding: 12
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    inputLabel: {
        marginTop: 12,
        marginLeft: 8,
        color: Colors.labelFontThin
    }
});

