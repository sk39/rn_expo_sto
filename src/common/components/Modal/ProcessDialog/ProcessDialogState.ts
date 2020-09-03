import {action, computed, observable} from "mobx";

export default class ProcessDialogState {
    @observable showConfirm: boolean = false;
    @observable processing: boolean = false;
    @observable isFinish: boolean = false;
    @observable isError: boolean = false;
    @observable errorMsg: string = "false";

    // @ts-ignore
    @computed get showDialog(): boolean {
        return this.showConfirm
            || this.processing
            || this.isFinish
            || this.isError
    }

    @action
    confirm() {
        this.showConfirm = true;
    }

    @action
    startProcessing() {
        this.showConfirm = false;
        this.processing = true;
    }

    @action
    success() {
        this.isFinish = true;
    }

    @action
    error(errorMsg: string) {
        this.isError = true;
        this.errorMsg = errorMsg;
    }

    @action
    clear() {
        this.showConfirm = false;
        this.processing = false;
        this.isFinish = false;
        this.isError = false;
        this.errorMsg = "";
    }
}
