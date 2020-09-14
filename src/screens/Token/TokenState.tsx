import {action, computed, observable} from "mobx";
import {STO} from "@common/model/domainModel";
import RootStore from "@store/RootStore";

export default class TokenState {

    @observable selectedItem: STO = null;

    navigation;
    stoStore;
    authStore;
    balanceStore;

    constructor(navigation, rootStore: RootStore) {
        this.navigation = navigation;
        this.stoStore = rootStore.sto;
        this.authStore = rootStore.auth;
        this.balanceStore = rootStore.balance;
    }

    async loadData(cacheOk?: boolean): Promise<STO[]> {
        return this.stoStore.loadData(cacheOk);
    }

    @computed
    get loggedIn() {
        return this.authStore.loggedIn;
    }

    @computed
    get processing() {
        return this.stoStore.processing;
    }

    @computed
    get list() {
        return this.stoStore.list;
    }

    @computed
    get pickupList() {
        return this.stoStore.list.slice(0, 4);
    }

    async get(symbol: string) {
        return this.stoStore.get(symbol);
    }

    @action
    clear() {
    }

    @action
    selectItem(item) {
        this.selectedItem = item;
    }

}



