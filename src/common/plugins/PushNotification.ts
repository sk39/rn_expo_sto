import {Notifications} from 'expo';
import {Notification} from "expo/build/Notifications/Notifications.types";
import * as Permissions from "expo-permissions";

export default class PushNotification {

    static token: string;
    private static notificationSubscription;

    static async register() {
        try {
            const {status: existingStatus} = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );

            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                console.warn("Not granted", finalStatus);
                throw Error(`Not granted. Status is ${finalStatus}`)
            }

            this.token = await Notifications.getExpoPushTokenAsync();
            console.log("Token", this.token);
            return this.token;
        } catch (e) {
            console.warn("Token Error", e);
            throw Error(`Failed register token. ${e}`)
        }
    }

    static addListener(listener: (notification: Notification) => void) {
        this.notificationSubscription = Notifications.addListener(listener);

        // // Clear Badge
        // Notifications.getBadgeNumberAsync().then(badgeNumber => {
        //     if (badgeNumber !== 0) {
        //         Notifications.setBadgeNumberAsync(badgeNumber - 1);
        //     }
        // })
    }
}
