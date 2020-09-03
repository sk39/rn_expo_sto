import React, {Component} from 'react';
import {AppState, StatusBar, StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import {Button} from "react-native-elements";
import PageLoading from '@common/components/PageLoading';
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import {action, observable} from "mobx";
import InputCodePad from "./InputCodePad";
import * as Linking from 'expo-linking';
import OTPQRCode from "./OTPQRCode";
import Dialog from "@common/components/Dialog";
import ClipboardAccessor from "@common/plugins/ClipboardAccessor";
import InputNumberState from "@common/components/Input/InputNumberState";

@inject("rootStore")
@observer
export default class SetupMfaScreen extends Component<NavigationProps & RootStoreProps> {

    @observable appState: string = "";
    @observable processing: boolean = false;
    @observable errorMessage: string = null;
    @observable showQRCode: boolean = false;

    codeState: InputNumberState;

    constructor(props) {
        super(props);
        this.handleVerify = this.handleVerify.bind(this);
        this.launchApp = this.launchApp.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this)
        this.codeState = new InputNumberState();
        this.codeState.maxLength = 6;
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    @action
    async handleAppStateChange(nextAppState) {
        if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
            try {
                const content = await ClipboardAccessor.getNumber();
                if (content && content.length === 6) {
                    this.codeState.setValue(content);
                }
            } catch (e) {
            }
        }
        this.appState = nextAppState;
    };

    validate() {
        const code = this.codeState.value;
        return code && code.length === 6 && !isNaN(Number(code));
    }

    launchApp() {
        const {auth} = this.props.rootStore;
        Linking.openURL(auth.otpauth);
    }

    async handleVerify() {
        const {auth} = this.props.rootStore;
        const {navigate} = this.props.navigation;
        if (!this.validate()) {
            return;
        }
        this.processing = true;
        try {
            await auth.verify2FA(this.codeState.value)
            navigate('Main');
        } catch (e) {
            // TODO:error handle
        } finally {
            this.processing = false;
        }
    }

    render() {
        const {auth} = this.props.rootStore;
        return (
            <Container>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.backColor}/>
                <PageLoading loading={this.processing}/>
                <View style={styles.back}>
                    <View style={styles.dispArea}>
                        <Text style={styles.numText}>1. </Text>
                        <Text style={styles.title}>
                            {t("screen.setup2fa.explanationRegister")}
                        </Text>
                    </View>
                    <Button buttonStyle={styles.btn}
                            title={t("screen.setup2fa.registerAuthApp")}
                            titleStyle={styles.btnText}
                            onPress={this.launchApp}
                    />
                    <Button buttonStyle={styles.link}
                            title={t("screen.setup2fa.registerOther")}
                            type='clear'
                            titleStyle={styles.linkText}
                            onPress={() => this.showQRCode = true}
                    />

                    <View style={{height: 12}}/>

                    <View style={styles.dispArea}>
                        <Text style={styles.numText}>2. </Text>
                        <Text style={styles.title}>
                            {t("screen.setup2fa.explanationVerify")}
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <InputCodePad inputState={this.codeState}/>
                        <Button buttonStyle={styles.btn}
                                title={t("btn.verify")}
                                disabled={this.codeState.value.length !== 6}
                                titleStyle={styles.btnText}
                                onPress={this.handleVerify}
                        />
                    </View>
                </View>
                <Dialog show={this.showQRCode}
                        btnText={t("btn.close")}
                        cancelable
                        onPress={() => this.showQRCode = false}>
                    <OTPQRCode otpauth={auth.otpauth}/>
                </Dialog>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backColor
    },
    back: {
        paddingTop: 8,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginTop: 24,
        backgroundColor: Colors.primaryColor,
        borderRadius: 26,
        paddingHorizontal: 24,
        minWidth: 256,
        height: 48,
    },
    btnText: {
        color: "white",
    },
    link: {
        marginTop: 24,
    },
    linkText: {
        fontSize: 16,
        color: Colors.linkColor
    },
    dispArea: {
        padding: 24,
        paddingBottom: 12,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    numText: {
        color: Colors.primaryColor,
        fontSize: 28,
        fontWeight: "700",
        marginTop: -6,
        marginRight: 8
    },
    title: {
        fontSize: 20,
        color: Colors.labelFontThin
    },
    subTitle: {
        marginTop: 4,
        color: Colors.labelFontThin
    }
});
