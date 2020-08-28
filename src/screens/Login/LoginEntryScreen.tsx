import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import {Button, Icon} from "react-native-elements";
import LoginEntryStore from "./LoginEntryStore";
import PageLoading from '@common/components/PageLoading';
import Input from "@common/components/Input/Input";
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import {observable} from "mobx";
import s from "underscore.string";
import * as LocalAuthentication from 'expo-local-authentication';
import Layout from "@constants/Layout";
import Dialog from "@common/components/Dialog";
import DisableLayer from "@common/components/DisableLayer";

@inject('rootStore')
@observer
export default class LoginEntryScreen extends Component<NavigationProps & RootStoreProps> {

    store: LoginEntryStore = new LoginEntryStore();
    @observable enableBiometrics = false;

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.linkForgotPassword = this.linkForgotPassword.bind(this);
        this.linkSignUp = this.linkSignUp.bind(this);
        this.skip = this.skip.bind(this);
    }

    componentDidMount() {
        const {auth, settings} = this.props.rootStore;
        const {userId, password} = auth;
        if (!s.isBlank(userId) && !s.isBlank(password)) {
            this.store.setUserId(userId);
            if (settings.enableLocalAuth) {
                this.store.initializing = true;
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
            const res = await LocalAuthentication.authenticateAsync({promptMessage: "Sign In"});
            if (res.success) {
                this.store.setUserId(userId);
                this.store.setPassword(password);
                await this.handleLogin();
            }
        } catch (e) {
            console.warn(e);
        } finally {
            this.store.initializing = false;
        }
    }

    async handleLogin() {
        const {auth} = this.props.rootStore;
        const {navigate} = this.props.navigation;
        if (!this.store.validate()) {
            return;
        }
        try {
            this.store.processing = true;
            const {userId, password} = this.store;
            await auth.signIn(userId.value, password.value)
            auth.setUpOtp ? navigate('VerifyMfa') : navigate('SetupMfa');
        } catch (e) {
            // TODO:error handle
            this.store.error(e);
        } finally {
            this.store.processing = false;
        }
    }

    linkForgotPassword() {
        alert("TODO: Jump forgot password.")
    }

    linkSignUp() {
        alert("TODO: Jump SignUp.")
    }

    skip() {
        const {navigate} = this.props.navigation;
        navigate('Main');
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.backColor}/>
                <PageLoading loading={this.store.processing}/>
                <DisableLayer show={this.store.initializing}/>
                <View style={styles.back}>
                    <View style={styles.headerArea}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subTitle}>Sign in to STO Demo</Text>
                    </View>
                    <View style={styles.form}>
                        <Input inputState={this.store.userId}
                               label="User Id"
                               leftIcon={
                                   <Icon name='user' type="feather" color='#a376c2' size={16}/>
                               }
                        />
                        <Input inputState={this.store.password}
                               label="Password"
                               secureTextEntry
                               leftIcon={
                                   <Icon name='lock' type="feather" color='#a376c2' size={16}/>
                               }
                        />
                        <Button buttonStyle={styles.btn}
                                title='Sign In'
                                titleStyle={styles.btnText}
                                onPress={this.handleLogin}
                        />
                        <Button buttonStyle={styles.forgotPassword}
                                title='Forgot Password?'
                                type='clear'
                                titleStyle={styles.forgotPasswordText}
                                onPress={this.linkForgotPassword}
                        />
                    </View>
                    <View style={styles.bottomArea}>
                        <Button buttonStyle={styles.bottomBtn}
                                title='Skip'
                                type='clear'
                                titleStyle={styles.bottomBtnText}
                                onPress={this.skip}
                        />
                        <Button buttonStyle={styles.bottomBtn}
                                title='Sign Up'
                                type='clear'
                                titleStyle={styles.bottomBtnPrimaryText}
                                onPress={this.linkSignUp}
                        />
                    </View>
                </View>
                <Dialog show={this.store.hasError}
                        btnText="Close"
                        error
                        message={this.store.errorMessage}
                        onPress={() => this.store.error(null)}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: Colors.backColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80
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
        // backgroundColor: Colors.primaryColorThin2,
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
