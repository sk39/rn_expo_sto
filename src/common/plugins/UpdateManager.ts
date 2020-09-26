import * as Updates from "expo-updates"
import {Alert} from "react-native";


export default class UpdateManager {

    static async checkUpdate(): Promise<boolean> {
        if (__DEV__) {
            return false;
        }

        try {
            const update = await Updates.checkForUpdateAsync();
            if (!update.isAvailable) {
                return false;
            }

            return await this.confirmUpdate();
        } catch (e) {
            console.warn("Failed checkForUpdateAsync", e)
            return false;
        }
    }

    static confirmUpdate(): Promise<boolean> {
        return new Promise((resolve => {
            Alert.alert(
                t("screen.update.title"),
                t("screen.update.message"),
                [
                    {
                        text: t("btn.cancel"),
                        onPress: () => resolve(false),
                        style: "cancel"
                    },
                    {
                        text: t("screen.update.doneBtn"),
                        onPress: () => resolve(true)
                    }
                ],
                {cancelable: false}
            )
        }))
    }

    static async fetchUpdate() {
        try {
            await Updates.fetchUpdateAsync();
        } catch (e) {
            console.warn("Failed fetchUpdateAsync", e)
        }
    }

    static reload() {
        try {
            Updates.reloadAsync().then();
        } catch (e) {
            console.warn("Failed reloadAsync", e)
        }
    }
}
