import {action, observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";
import _ from "lodash";
import data from "@constants/dummyData/sto";
import MyToast from "@common/utils/MyToast";
import StoVM from "@common/model/StoVM";

export default class STOStore {

    @observable processing: boolean = false;
    @observable list: StoVM[] = [];
    @observable errorMessage: string = null;

    async initialize() {
        await this.loadData(true);
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
            await ViewUtils.sleep(300)
            this.list = data.map(m => new StoVM(m));
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

    async get(symbol: string): Promise<StoVM> {
        const list = await this.loadData(true);
        return _.find(list, t => t.symbol === symbol);
    }

    getSync(symbol: string): StoVM {
        const {list} = this;
        return _.find(list, t => t.symbol === symbol);
    }
}


