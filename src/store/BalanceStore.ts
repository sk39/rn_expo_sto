import {computed, observable, reaction} from "mobx";
import AuthStore from "@store/AuthStore";
import _ from "lodash";
import ViewUtils from "@common/utils/ViewUtils";
import {Balance} from "@common/model/domainModel";
import MyToast from "@common/utils/MyToast";
import {onOrderTokens, ownTokens, summary} from '@constants/dummyData/balances';

/**
 * Balance state.
 */
export default class BalanceStore {

    @observable processing: boolean = false;
    @observable errorMessage: string = null;
    @observable summary: Balance[] = [];
    @observable ownTokens: Balance[] = [];
    @observable onOrderTokens: Balance[] = [];

    auth: AuthStore = null;

    @computed
    get deposit() {
        return this.summary[0].balanceBaseCurrency
    }

    @computed
    get totalBalance() {
        return _.reduce(this.summary, (sum, item) => {
            return sum + item.balanceBaseCurrency;
        }, 0);
    }

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
        this.summary = [];
        this.ownTokens = [];
        this.onOrderTokens = [];
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
            await ViewUtils.sleep(300)
            this.summary = summary;
            this.ownTokens = ownTokens;
            this.onOrderTokens = onOrderTokens;
            return this.summary;
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


