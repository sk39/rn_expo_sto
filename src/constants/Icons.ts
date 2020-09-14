import {Platform} from "react-native";

const isIos = Platform.OS === "ios";
const ioniconPrefix = isIos ? "ios" : "md";
export default {
    Login: {
        name: `${ioniconPrefix}-log-in`,
        type: "ionicon"
    },
    Home: {
        name: `${ioniconPrefix}-home`,
        type: "ionicon"
    },
    Tokens: {
        name: `search`,
        type: "feather"
    },
    Portfolio: {
        name: `credit-card`,
        type: "feather"
    },
    Settings: {
        name: "settings",
        type: "feather"
    },
    More: {
        name: `${ioniconPrefix}-menu`,
        type: "ionicon"
    },
    Default: {
        name: "plus",
        type: "feather"
    }
};
