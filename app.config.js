const env = require('@sk39/dotenv-ex').config()
export default {
    name: "rn_expo_sto_demo",
    slug: "rn_expo_sto_demo",
    description: "Security Token Trade App. Powered by React Native (Expo).",
    privacy: "public",
    platforms: [
        "ios",
        "android"
    ],
    version: "1.0.3",
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
        bundleIdentifier: "com.sk39.sto.demo"
    },
    android: {
        package: "com.sk39.sto.demo",
        googleServicesFile: "./google-services.json",
        adaptiveIcon: {
            foregroundImage: "./assets/android/foreground.png",
            backgroundColor: "#fff"
        }
    },
    androidStatusBar: {
        barStyle: "light-content",
        backgroundColor: "#130f3c",
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
