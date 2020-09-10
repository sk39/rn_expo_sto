import {action, observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";
import {STO} from "@common/model/domainModel";
import _ from "lodash";
import data from "@constants/dummyData/sto";
import MyToast from "@common/utils/MyToast";

export default class STOStore {

    @observable processing: boolean = false;
    @observable list: STO[] = [];
    @observable errorMessage: string = null;

    async initialize() {
    }

    @action
    async clear() {
        this.processing = false;
        this.list = [];
        this.errorMessage = null;
    }

    async loadData(cacheOk?: boolean) {
        if (cacheOk && this.list.length > 0) {
            return this.list;
        }

        // TODO:
        try {
            this.errorMessage = null;
            this.processing = true;
            await ViewUtils.sleep(500)
            this.list = data;
        } catch (e) {
            this.errorMessage = "Server error!";
            MyToast.error(
                this.errorMessage,
            )
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


