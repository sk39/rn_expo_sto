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
    title: 'Setup 2FA'
};
// @ts-ignore
VerifyMfaScreen.navigationOptions = {
    title: '2FA Authentication'
};

export default createStackNavigator({
    LoginEntry: LoginEntryScreen,
    SetupMfa: SetupMfaScreen,
    VerifyMfa: VerifyMfaScreen
}, {
    cardStyle: {backgroundColor: Colors.tabBar}
})
