import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import {View} from 'native-base';
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import {Button} from "react-native-elements";
import LoginUserAvatar from "@common/components/Image/LoginUserAvatar";

@inject('rootStore')
@observer
export default class HomeHeaderContents extends Component<NavigationProps & RootStoreProps> {

    renderContentsAuth() {
        return (
            <View style={styles.auth}>
                <LoginUserAvatar size={60}/>
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
                    <Text style={styles.title}>Digital</Text>
                    <Text style={styles.title}>Security</Text>
                </View>
                <View style={styles.rightContainer}>
                    {auth.loggedIn ? this.renderContentsAuth() : this.renderContentsNoAuth()}
                </View>
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
        color: Colors.toolBarInverse,
        fontSize: 24,
        fontWeight: "700",
        letterSpacing: 4,
        opacity: 0.58
    },
    rightContainer: {},
    authButton: {
        backgroundColor: Colors.toolBarInverse,
        width: 110,
        borderRadius: 0
    },
    auth: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 12,
    },
    noAuth: {
        // paddingTop: 24/
    }
});
