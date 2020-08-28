import React from "react";
import Home from "../../screens/Home";
import Token from "../../screens/Token";
import Settings from "../../screens/Settgins";
import ChartScreen from "../../screens/Sandbox/Chart/ChartScreen";
import LottieScreen from "../../screens/Sandbox/Lottie/LottieScreen";
import InnerRouterScreen from "../../screens/Sandbox/InnerRouterScreen";
import Sandbox from "../../screens/Sandbox/Sandbox";
import AppInfoScreen from "../../screens/Sandbox/AppInfoScreen";
import PushTestScreen from "../../screens/Sandbox/PushTestScreen";
import QRTestScreen from "../../screens/Sandbox/QRTestScreen";
import LocationTestScreen from "../../screens/Sandbox/LocationTestScreen";
import LocalAuthTestScreen from "../../screens/Sandbox/LocalAuthTestScreen";

export const DisplayInTabScreens = {
    Home: Home,
    Tokens: Token,
};

export const OnlySideMenuScreens = {
    Settings: Settings,
    Sandbox: Sandbox,
    PushTest: PushTestScreen,
    QRTest: QRTestScreen,
    LocationTest: LocationTestScreen,
    AuthTest: LocalAuthTestScreen,
    Lottie: LottieScreen,
    Chart: ChartScreen,
    InnerRouter: InnerRouterScreen,
    AppInfo: AppInfoScreen,
};
