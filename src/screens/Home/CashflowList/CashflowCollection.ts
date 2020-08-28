import {action, computed, observable} from "mobx";


export interface Cashflow {
    name: string;
    symbol: string;
    date: string;
    cashBalance: string;
    totalBalance: string;
}

export default class CashflowCollection {

    @observable list: Cashflow[] = [];

    @action
    setData(data) {
        this.list = data;
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



