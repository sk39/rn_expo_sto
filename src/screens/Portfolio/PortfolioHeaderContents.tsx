import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {View} from 'native-base';
import {RootStoreProps} from "@store/RootStoreProvider";
import {Button} from "react-native-elements";
import LoginUserAvatar from "@common/components/Image/LoginUserAvatar";
import Colors from "@constants/Colors";

@inject('rootStore')
@observer
export default class PortfolioHeaderContents extends Component<NavigationProps & RootStoreProps> {

    renderContentsAuth() {
        return (
            <View style={styles.auth}>
                <LoginUserAvatar size={40}/>
            </View>
        )
    }

    renderContentsNoAuth() {
        return (
            <View style={styles.noAuth}>
                <Button title={t("btn.sign-in")}
                        raised
                        buttonStyle={styles.authButton}
                        onPress={() => this.props.navigation.navigate("Login")}
                />
            </View>
        )
    }

    render() {
        const {auth} = this.props.rootStore;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Portfolio</Text>
                </View>
                {auth.loggedIn ? this.renderContentsAuth() : this.renderContentsNoAuth()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        zIndex: 3
    },
    title: {
        color: Colors.back,
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 2,
    },
    authButton: {
        backgroundColor: Colors.btnPrimaryLight,
        width: 100,
        height: 36
    },
    auth: {
        paddingRight: 12,
    },
    noAuth: {
        // paddingTop: 24
    }
});
