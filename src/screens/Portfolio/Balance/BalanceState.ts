import {action, computed, observable} from "mobx";
import {Balance} from "@common/model/domainModel";
import {PieChartColor} from "@constants/Colors";
import RootStore from "@store/RootStore";
import BalanceStore from "@store/BalanceStore";
import AuthStore from "@store/AuthStore";
import STOStore from "@store/STOStore";

export interface BalanceVM extends Balance {
    color: string;
}

export interface BalanceTokenVM extends Balance {
    imageSource: any;
}

export default class BalanceState {

    @observable processing = false;
    @observable summary: BalanceVM[] = [];
    @observable ownTokens: BalanceTokenVM[] = [];
    @observable onOrderTokens: BalanceTokenVM[] = [];
    @observable total: number = null;

    authStore: AuthStore;
    balancesStore: BalanceStore;
    stoStore: STOStore;

    constructor(rootStore: RootStore) {
        this.authStore = rootStore.auth
        this.balancesStore = rootStore.balance;
        this.stoStore = rootStore.sto
    }

    async loadData(): Promise<BalanceVM[]> {
        const store = this.balancesStore;
        try {
            this.processing = true;
            await store.loadData();
            await this.stoStore.loadData(true);
            return this.setData(store);
        } catch (e) {
        } finally {
            this.processing = false;
        }
    }

    findSto(symbol: string) {
        return this.stoStore.getSync(symbol);
    }

    @action
    setData(store: BalanceStore) {
        this.total = store.totalBalance;
        this.summary = store.summary.map((d, i) => {
            return Object.assign({},
                d,
                {color: PieChartColor[i] || "#ccc"}
            )
        });

        const toTokenVM = d => {
            const sto = this.findSto(d.symbol);
            return Object.assign({},
                d,
                {imageSource: sto ? sto.imageSource : null}
            )
        };

        this.ownTokens = store.ownTokens.map(toTokenVM);
        this.onOrderTokens = store.onOrderTokens.map(toTokenVM);

        return this.summary;
    }

    @action
    clear() {
        this.summary = [];
        this.ownTokens = [];
        this.onOrderTokens = [];
        this.total = null;
    }

    @computed
    get chartData() {
        if (this.summary.length === 0) {
            const defaultDataList = [];
            for (let i = 0; i < 3; i++) {
                defaultDataList.push({
                    key: i + 1,
                    amount: 10,
                    svg: {fill: PieChartColor[i] || "#ccc"},
                })
            }
            return defaultDataList;
        } else if (this.summary.length === 1) {
            if (this.summary[0].balanceBaseCurrency === 0) {
                return [{
                    key: 1,
                    amount: 10,
                    svg: {fill: PieChartColor[0] || "#ccc"},
                }];
            }
        }

        return this.summary.map((d, i) => {
            return {
                key: i + 1,
                amount: d.balanceBaseCurrency,
                svg: {fill: d.color},
            }
        });
    }
}
