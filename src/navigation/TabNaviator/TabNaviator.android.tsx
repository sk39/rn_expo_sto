import React from "react";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {createSwitchNavigator} from "react-navigation";
import Screens, {TabScreens} from "../Routes";
import MoreNavigationOptions from "./MoreNavigationOptions";
import Colors from "@constants/Colors";

const TabNavigator = createMaterialBottomTabNavigator(
    {
        ...TabScreens,
        More: {
            screen: createSwitchNavigator(Screens),
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
