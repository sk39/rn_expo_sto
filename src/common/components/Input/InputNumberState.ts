import {observable} from "mobx";
import InputState from "./InputState";

export default class InputNumberState extends InputState {
    @observable unit: string;

    decimals: number = 0;
    max?: number;
    min?: number;
    maxLength: number = 10;

    setUnit(unit) {
        this.unit = unit;
    }
}
