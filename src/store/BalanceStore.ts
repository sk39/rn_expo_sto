import {observable, reaction} from "mobx";
import AuthStore from "@store/AuthStore";
import data from '@constants/dummyData/balances';
import _ from "lodash";
import ViewUtils from "@common/utils/ViewUtils";

/**
 * Balance state.
 */
export default class BalanceStore {

    @observable processing: boolean = false;
    @observable balances: any[] = []; // TODO:
    @observable deposit: number = null;
    @observable totalBalance: number = null;


    auth: AuthStore = null;

    async initialize(auth: AuthStore) {
        this.auth = auth;
        reaction(
            () => auth.loggedIn,
            (loggedIn) => {
                if (loggedIn) {
                    this.loadData();
                } else {
                    this.clear();
                }
            }
        )
    }

    async clear() {
        this.processing = false;
        this.balances = [];
        this.totalBalance = null;
    }

    async loadData() {
        const {auth} = this;
        if (!auth.loggedIn) {
            return;
        }
        this.processing = true;

        // TODO:
        await ViewUtils.sleep(800)
        this.processing = false;
        this.balances = data;
        this.deposit = data[0].balance;
        this.totalBalance = _.reduce(data, (sum, item) => {
            return sum + item.balanceBaseCurrency;
        }, 0);
        return this.balances;
    }
}


