import React, {Component} from "react";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DrawerContentComponentProps} from "react-navigation-drawer/src/types";
import {DisplayInTabScreens, OnlySideMenuScreens} from "../Routes";
import _ from "lodash";
import {ScreenIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {Avatar} from 'react-native-elements';
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import ViewUtils from "@common/utils/ViewUtils";
import data from "@constants/dummyData/userInfo";

export default class DrawerMenu extends Component<DrawerContentComponentProps> {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    jump(routeName) {
        const {navigation} = this.props;
        navigation.navigate(routeName);
        // @ts-ignore
        navigation.closeDrawer();
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

    render() {
        return (
            <ImageBackground source={require("@assets/sideMenu.png")}
                             style={styles.menu}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>STO Platform Demo</Text>
                </View>
                <View style={styles.userArea}>
                    <Avatar
                        rounded
                        size="large"
                        source={{
                            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                        }}
                    />
                    <Text style={styles.username}>{data.name}</Text>
                    <View style={styles.balanceArea}>
                        <Text style={styles.balanceLabel}>
                            Balance
                        </Text>
                        <Text style={styles.balanceValue}>
                            $ {data.balance}
                        </Text>
                    </View>
                </View>
                {this.renderItem(null, "Login")}
                {_.map(DisplayInTabScreens, this.renderItem)}
                {_.map(OnlySideMenuScreens, this.renderItem)}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        width: '100%',
        height: '100%'
    },
    logo: {
        paddingTop: ViewUtils.isIphoneX() ? 48 : 24,
        paddingBottom: 12,
        // marginTop: 2,
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
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
    },
    username: {
        fontSize: 16,
        paddingVertical: 5,
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
    }
});
