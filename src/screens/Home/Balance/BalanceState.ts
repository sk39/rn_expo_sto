import {action, computed, observable} from "mobx";
import {Balance} from "@common/model/domainModel";
import {PieChartColor} from "@constants/Colors";

export interface BalanceVM extends Balance {
    color: string;
}

export default class BalanceState {

    @observable processing = false;
    @observable list: BalanceVM[] = [];
    @observable total: number = null;

    balancesStore;

    constructor(balancesStore) {
        this.balancesStore = balancesStore;
    }

    async loadData(): Promise<BalanceVM[]> {
        const store = this.balancesStore;
        try {
            this.processing = true;
            await store.loadData();
            this.setData(store.balances, store.totalBalance);
            return this.list;
        } catch (e) {
        } finally {
            this.processing = false;
        }
    }

    @action
    setData(list, total) {
        this.list = list.map((d, i) => {
            return {
                name: d.name,
                symbol: d.symbol,
                balance: d.balance,
                balanceBaseCurrency: d.balanceBaseCurrency,
                color: PieChartColor[i] || "#ccc"
            }
        });
        this.total = total;
    }

    @action
    clear() {
        this.list = [];
        this.total = null;
    }

    @computed
    get chartData() {
        if (this.list.length === 0) {
            const defaultDataList = [];
            for (let i = 0; i < 3; i++) {
                defaultDataList.push({
                    key: i + 1,
                    amount: 10,
                    svg: {fill: PieChartColor[i] || "#ccc"},
                })
            }
            return defaultDataList;
        }

        return this.list.map((d, i) => {
            return {
                key: i + 1,
                amount: d.balanceBaseCurrency,
                svg: {fill: d.color},
            }
        });
    }
}
