import React from 'react';
import {observer} from "mobx-react";
import BaseHorizontalTokens from "./BaseHorizontalTokens";
import {computed} from "mobx";

@observer
export default class NewestTokens extends BaseHorizontalTokens {

    title = "Newest";

    @computed
    get list() {
        const {list} = this.tokenState.stoStore;
        return list.slice(-4).reverse();
    }
}
