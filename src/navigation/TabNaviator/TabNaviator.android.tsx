import React from "react";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Screens, {TabScreens} from "../Routes";
import MoreNavigationOptions from "./MoreNavigationOptions";
import Colors from "@constants/Colors";
import {createStackNavigator} from "react-navigation-stack";

const TabNavigator = createMaterialBottomTabNavigator(
    {
        ...TabScreens,
        More: {
            // Avoid createSwitchNavigator because crash
            screen: createStackNavigator(Screens, {
                defaultNavigationOptions: {
                    headerShown: false,
                    animationEnabled: false
                }
            }),
            navigationOptions: MoreNavigationOptions
        }
    },
    {
        activeColor: Colors.tabSelected,
        shifting: false,
        barStyle: {
            backgroundColor: Colors.tabBar
        }
    }
);

export default TabNavigator;
