import {observable} from "mobx";
import InputState from "./InputState";

export default class InputNumberState extends InputState {
    @observable unit: string;

    setUnit(unit) {
        this.unit = unit;
    }
}
