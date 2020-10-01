import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import STODetail from "./STODetail";
import STOComment from "./STOComment";

export default createStackNavigator({
    STODetail,
    STOComment,
}, {
    defaultNavigationOptions: {
        headerShown: false,
    }
})
