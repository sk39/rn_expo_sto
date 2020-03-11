import React from "react";
import HomeScreen from "../../screens/Home/HomeScreen";
import SettingsScreen from "../../screens/Settgins/SettingsScreen";
import STOScreen from "../../screens/STO/STOScreen";
import Sandbox from "../../screens/Sandbox/Sandbox";
import ChartScreen from "../../screens/Chart/ChartScreen";
import LottieScreen from "../../screens/Lottie/LottieScreen";
import CounterScreen from "../../screens/Counter/CounterScreen";
import InnerRouterScreen from "../../screens/InnerRouter/InnerRouterScreen";

export const DisplayInTabScreens = {
    Home: HomeScreen,
    Tokens: STOScreen,
};

export const OnlySideMenuScreens = {
    Settings: SettingsScreen,
    Lottie: LottieScreen,
    Chart: ChartScreen,
    InnerRouter: InnerRouterScreen,
    Counter: CounterScreen,
    Sandbox: Sandbox,
};
