import {action, computed, observable} from "mobx";
import RootStore from "@store/RootStore";
import StoVM from "@common/model/StoVM";

export default class TokenState {

    @observable selectedItem: StoVM = null;
    @observable filterStatus: string[];

    navigation;
    stoStore;
    authStore;
    balanceStore;

    constructor(navigation, rootStore: RootStore, filterStatus?: string[]) {
        this.navigation = navigation;
        this.stoStore = rootStore.sto;
        this.authStore = rootStore.auth;
        this.balanceStore = rootStore.balance;
        this.filterStatus = filterStatus || [];
    }

    async loadData(cacheOk?: boolean): Promise<StoVM[]> {
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
    get filteredList() {
        if (this.filterStatus.length === 0) {
            return this.stoStore.list;
        }

        return _.filter(this.stoStore.list, sto => {
            return this.filterStatus.includes(sto.status)
        })
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



