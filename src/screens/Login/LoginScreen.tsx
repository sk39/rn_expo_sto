import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import LoginEntryScreen from "./LoginEntryScreen";
import SetupMfaScreen from "./SetupMfaScreen";
import VerifyMfaScreen from "./VerifyMfaScreen";
import Colors from "@constants/Colors";

// @ts-ignore
LoginEntryScreen.navigationOptions = {
    header: null
}
// @ts-ignore
SetupMfaScreen.navigationOptions = {
    title: t("screen.setup2fa.pageTitle")
};
// @ts-ignore
VerifyMfaScreen.navigationOptions = {
    title: t("screen.2fa.pageTitle")
};

export default createStackNavigator({
    LoginEntry: LoginEntryScreen,
    SetupMfa: SetupMfaScreen,
    VerifyMfa: VerifyMfaScreen
}, {
    cardStyle: {backgroundColor: Colors.tabBar}
})
