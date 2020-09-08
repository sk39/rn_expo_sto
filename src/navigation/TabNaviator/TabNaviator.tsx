import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import Screens, {TabScreens} from "../Routes";
import MoreNavigationOptions from "./MoreNavigationOptions";
import {createSwitchNavigator} from "react-navigation";
import Colors from "@constants/Colors";

const TabNavigator = createBottomTabNavigator(
    {
        ...TabScreens,
        More: {
            screen: createSwitchNavigator(Screens, {
                defaultNavigationOptions: {
                    headerShown: true
                }
            }),
            navigationOptions: MoreNavigationOptions
        }
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.tabSelected,
            style: {
                borderTopColor: Colors.tabBorderColor,
                backgroundColor: Colors.tabBar,
            }
        }
    }
);

export default TabNavigator;
