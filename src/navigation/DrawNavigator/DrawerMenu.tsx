import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DrawerContentComponentProps} from "react-navigation-drawer/src/types";
import {ScreenIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {Avatar, Button} from 'react-native-elements';
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
        this.renderItemDev = this.renderItemDev.bind(this)
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

    renderItem(key) {
        return (
            <TouchableOpacity key={key}
                              style={styles.item}
                              onPress={() => this.jump(key)}>
                <View style={{width: 36}}>
                    <ScreenIcon screenName={key} color={Colors.primaryColor} size={24}/>
                </View>
                <Text style={styles.itemText}>{key}</Text>
            </TouchableOpacity>
        )
    }

    renderItemDev(key) {
        return (
            <TouchableOpacity key={key}
                              style={styles.item}
                              onPress={() => this.jump(key)}>
                <View style={{width: 16}}>
                    <ScreenIcon screenName={key} color={Colors.primaryColor} size={16}/>
                </View>
                <Text style={styles.itemText}>{key}</Text>
            </TouchableOpacity>
        )
    }

    renderHeaderNoAuth() {
        return (
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>STO Platform Demo</Text>
                </View>
                <View style={styles.btnWrapper}>
                    <Button title='Sign In'
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
                    <Avatar
                        rounded
                        size="large"
                        source={{
                            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                        }}
                    />
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
                            prefix={"$"}
                            style={styles.balanceValue}/>
                    </View>
                </View>
                <View style={styles.btnWrapper}>
                    <Button title='Sign Out'
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
            <View style={{flex: 1}}>
                {this.renderHeader()}
                <ScrollView>
                    <View style={{paddingVertical: 12}}>
                        {["Home", "Tokens", "Settings"].map(this.renderItem)}
                    </View>
                    <View style={styles.devWrapper}>
                        <Text style={styles.devTitle}>Development</Text>
                        {[
                            "Sandbox", "PushTest", "QRTest",
                            "LocationTest", "AuthTest", "Lottie",
                            "InnerRouter", "AppInfo"
                        ].map(this.renderItemDev)}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: ViewUtils.isIphoneX() ? 60 : 34,
        alignItems: "center",
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorderColor,
        backgroundColor: Colors.listBorderColor
    },
    userHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
    username: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primaryColorDark,
        marginBottom: 12,
    },
    balanceLabel: {
        color: Colors.labelFont,
        fontSize: 12,
        opacity: 0.8,
        // fontWeight: "700"
    },
    balanceValue: {
        color: Colors.primaryColor,
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 1,
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
    btnWrapper: {
        paddingVertical: 16,
        width: 150,
    },
    authButton: {
        backgroundColor: Colors.primaryColor2,
        borderRadius: 0
    },
    devWrapper: {
        borderTopWidth: 1,
        borderTopColor: Colors.listBorderColor,
        paddingLeft: 12,
        paddingVertical: 24,
    },
    devTitle: {
        fontSize: 16,
        fontWeight: "700",
        opacity: 0.4,
        marginLeft: 16,
        marginBottom: 12,
    },
});
