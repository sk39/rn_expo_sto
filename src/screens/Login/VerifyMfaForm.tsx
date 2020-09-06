import React, {Component} from 'react';
import {AppState, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {View} from 'native-base';
import {Button} from "react-native-elements";
import Colors from "@constants/Colors";
import {action, observable} from "mobx";
import InputCode from "@common/components/Input/InputCode";
import ClipboardAccessor from "@common/plugins/ClipboardAccessor";
import InputNumberState from "@common/components/Input/InputNumberState";
import AuthStore from "@store/AuthStore";
import Dialog from "@common/components/Modal/Dialog";

interface Props {
    auth: AuthStore;
    navigate: any;
}

@observer
export default class VerifyMfaForm extends Component<Props> {

    @observable appState: string = "";
    @observable processing: boolean = false;
    @observable errorMessage: string = null;
    codeState: InputNumberState;

    constructor(props) {
        super(props);
        this.handleVerify = this.handleVerify.bind(this);
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

    async handleVerify() {
        const {auth, navigate} = this.props;

        if (!this.validateCode()) {
            return;
        }
        this.processing = true;
        try {
            await auth.verify2FA(this.codeState.value)
            navigate('Main');
        } catch (e) {
            // TODO:error handle
            this.errorMessage = e;
        } finally {
            this.processing = false;
        }
    }

    render() {
        return (
            <View style={styles.form}>
                <InputCode inputState={this.codeState}/>
                <Button buttonStyle={styles.btn}
                        title={t("btn.verify")}
                        loading={this.processing}
                        disabled={this.codeState.value.length !== 6}
                        titleStyle={styles.btnText}
                        onPress={this.handleVerify}
                />
                <Dialog show={!s.isBlank(this.errorMessage)}
                        error
                        message={this.errorMessage}
                        onPress={() => this.errorMessage = null}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});
