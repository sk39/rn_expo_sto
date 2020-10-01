import {observable, runInAction} from "mobx";
import Storage from "@store/storage/Storage";

const STORAGE_KEY = "sto-demo-settings";

/**
 * Settings state.
 */
export default class SettingsStore {

    @observable enableLocalAuth = true;
    @observable enablePushNotification = false;

    async saveStorage() {
        await Storage.save(STORAGE_KEY, {
            enableLocalAuth: this.enableLocalAuth,
            enablePushNotification: this.enablePushNotification,
        })
    }

    async loadStorage() {
        const data = await Storage.load(STORAGE_KEY);

        if (data) {
            runInAction(() => {
                this.enableLocalAuth = data.enableLocalAuth;
                this.enablePushNotification = data.enablePushNotification;
            });
        }
    }

    async initialize() {
        await this.loadStorage();
    }

    async clear() {
        runInAction(() => {
            this.enableLocalAuth = true;
        });
        await Storage.remove(STORAGE_KEY);
    }
}

