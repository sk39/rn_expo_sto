import AuthStore from "./AuthStore";
import SettingsStore from "@store/SettingsStore";
import BalanceStore from "@store/BalanceStore";

/**
 * Global state.
 */
export default class RootStore {

    settings = new SettingsStore();
    auth = new AuthStore();
    balance = new BalanceStore();

    async initialize() {
        await this.settings.initialize();
        await this.auth.initialize();
        await this.balance.initialize(this.auth);
    }

    async clear() {
        await this.settings.clear();
        await this.auth.clear();
    }
}

