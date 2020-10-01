const env = require('@sk39/dotenv-ex').config()
const googleServiceWeb = require("./google-services-web.json");
export default {
    name: "rn_expo_sto_demo",
    slug: "rn_expo_sto_demo",
    description: "Security Token Trade App. Powered by React Native (Expo).",
    privacy: "public",
    platforms: [
        "ios",
        "android"
    ],
    version: "1.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "cover",
        backgroundColor: "#fff"
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.sk39.sto.demo",
        googleServicesFile: "./GoogleService-Info.plist",
    },
    android: {
        package: "com.sk39.sto.demo",
        googleServicesFile: "./google-services.json",
        softwareKeyboardLayoutMode: "pan",
        adaptiveIcon: {
            foregroundImage: "./assets/android/foreground.png",
            backgroundColor: "#fff"
        }
    },
    web: {
        config: {
            ...googleServiceWeb
        }
    },
    androidStatusBar: {
        barStyle: "dark-content",
        backgroundColor: "#fff",
        translucent: true
    },
    packagerOpts: {
        config: "metro.config.js",
        sourceExts: [
            "js",
            "jsx",
            "ts",
            "tsx",
            "svg"
        ]
    },
    extra: {
        env
    }
};
