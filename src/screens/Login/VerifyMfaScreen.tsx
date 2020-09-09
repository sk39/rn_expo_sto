import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import {Button} from "react-native-elements";
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import * as Linking from 'expo-linking';
import VerifyMfaForm from "./VerifyMfaForm";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";

@inject("rootStore")
@observer
export default class VerifyMfaScreen extends Component<NavigationProps & RootStoreProps> {

    launchApp = () => {
        Linking.openURL(`otpauth://`);
    }

    render() {
        const {auth} = this.props.rootStore;
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <MyStatusBar dark={false} transparent/>
                <View style={styles.back}>
                    <View style={styles.headerArea}>
                        <Text style={styles.title}>{t("screen.2fa.title")}</Text>
                        <Text style={styles.subTitle}>{t("screen.2fa.subTitle")}</Text>
                    </View>
                    <VerifyMfaForm auth={auth} navigate={navigate}/>
                    <Button buttonStyle={styles.link}
                            title={t("screen.2fa.launchAuthApp")}
                            type='clear'
                            titleStyle={styles.linkText}
                            onPress={this.launchApp}
                    />
                </View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        marginTop: 24,
    },
    linkText: {
        fontSize: 16,
        color: Colors.primary
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
