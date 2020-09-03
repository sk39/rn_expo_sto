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
import ClipboardAccessor from "@common/plugins/ClipboardAccessor";
import InputNumberState from "@common/components/Input/InputNumberState";

@inject("rootStore")
@observer
export default class VerifyMfaScreen extends Component<NavigationProps & RootStoreProps> {

    @observable appState: string = "";
    @observable processing: boolean = false;
    @observable errorMessage: string = null;
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

    validateCode() {
        const code = this.codeState.value;
        return code && code.length === 6 && !isNaN(Number(code));
    }

    launchApp() {
        Linking.openURL(`otpauth://`);
    }

    async handleVerify() {
        const {auth} = this.props.rootStore;
        const {navigate} = this.props.navigation;
        if (!this.validateCode()) {
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
        return (
            <Container>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.backColor}/>
                <PageLoading loading={this.processing}/>
                <View style={styles.back}>
                    <View style={styles.headerArea}>
                        <Text style={styles.title}>{t("screen.2fa.title")}</Text>
                        <Text style={styles.subTitle}>{t("screen.2fa.subTitle")}</Text>
                    </View>
                    <View style={styles.form}>
                        <InputCodePad inputState={this.codeState}/>
                        <Button buttonStyle={styles.btn}
                                title={t("btn.verify")}
                                disabled={this.codeState.value.length !== 6}
                                titleStyle={styles.btnText}
                                onPress={this.handleVerify}
                        />
                        <Button buttonStyle={styles.link}
                                title={t("screen.2fa.launchAuthApp")}
                                type='clear'
                                titleStyle={styles.linkText}
                                onPress={this.launchApp}
                        />
                    </View>
                </View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 8,
    },
    btn: {
        marginTop: 36,
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
        color: Colors.primaryColor
    },
    headerArea: {
        paddingBottom: 26,
        paddingHorizontal: 50,
        // width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.labelFontThin
    },
    subTitle: {
        marginTop: 6,
        color: Colors.labelFontThin,
    }
});
