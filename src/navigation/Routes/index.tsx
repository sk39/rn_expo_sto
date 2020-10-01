import React from "react";
import Home from "../../screens/Home";
import Token from "../../screens/Token";
import Settings from "../../screens/Settgins";
import ChartScreen from "../../screens/Sandbox/Chart/ChartScreen";
import LottieScreen from "../../screens/Sandbox/Lottie/LottieScreen";
import InnerRouterScreen from "../../screens/Sandbox/InnerRouterScreen";
import Sandbox from "../../screens/Sandbox/Sandbox";
import QRTestScreen from "../../screens/Sandbox/QRTestScreen";
import LocationTestScreen from "../../screens/Sandbox/LocationTestScreen";
import LocalAuthTestScreen from "../../screens/Sandbox/LocalAuthTestScreen";
import ProcessAnimationExample from "../../screens/Sandbox/ProcessAnimationExample";
import Portfolio from "../../screens/Portfolio";
import Cashflow from "../../screens/Cashflow";
import SystemInfo from "../../screens/System/SystemInfo";

export const TabScreens = {
    Home: Home,
    Tokens: Token,
};

const Screens = {
    Portfolio,
    Cashflow,
    Settings,
    SystemInfo,
    Sandbox,
    ProcessAnimation: ProcessAnimationExample,
    QRTest: QRTestScreen,
    LocationTest: LocationTestScreen,
    AuthTest: LocalAuthTestScreen,
    Lottie: LottieScreen,
    Chart: ChartScreen,
    InnerRouter: InnerRouterScreen,
};

export default Screens;
