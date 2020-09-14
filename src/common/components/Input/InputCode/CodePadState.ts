import {action} from "mobx";
import NumberPadState from "@common/components/Input/InputNumber/NumberPadState";

export default class CodePadState extends NumberPadState {

    @action
    append(num: number) {
        this.value += String(num);
    }
}
