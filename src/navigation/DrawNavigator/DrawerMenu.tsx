import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DrawerContentComponentProps} from "react-navigation-drawer/src/types";
import {ScreenIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {Button} from 'react-native-elements';
import ViewUtils from "@common/utils/ViewUtils";
import NumberLabel from "@common/components/Label/NumberLabel";
import {RootStoreProps} from "@store/RootStoreProvider";
import {inject, observer} from "mobx-react";
import Logo from "@common/components/Image/Logo";
import LoginUserAvatar from "@common/components/Image/LoginUserAvatar";
import Format from "@constants/Format";
import UpdateManager from "@common/plugins/UpdateManager";
import env from "@common/plugins/env";
import {If} from "@common/components/PageSupport/If";

@inject('rootStore')
@observer
export default class DrawerMenu extends Component<DrawerContentComponentProps & RootStoreProps> {

    jump(routeName) {
        const {navigation} = this.props;
        navigation.navigate(routeName);
        (navigation as any).closeDrawer();
    }

    signOut = () => {
        const {auth} = this.props.rootStore;
        auth.signOut();
        const {navigation} = this.props;
        (navigation as any).closeDrawer();
    }

    reload = () => {
        UpdateManager.reload();
    }

    checkUpdate = () => {
        UpdateManager.checkUpdate();
    }

    renderItem = (key) => {
        return (
            <TouchableOpacity key={key}
                              style={styles.item}
                              onPress={() => this.jump(key)}>
                <View style={{width: 36}}>
                    <ScreenIcon screenName={key} color={Colors.btnPrimary} size={24}/>
                </View>
                <Text style={styles.itemText}>{t(`navigation.menu.${key}`)}</Text>
            </TouchableOpacity>
        )
    }

    renderItemDev = (key) => {
        return (
            <TouchableOpacity key={key}
                              style={styles.item}
                              onPress={() => this.jump(key)}>
                <View style={{width: 16}}>
                    <ScreenIcon screenName={key} color={Colors.primary} size={16}/>
                </View>
                <Text style={styles.itemText}>{key}</Text>
            </TouchableOpacity>
        )
    }

    renderHeaderNoAuth() {
        return (
            <View style={styles.header}>
                <View style={styles.logoWrapper}>
                    <Logo/>
                    <Text style={styles.logoText}>Digital Security</Text>
                </View>
                <View style={styles.btnWrapper}>
                    <Button title={t("btn.sign-in")}
                            buttonStyle={styles.authButton}
                            raised
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
                <View style={styles.userHeader}>
                    <LoginUserAvatar size={76}/>
                    <View style={{paddingLeft: 24}}>
                        <Text style={styles.username}>
                            {auth.username}
                        </Text>
                        <Text style={styles.balanceLabel}>
                            Balance
                        </Text>
                        <NumberLabel
                            value={balance.totalBalance}
                            decimals={0}
                            prefix={Format.baseCcySymbol}
                            style={styles.balanceValue}/>
                    </View>
                </View>
                <View style={styles.btnWrapper}>
                    <Button title={t("btn.sign-out")}
                            raised
                            buttonStyle={styles.authButton}
                            onPress={this.signOut}
                    />
                </View>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.back}>
                {this.renderHeader()}
                <ScrollView>
                    <View style={{paddingVertical: 16}}>
                        {["Home", "Tokens", "Portfolio", "Cashflow", "Settings", "SystemInfo"].map(this.renderItem)}
                    </View>
                    <If test={env.SHOW_DEV_SCREENS}>
                        <View style={styles.devWrapper}>
                            <Text style={styles.devTitle}>Development</Text>
                            {[
                                "Sandbox", "Chart", "ProcessAnimation", "QRTest",
                                "LocationTest", "AuthTest", "Lottie", "InnerRouter", "ImageTest"
                            ].map(this.renderItemDev)}
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginBottom: 16,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Button title="Check Update"
                                    type="clear"
                                    containerStyle={{marginRight: 12}}
                                    onPress={this.checkUpdate}
                            />
                            <Button title="Reload"
                                    type="clear"
                                    onPress={this.reload}
                            />
                        </View>
                    </If>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.tabBar,
        paddingHorizontal: 12,
    },
    header: {
        paddingTop: ViewUtils.isIphoneX() ? 60 : 34,
        alignItems: "center",
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder,
    },
    userHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    username: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primaryDark,
        marginBottom: 12,
    },
    balanceLabel: {
        color: Colors.labelFont,
        fontSize: 12,
        // opacity: 0.8,
        // fontWeight: "700"
    },
    balanceValue: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 1,
    },
    logoWrapper: {
        marginTop: -6,
        paddingBottom: 6,
        alignItems: "center",
    },
    logoText: {
        marginTop: 2,
        color: Colors.labelFont,
        // opacity: 0.8,
        fontWeight: "700",
        fontSize: 18,
        letterSpacing: 2,
    },
    item: {
        paddingLeft: 12,
        height: 50,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    itemText: {
        color: Colors.font,
        fontSize: 16,
        marginLeft: 16,
        paddingBottom: 2
    },
    btnWrapper: {
        paddingVertical: 16,
        width: 130,
    },
    authButton: {
        backgroundColor: Colors.btnPrimaryLight,
        padding: 0,
        height: 40,
        borderRadius: 26,
    },
    devWrapper: {
        borderTopWidth: 1,
        borderTopColor: Colors.listBorder,
        paddingLeft: 12,
        paddingVertical: 24,
    },
    devTitle: {
        fontSize: 16,
        fontWeight: "700",
        opacity: 0.4,
        // marginLeft: 16,
        marginBottom: 12,
    },
});
