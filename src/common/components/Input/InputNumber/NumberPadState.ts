import InputNumberState from "@common/components/Input/InputNumberState";
import {action, computed, observable} from "mobx";

export default class NumberPadState {

    @observable value: string;
    inputState: InputNumberState;

    constructor(inputState: InputNumberState) {
        this.inputState = inputState
        this.value = this.inputState.value || "";
    }

    @action
    start() {
        this.value = this.inputState.value;
    }

    @action
    setValue(val) {
        this.value = val;
    }

    @action
    enter() {
        //TODO:validate max, min
        this.inputState.setValue(this.value);
        return true;
    }

    @action
    append(num: number) {
        if (this.value === "0") {
            this.value = String(num);
        } else {
            this.value += String(num);
        }
    }

    @computed
    get canAppend() {
        const {maxLength, decimals} = this.inputState;
        if (this.value.length >= maxLength) {
            return false;
        }

        if (decimals) {
            const arr = this.value.split(".")
            if (arr[1] && arr[1].length >= decimals) {
                return false;
            }
        }

        return true;
    }

    @action
    dot() {
        if (s.isBlank(this.value)) {
            this.value = "0."
        } else {
            this.value += "."
        }
    }

    @computed
    get canDot() {
        if (!this.inputState.decimals) {
            return false;
        }

        return !s.include(this.value, ".")
    }

    @action
    remove() {
        this.value = this.value.slice(0, -1);
    }

    @computed
    get canRemove() {
        return !s.isBlank(this.value)
    }

    @action
    clear() {
        this.value = ""
    }
}
