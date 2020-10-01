import * as FirebaseAnalytics from 'expo-firebase-analytics';

export default class Analytics {

    static enable: boolean = false;

    static log(name: string, properties?: { [key: string]: any }): void {
        if (!this.enable || __DEV__) {
            return;
        }

        try {
            FirebaseAnalytics.logEvent(name, properties).then();
        } catch (e) {
            console.warn(e);
        }
    }
}
