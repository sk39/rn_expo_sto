import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {View} from 'native-base';
import {Button, Icon} from "react-native-elements";
import LoginEntryState from "./LoginEntryState";
import PageLoading from '@common/components/PageSupport/PageLoading';
import Input from "@common/components/Input/Input";
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import {observable} from "mobx";
import * as LocalAuthentication from 'expo-local-authentication';
import Layout from "@constants/Layout";
import DisableLayer from "@common/components/Modal/DisableLayer";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";

@inject('rootStore')
@observer
export default class LoginEntryScreen extends Component<NavigationProps & RootStoreProps> {

    loginState = new LoginEntryState();
    @observable enableBiometrics = false;

    componentDidMount() {
        const {auth, settings} = this.props.rootStore;
        const {userId, password} = auth;
        if (!s.isBlank(userId) && !s.isBlank(password)) {
            this.loginState.setUserId(userId);
            if (settings.enableLocalAuth) {
                this.loginState.initializing = true;
                setTimeout(() => this.localAuth(userId, password), 300);
            }
        }
    }

    async localAuth(userId, password) {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (!hasHardware) {
                return;
            }
            const res = await LocalAuthentication.authenticateAsync({promptMessage: t("btn.sign-in")});
            if (res.success) {
                this.loginState.setUserId(userId);
                this.loginState.setPassword(password);
                await this.handleLogin();
            }
        } catch (e) {
            console.warn(e);
        } finally {
            this.loginState.initializing = false;
        }
    }

    handleLogin = async () => {
        const {auth} = this.props.rootStore;
        const {navigate} = this.props.navigation;
        if (!this.loginState.validate()) {
            return;
        }
        try {
            this.loginState.processing = true;
            const {userId, password} = this.loginState;
            await auth.signIn(userId.value, password.value)
            auth.setUpOtp ? navigate('VerifyMfa') : navigate('SetupMfa');
        } catch (e) {
            // TODO:error handle
            this.loginState.error(e);
        } finally {
            this.loginState.processing = false;
        }
    }

    linkForgotPassword = () => {
        alert("TODO: Jump forgot password.")
    }

    linkSignUp = () => {
        alert("TODO: Jump SignUp.")
    }

    skip = () => {
        const {navigate} = this.props.navigation;
        navigate('Main');
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <MyStatusBar dark={false} transparent/>
                <PageLoading loading={this.loginState.processing}/>
                <DisableLayer show={this.loginState.initializing}/>
                <View style={styles.headerArea}>
                    <Text style={styles.title}>{t("screen.login.title")}</Text>
                    <Text style={styles.subTitle}>{t("screen.login.subTitle")}</Text>
                </View>
                <View style={styles.form}>
                    <Input inputState={this.loginState.userId}
                           label={t("screen.login.userId")}
                           leftIcon={
                               <Icon name='user' type="feather" color={Colors.primaryColor} size={16}/>
                           }
                    />
                    <Input inputState={this.loginState.password}
                           label={t("screen.login.password")}
                           secureTextEntry
                           leftIcon={
                               <Icon name='lock' type="feather" color={Colors.primaryColor} size={16}/>
                           }
                    />
                    <Button buttonStyle={styles.btn}
                            title={t("btn.sign-in")}
                            titleStyle={styles.btnText}
                            onPress={this.handleLogin}
                    />
                    <Button buttonStyle={styles.forgotPassword}
                            title={t("screen.login.forgotPassword")}
                            type='clear'
                            titleStyle={styles.forgotPasswordText}
                            onPress={this.linkForgotPassword}
                    />
                </View>
                <View style={styles.bottomArea}>
                    <Button buttonStyle={styles.bottomBtn}
                            title={t("screen.login.skip")}
                            type='clear'
                            titleStyle={styles.bottomBtnText}
                            onPress={this.skip}
                    />
                    <Button buttonStyle={styles.bottomBtn}
                            title={t("btn.sign-up")}
                            type='clear'
                            titleStyle={styles.bottomBtnPrimaryText}
                            onPress={this.linkSignUp}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.backColor
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 68,
        width: Layout.window.width
    },
    btn: {
        marginTop: 24,
        backgroundColor: Colors.primaryColor,
        borderRadius: 26,
        width: 256,
        height: 48,
    },
    btnText: {
        color: "white",
    },
    forgotPassword: {
        marginTop: 12,
    },
    forgotPasswordText: {
        color: Colors.labelFontThin,
        fontSize: 16,
    },
    headerArea: {
        flex: 1,
        paddingLeft: 44,
        paddingTop: 24,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.labelFontThin
    },
    subTitle: {
        marginTop: 4,
        color: Colors.labelFontThin
    },
    bottomArea: {
        borderTopWidth: 1,
        borderTopColor: Colors.primaryColorThin2,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
    },
    bottomBtn: {
        width: Layout.window.width / 2,
        height: 48,
    },
    bottomBtnText: {
        color: Colors.labelFontThin,
        fontSize: 16,
        letterSpacing: 1,
    },
    bottomBtnPrimaryText: {
        color: Colors.primaryColor,
        fontWeight: "700",
        fontSize: 16,
        letterSpacing: 1,
    },
});
