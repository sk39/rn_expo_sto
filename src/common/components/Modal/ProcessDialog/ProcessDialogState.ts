import {action, computed, observable} from "mobx";

export default class ProcessDialogState {

    @observable state: "confirm" | "processing" | "success" | "error" = null;
    @observable message: string = "";

    @computed get showDialog(): boolean {
        return !s.isBlank(this.state)
    }

    @action
    confirm() {
        this.state = "confirm";
    }

    @action
    startProcessing() {
        this.state = "processing"
    }

    @action
    success(message?: string) {
        this.state = "success"
        this.message = message;
    }

    @action
    error(errorMessage: string) {
        this.state = "error"
        this.message = errorMessage;
    }

    @action
    clear() {
        this.state = null;
        this.message = "";
    }
}
