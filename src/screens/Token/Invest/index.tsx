import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import Layout from "@constants/Layout";
import {inject, observer} from "mobx-react";
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import ViewUtils from "@common/utils/ViewUtils";
import InvestTokenState from "./InvestTokenState";
import PageBottomBtn from "@common/components/PageSupport/PageBottomBtn";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";
import InputAmount from "./InputAmount";
import InvestTokenInfo from "./InvestTokenInfo";
import ConfirmContent from "@common/components/Modal/ProcessDialog/ConfirmContent";
import ProcessDialog from "@common/components/Modal/ProcessDialog";
import InvestConfirm from "./InvestConfirm";
import PaymentInfo from "./PaymentInfo";
import MyScrollView from "@common/components/PageSupport/MyScrollView";
import Agreement from "./Agreement";
import PageHeader from "@common/components/PageSupport/PageHeader";
import DepositInfo from "./DepositInfo";

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
                btnText="Invest"
                doneBtnStyle={{backgroundColor: Colors.second}}
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

        let index = 0;
        return (
            <View style={styles.container}>
                <PageHeader title="Invest Security Token" onBackPress={this.onClose}>
                    {/*<Button title="Deposit"*/}
                    {/*        type="clear"*/}
                    {/*        containerStyle={{marginLeft: 12}}*/}
                    {/*        titleStyle={styles.depositButton}*/}
                    {/*        onPress={() => alert("TODO:")}*/}
                    {/*/>*/}
                </PageHeader>
                <ProcessDialog
                    model={processState}
                    onClose={this.closeModal}
                    renderConfirm={this.renderConfirm}
                />
                <View style={{flex: 1, paddingBottom: ViewUtils.getBottomBtnHeight()}}>
                    <MyScrollView>
                        <View style={styles.depositContainer}>
                            <Text style={styles.depositTitle}>Your Deposit</Text>
                            <View style={{flexDirection: "row"}}>
                                <DepositInfo tokenState={this.tokenState}/>
                            </View>
                        </View>

                        <Area index={index++} title="Security Token">
                            <InvestTokenInfo tokenState={this.tokenState}/>
                        </Area>

                        <Area index={index++} title="Entry Amount">
                            <View style={[styles.inputContainer]}>
                                <Text style={styles.inputLabel}>Amount</Text>
                                <InputAmount tokenState={this.tokenState}/>
                            </View>
                        </Area>

                        <Area index={index++} title="Payment">
                            <View style={styles.dataContainer}>
                                <PaymentInfo tokenState={this.tokenState}/>
                            </View>
                        </Area>
                    </MyScrollView>
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
        );
    }
}

function Area({title, index, children}) {
    return (
        <AnimatedRow delay={100 + (index + 1) * 200}>
            <Title>{title}</Title>
            <View style={styles.areaBody}>
                {children}
            </View>
        </AnimatedRow>
    )
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
    titleWrapper: {
        backgroundColor: Colors.back2,
        paddingVertical: 10,
        paddingHorizontal: 14
    },
    title: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.labelFont
    },
    areaBody: {
        padding: 12
    },
    depositContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        paddingHorizontal: 16,
    },
    depositTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.labelFont,
        marginRight: 24,
    },
    depositButton: {
        color: Colors.primary,
        fontWeight: "700",
        fontSize: 14
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: 4,
        paddingLeft: 8,
    },
    dataContainer: {
        paddingLeft: 8,
        paddingRight: 12,
    },
    inputLabel: {
        marginTop: 10,
        color: Colors.labelFont
    },
});

