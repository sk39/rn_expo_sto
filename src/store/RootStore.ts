import {action, observable} from "mobx";

/**
 * Global state.
 */
export default class RootStore {

    @observable hideTabBar: boolean = false;

    @action
    setHideTabBar(hideTabBar) {
        this.hideTabBar = hideTabBar;
    }
}

