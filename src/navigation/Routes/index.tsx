import React from "react";
import Index from "../../screens/Home";
import Token from "../../screens/Token";
import ChartScreen from "../../screens/Sandbox/Chart/ChartScreen";
import LottieScreen from "../../screens/Sandbox/Lottie/LottieScreen";
import InnerRouterScreen from "../../screens/Sandbox/InnerRouterScreen";
import Sandbox from "../../screens/Sandbox/Sandbox";
import AppInfoScreen from "../../screens/Sandbox/AppInfoScreen";

export const DisplayInTabScreens = {
    Home: Index,
    Tokens: Token,
};

export const OnlySideMenuScreens = {
    Sandbox: Sandbox,
    Lottie: LottieScreen,
    Chart: ChartScreen,
    InnerRouter: InnerRouterScreen,
    AppInfo: AppInfoScreen,
};
