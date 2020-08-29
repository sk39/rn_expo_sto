import {createStackNavigator} from "react-navigation-stack";
import DrawNavigator from "./DrawNavigator";
import LoginScreen from "../screens/Login/LoginScreen";
import DirectDetail from "../screens/Token/DirectDetail";
import InvestToken from "../screens/Token/Invest";

const RootStack = createStackNavigator(
    {
        Main: {
            screen: DrawNavigator
        },
        Login: {
            screen: LoginScreen
        },
        TokenDetail: {
            screen: DirectDetail
        },
        InvestToken: {
            screen: InvestToken
        }
    },
    {
        mode: "modal",
        headerMode: "none"
    }
);

export default RootStack;
