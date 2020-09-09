import RootStore from "@store/RootStore";
import TokenState from "../TokenState";
import InputNumberState from "@common/components/Input/InputNumberState";
import ProcessDialogState from "@common/components/Modal/ProcessDialog/ProcessDialogState";
import ViewUtils from "@common/utils/ViewUtils";
import {action, computed, observable} from "mobx";

export default class InvestTokenState extends TokenState {

    amount: InputNumberState;
    processState: ProcessDialogState = new ProcessDialogState();
    @observable confirming: boolean = false;
    @observable agreed: boolean = false;

    constructor(symbol: string, navigation, rootStore: RootStore) {
        super(navigation, rootStore);
        this.amount = new InputNumberState();
        this.amount.setUnit(symbol)
    }

    @action
    setAgreed(flag: boolean) {
        this.agreed = flag;
    }

    @computed
    get offeringPrice() {
        return 200
    }

    @computed
    get minBuyToken() {
        return 1
    }

    @computed
    get maxBuyToken() {
        return 10000
    }

    @computed
    get amountBaseCcy() {
        const {amount, offeringPrice} = this;
        if (!amount.value || amount.value.length === 0) {
            return null;
        }

        return Number(amount.value) * offeringPrice;
    }

    @computed
    get userDeposit() {
        return this.balanceStore.deposit
    }

    @computed
    get afterUserDeposit() {
        return this.balanceStore.deposit - this.amountBaseCcy;
    }

    @computed
    get userTokens() {
        return 0
    }

    @computed
    get afterUserTokens() {
        return 0 + this.amount.value;
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



