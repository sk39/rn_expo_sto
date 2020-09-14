import {action, observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";

export default class PerformanceState {

    @observable processing = false;
    @observable list: any[] = [];

    constructor() {
        this.clear();
    }

    @action
    clear() {
        this.processing = false;
        this.list = [
            {term: "2017", invest: 0, current: 0},
            {term: "2018", invest: 0, current: 0},
            {term: "2019", invest: 0, current: 0},
            {term: "2020", invest: 0, current: 0}
        ]
    }

    async loadData(): Promise<any[]> {
        try {
            this.clear();
            this.processing = true;
            await ViewUtils.sleep(700);
            this.list = [
                {term: "2017", invest: 5000, current: 5800},
                {term: "2018", invest: 15000, current: 15500},
                {term: "2019", invest: 12000, current: 11400},
                {term: "2020", invest: 16000, current: 18000}
            ]
            return this.list;
        } catch (e) {
        } finally {
            this.processing = false;
        }
    }

}
