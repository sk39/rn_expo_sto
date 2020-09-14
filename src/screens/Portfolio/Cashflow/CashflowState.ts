import {action, computed, observable} from "mobx";
import {Cashflow} from "@common/model/domainModel";
import ViewUtils from "@common/utils/ViewUtils";
import data from "@constants/dummyData/cashflow";

export default class CashflowState {

    @observable processing = false;
    @observable list: Cashflow[] = [];

    authStore
    balancesStore;

    constructor(authStore, balancesStore) {
        this.authStore = authStore;
        this.balancesStore = balancesStore;
    }

    async loadData() {
        const {authStore, balancesStore} = this;
        if (!authStore.loggedIn) {
            return;
        }
        try {
            this.processing = true;
            this.clear();
            await ViewUtils.sleep(1200);
            let total = Number(balancesStore.deposit);
            const list = data.map(item => {
                const totalBalance = total;
                total = total - Number(item.cashBalance);
                return Object.assign({}, item, {totalBalance})
            });
            if (total > 0) {
                list.push({
                    name: 'Deposit',
                    date: "2017-01-01",
                    cashBalance: String(total),
                    totalBalance: total
                })
            }

            this.setData(list);
        } catch (e) {

        } finally {
            this.processing = false;
        }
    }

    @action
    setData(data) {
        this.list = data;
    }

    @action
    clear() {
        this.list = [];
    }

    @computed
    get chartData() {
        if (this.list.length === 0) {
            return [0, 20, 0, 20, 0, 20, 0, 20];
        }

        const list: any[] = this.list.map((d, i) => {
            return d.totalBalance
        });

        list.push(0);
        return list.reverse();
    }
}



