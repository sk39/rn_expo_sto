import {action, observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";
import {STO} from "@common/model/domainModel";
import data from '@constants/dummyData/sto';
import _ from "lodash";

export default class STOStore {

    @observable processing: boolean = false;
    @observable list: STO[] = [];

    async initialize() {
    }

    @action
    async clear() {
        this.processing = false;
        this.list = []
    }

    async loadData(cacheOk?: boolean) {
        if (cacheOk && this.list.length > 0) {
            return this.list;
        }

        // TODO:
        try {
            this.processing = true;
            await ViewUtils.sleep(800)
            this.list = data;
        } catch (e) {

        } finally {
            this.processing = false;
        }
        return this.list;
    }

    async get(symbol: string) {
        let list = await this.loadData(true);
        return _.find(list, t => t.symbol === symbol);
    }
}


