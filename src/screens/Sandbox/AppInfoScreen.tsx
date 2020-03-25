import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {createStackNavigator} from "react-navigation-stack";

function AppInfoScreen() {
    /**
     * Go ahead and delete ExpoConfigView and replace it with your content;
     * we just wanted to give you a quick view of your config.
     */
    return <ExpoConfigView/>;
}

AppInfoScreen.navigationOptions = {
    title: 'App Info',
};

export default createStackNavigator({AppInfo: AppInfoScreen})
