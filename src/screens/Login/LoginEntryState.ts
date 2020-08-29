import {action, computed, observable} from "mobx";
import InputState from "@common/components/Input/InputState";
import s from "underscore.string";

export default class LoginEntryState {
    @observable initializing: boolean = false;
    @observable processing: boolean = false;
    @observable errorMessage: string = null;
    userId: InputState = new InputState();
    password: InputState = new InputState();

    @computed
    get hasError() {
        return !s.isBlank(this.errorMessage)
    }

    @action
    setUserId(userId) {
        this.userId.setValue(userId);
    }

    @action
    setPassword(password) {
        this.password.setValue(password);
    }

    @action
    validate() {
        this.userId.validateEmpty();
        return this.password.validateEmpty();
    }

    @action
    error(errorMessage: string) {
        this.errorMessage = errorMessage;
    }
}



