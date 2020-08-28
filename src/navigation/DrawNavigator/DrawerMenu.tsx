import React, {Component} from "react";
import {ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DrawerContentComponentProps} from "react-navigation-drawer/src/types";
import {DisplayInTabScreens, OnlySideMenuScreens} from "../Routes";
import _ from "lodash";
import {ScreenIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {Avatar, Button} from 'react-native-elements';
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import ViewUtils from "@common/utils/ViewUtils";
import NumberLabel from "@common/components/Label/NumberLabel";
import {RootStoreProps} from "@store/RootStoreProvider";
import {inject, observer} from "mobx-react";

@inject('rootStore')
@observer
export default class DrawerMenu extends Component<DrawerContentComponentProps & RootStoreProps> {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    jump(routeName) {
        const {navigation} = this.props;
        navigation.navigate(routeName);
        (navigation as any).closeDrawer();
    }

    signOut() {
        const {auth} = this.props.rootStore;
        auth.signOut();
        const {navigation} = this.props;
        (navigation as any).closeDrawer();
    }

    renderItem(component, key) {
        return (
            <TouchableOpacity key={key}
                              style={styles.item}
                              onPress={() => this.jump(key)}>
                <ScreenIcon screenName={key} color={Colors.fontColor} size={22}/>
                <Text style={styles.itemText}>{key}</Text>
            </TouchableOpacity>
        )
    }

    renderHeaderNoAuth() {
        return (
            <View style={styles.headerNoAuth}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>STO Platform Demo</Text>
                </View>
                <View style={styles.userArea}>
                    <Button title='Sign In'
                            buttonStyle={styles.authButton}
                            onPress={() => this.jump("Login")}
                    />
                </View>
            </View>
        )
    }

    renderHeader() {
        const {auth, balance} = this.props.rootStore;
        if (!auth.loggedIn) {
            return this.renderHeaderNoAuth();
        }

        return (
            <View style={styles.header}>
                <View style={styles.userArea}>
                    <Avatar
                        rounded
                        size="large"
                        source={{
                            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                        }}
                    />
                    <Text style={styles.username}>{auth.username}</Text>
                    <Button title='Sign Out'
                            buttonStyle={styles.authButton}
                            onPress={this.signOut}
                    />
                    <View style={styles.balanceArea}>
                        <Text style={styles.balanceLabel}>
                            Balance
                        </Text>
                        <NumberLabel
                            value={balance.totalBalance}
                            decimals={0}
                            prefix={"$"}
                            style={styles.balanceValue}/>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <ImageBackground source={require("@assets/sideMenu.png")}
                             style={styles.menu}>
                {this.renderHeader()}
                <ScrollView>
                    {_.map(DisplayInTabScreens, this.renderItem)}
                    {_.map(OnlySideMenuScreens, this.renderItem)}
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        width: '100%',
        height: '100%'
    },
    header: {
        paddingTop: ViewUtils.isIphoneX() ? 52 : 28,
        backgroundColor: "rgba(255,255,255,0.73)",
        marginBottom: 8
    },
    headerNoAuth: {
        paddingTop: ViewUtils.isIphoneX() ? 64 : 40,
        paddingBottom: 16,
    },
    logo: {
        paddingBottom: 12,
        alignItems: "center",
    },
    logoText: {
        color: Colors.labelFont,
        fontWeight: "700",
        fontSize: 18,
    },
    item: {
        paddingLeft: 22,
        height: 50,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    itemText: {
        color: Colors.fontColor,
        fontSize: 16,
        marginLeft: 16,
        paddingBottom: 2
    },
    icon: {
        color: Colors.tabSelected
    },
    userArea: {
        paddingTop: 12,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
    },
    username: {
        fontSize: 16,
        paddingTop: 12,
        paddingBottom: 8,
        color: Colors.primaryColorDark
    },
    balanceArea: {
        marginTop: 12,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        ...getPlatformElevation(2)
    },
    balanceLabel: {
        color: Colors.labelFont,
        fontSize: 16,
        fontWeight: "700"
    },
    balanceValue: {
        paddingRight: 15,
        color: Colors.primaryColor,
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: 1,
    },
    authButton: {
        backgroundColor: Colors.primaryColor2,
        width: 120,
        marginVertical: 6,
    }
});
