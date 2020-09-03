import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import {Button} from "react-native-elements";
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import * as Linking from 'expo-linking';
import VerifyMfaForm from "./VerifyMfaForm";

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
                <StatusBar barStyle="dark-content" backgroundColor={Colors.backColor}/>
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
        backgroundColor: Colors.backColor
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
