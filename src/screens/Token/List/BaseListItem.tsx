import React, {Component} from 'react';
import TokenState from "../TokenState";
import StoVM from "@common/model/StoVM";

interface Props {
    onPress?: Function;
    tokenState: TokenState;
    item: StoVM;
    showStatus?: boolean;
}

export default class BaseListItem extends Component<Props> {

    // @computed
    // get selected() {
    //     const {item, tokenState} = this.props;
    //     if (tokenState && tokenState.selectedItem) {
    //         return item.symbol === tokenState.selectedItem.symbol;
    //     }
    //
    //     return false;
    // }

    onPressed = () => {
        const {onPress, item} = this.props;
        if (onPress) {
            onPress(item);
        }
    };
}
