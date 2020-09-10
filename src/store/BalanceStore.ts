import {observable, reaction} from "mobx";
import AuthStore from "@store/AuthStore";
import data from '@constants/dummyData/balances';
import _ from "lodash";
import ViewUtils from "@common/utils/ViewUtils";
import {Balance} from "@common/model/domainModel";
import MyToast from "@common/utils/MyToast";

/**
 * Balance state.
 */
export default class BalanceStore {

    @observable processing: boolean = false;
    @observable balances: Balance[] = [];
    @observable deposit: number = null;
    @observable totalBalance: number = null;
    @observable errorMessage: string = null;

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
        this.errorMessage = null;
    }

    async loadData() {
        const {auth} = this;
        if (!auth.loggedIn) {
            return;
        }

        // TODO:
        try {
            this.errorMessage = null;
            this.processing = true;

            await ViewUtils.sleep(600)
            this.balances = data;
            this.deposit = data[0].balance;
            this.totalBalance = _.reduce(data, (sum, item) => {
                return sum + item.balanceBaseCurrency;
            }, 0);
            return this.balances;
        } catch (e) {
            this.errorMessage = "Server error!";
            MyToast.error(
                this.errorMessage,
            )
        } finally {
            this.processing = false;
        }

    }
}


