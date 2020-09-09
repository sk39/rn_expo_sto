import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import {Button} from "react-native-elements";
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import {observable} from "mobx";
import * as Linking from 'expo-linking';
import OTPQRCode from "./OTPQRCode";
import Dialog from "@common/components/Modal/Dialog";
import VerifyMfaForm from "./VerifyMfaForm";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";

@inject("rootStore")
@observer
export default class SetupMfaScreen extends Component<NavigationProps & RootStoreProps> {

    @observable showQRCode: boolean = false;

    launchApp = () => {
        const {auth} = this.props.rootStore;
        Linking.openURL(auth.otpauth);
    }

    render() {
        const {auth} = this.props.rootStore;
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <MyStatusBar dark={false} transparent/>
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

                    <View style={{height: 24}}/>

                    <View style={styles.dispArea}>
                        <Text style={styles.numText}>2. </Text>
                        <Text style={styles.title}>
                            {t("screen.setup2fa.explanationVerify")}
                        </Text>
                    </View>
                    <VerifyMfaForm auth={auth} navigate={navigate}/>
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
        backgroundColor: Colors.back
    },
    back: {
        paddingTop: 8,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginTop: 18,
        backgroundColor: Colors.btnPrimary,
        borderRadius: 26,
        paddingHorizontal: 24,
        minWidth: 256,
        height: 48,
    },
    btnText: {
        color: "white",
    },
    link: {
        marginTop: 16,
    },
    linkText: {
        fontSize: 16,
        color: Colors.btnPrimary
    },
    dispArea: {
        padding: 24,
        paddingBottom: 12,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    numText: {
        color: Colors.primary,
        fontSize: 28,
        fontWeight: "700",
        marginTop: -6,
        marginRight: 8
    },
    title: {
        fontSize: 20,
        color: Colors.labelFontThin
    }
});
