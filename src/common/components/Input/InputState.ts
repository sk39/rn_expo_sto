import {observable} from "mobx";

export default class InputState {
    @observable value: string = "";
    @observable errorMsg: string = "";

    isEmpty() {
        return !this.value;
    }

    setValue(value) {
        this.value = value;
        this.errorMsg = null;
    }

    error(errorMsg) {
        this.errorMsg = errorMsg;
    }

    validateEmpty() {
        if (this.isEmpty()) {
            this.error(t("error.input.required"));
            return false;
        }

        return true;
    }
}
