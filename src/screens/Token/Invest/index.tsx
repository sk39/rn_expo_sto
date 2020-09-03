import React, {PureComponent} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import Layout from "@constants/Layout";
import Toolbar from "./Toolbar";
import InputNumberPad from "@common/components/Input/InputNumberPad";
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

@inject('rootStore')
@observer
export default class InvestToken extends PureComponent<NavigationProps & RootStoreProps> {

    symbol: string;
    tokenState: InvestTokenState;

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onClose = this.onClose.bind(this);
        this.tokenState = new InvestTokenState(props.navigation, props.rootStore);
        this.symbol = this.props.navigation.state.params.symbol;
        this.loadData().then();
    }

    async loadData() {
        const item = await this.tokenState.get(this.symbol);
        this.tokenState.selectItem(item);
    }

    onPress() {
        this.tokenState.confirm();
    }

    onDone() {
        this.tokenState.invest();
    }

    onCancel() {
        this.tokenState.cancelConfirm();
    }

    onClose() {
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
                    <Toolbar item={selectedItem}
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
                            <KeyboardAvoidingView
                                style={{alignItems: "flex-start", paddingHorizontal: 24}}
                                behavior={Platform.OS == "ios" ? "padding" : "height"}>
                                <Text style={styles.description}>How many tokens do you want to buy?</Text>
                                <View style={styles.rowInputContainer}>
                                    <InputNumberPad inputState={amount}/>
                                </View>
                            </KeyboardAvoidingView>
                        </AnimatedRow>

                        <View style={{flex: 1}}>
                            <ScrollView>
                                <TouchableWithoutFeedback>
                                    <View style={{padding: 12, paddingHorizontal: 24}}>
                                        <InvestInfo tokenState={this.tokenState}/>
                                        <View style={{height: ViewUtils.getBottomBtnHeight()}}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                    </View>
                    <PageBottomBtn
                        onPress={this.onPress}
                        text="Confirm"
                        loading={confirming}
                        disabled={amount.value.length === 0}
                        animation
                        animationDelay={500}
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
        alignItems: 'flex-end',
        paddingLeft: 48,
        paddingRight: 24,
        width: "100%",
    },
    description: {
        color: Colors.labelFontThin,
        textAlign: "center",
        fontSize: 18,
        marginBottom: 8,
    }
});

