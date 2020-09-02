import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {inject, observer} from "mobx-react";
import {Text, View} from 'native-base';
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import {Avatar, Button} from "react-native-elements";

@inject('rootStore')
@observer
export default class HomeHeaderContents extends Component<NavigationProps & RootStoreProps> {

    renderContentsAuth(auth) {
        return (
            <View style={styles.auth}>
                <Avatar
                    rounded
                    size="medium"
                    source={{
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                />
                <Text style={styles.username}>
                    {auth.username}
                </Text>
            </View>
        )
    }

    renderContentsNoAuth() {
        return (
            <View style={styles.noAuth}>
                <Button title={t("btn.sign-in")}
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
                <Text style={styles.title}>Digital Security</Text>
                {auth.loggedIn ? this.renderContentsAuth(auth) : this.renderContentsNoAuth()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 12,
        paddingLeft: 28,
        height: 140,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        color: Colors.primaryColorLight,
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 2,
        opacity: 0.42
    },
    authButton: {
        backgroundColor: Colors.primaryColor2,
        width: 120,
    },
    auth: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 16,
        paddingLeft: 8,
    },
    username: {
        marginLeft: 16,
        color: Colors.primaryColorLight,
        fontWeight: "700",
        fontSize: 18,
    },
    noAuth: {
        paddingTop: 24
    }
});
