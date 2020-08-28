import React, {Component} from 'react';
import {AppState, Clipboard, StatusBar, StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import {Button} from "react-native-elements";
import PageLoading from '@common/components/PageLoading';
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import {action, observable} from "mobx";
import InputState from "@common/components/Input/InputState";
import InputCode from "./InputCode";
import * as Linking from 'expo-linking';
import ViewUtils from "@common/utils/ViewUtils";

@inject("rootStore")
@observer
export default class VerifyMfaScreen extends Component<NavigationProps & RootStoreProps> {

    @observable appState: string = "";
    @observable processing: boolean = false;
    @observable errorMessage: string = null;
    code: InputState = new InputState();

    constructor(props) {
        super(props);
        this.handleVerify = this.handleVerify.bind(this);
        this.launchApp = this.launchApp.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this)
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
                await ViewUtils.sleep(500);
                const content: any = await Clipboard.getString();
                console.log(`Clipboard#getString data=${content}`)
                if (content && content.length === 6 && !isNaN(content)) {
                    this.code.setValue(content);
                }
            } catch (e) {
            }
        }
        this.appState = nextAppState;
    };

    validateCode() {
        const code = this.code.value;
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
            await auth.verify2FA(this.code.value)
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
                        <Text style={styles.title}>Verify Code</Text>
                        <Text style={styles.subTitle}>Enter your OTP code here</Text>
                    </View>
                    <View style={styles.form}>
                        <InputCode inputState={this.code}/>
                        <Button buttonStyle={styles.btn}
                                title='Verify'
                                disabled={this.code.value.length !== 6}
                                titleStyle={styles.btnText}
                                onPress={this.handleVerify}
                        />
                        <Button buttonStyle={styles.link}
                                title='Launch authentication app'
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
        color: Colors.primaryColor
    },
    headerArea: {
        paddingBottom: 56,
        paddingLeft: 50,
        width: "100%",
        justifyContent: "flex-start",
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
    }
});
