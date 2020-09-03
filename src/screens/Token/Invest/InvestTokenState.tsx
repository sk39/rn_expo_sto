import RootStore from "@store/RootStore";
import TokenState from "../TokenState";
import InputNumberState from "@common/components/Input/InputNumberState";
import ProcessDialogState from "@common/components/Modal/ProcessDialog/ProcessDialogState";
import ViewUtils from "@common/utils/ViewUtils";
import {computed, observable} from "mobx";

export default class InvestTokenState extends TokenState {

    amount: InputNumberState;
    processState: ProcessDialogState = new ProcessDialogState();
    @observable confirming: boolean = false;

    constructor(navigation, rootStore: RootStore) {
        super(navigation, rootStore);
        this.amount = new InputNumberState();
        this.amount.setUnit("USD")
    }

    @computed
    get offeringPrice() {
        return 200
    }

    @computed
    get userDeposit() {
        return this.balanceStore.deposit
    }

    @computed
    get buyToken() {
        const {amount, offeringPrice} = this;
        if (!amount.value || amount.value.length === 0) {
            return null;
        }

        const token = Number(amount.value) / offeringPrice;
        return token;
    }

    async confirm() {
        try {
            // TODO: confirm invest request
            this.confirming = true;
            await ViewUtils.sleep(600);
            this.processState.confirm();
        } catch (e) {
            //TODO:
        } finally {
            this.confirming = false;
        }
    }

    async invest() {
        try {
            // TODO: invest request
            this.processState.startProcessing();
            await ViewUtils.sleep(1000);
            this.processState.success();
        } catch (e) {
            //TODO:
            this.processState.error("Amount must be more than zero.");
        }
    }

    cancelConfirm() {
        this.processState.clear();
    }
}



