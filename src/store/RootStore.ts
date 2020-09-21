import AuthStore from "./AuthStore";
import SettingsStore from "@store/SettingsStore";
import BalanceStore from "@store/BalanceStore";
import STOStore from "@store/STOStore";
import ImageStore from "@store/ImageStore";

/**
 * Global state.
 */
export default class RootStore {

    settings = new SettingsStore();
    auth = new AuthStore();
    balance = new BalanceStore();
    sto = new STOStore();
    image = new ImageStore();

    async initialize() {
        await this.settings.initialize();
        await this.auth.initialize();
        await this.balance.initialize(this.auth);
        await this.sto.initialize();
        await this.image.initialize();
    }

    async clear() {
        await this.settings.clear();
        await this.auth.clear();
        await this.balance.clear();
        await this.sto.clear();
        await this.image.clear();
    }
}

