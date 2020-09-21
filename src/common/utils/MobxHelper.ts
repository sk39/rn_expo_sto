import {autorun, reaction} from "mobx";

export default class MobxHelper {

    disposers: Array<Function> = [];

    reaction(expression: () => any, effect: (arg: any) => void, opts?) {
        this.disposers.push(reaction(expression, effect, opts));
    }

    autorun(view: (r: any) => any, opts?) {
        this.disposers.push(autorun(view, opts));
    }

    onUnmount() {
        this.disposers.map(disposer => disposer())
    }
}
