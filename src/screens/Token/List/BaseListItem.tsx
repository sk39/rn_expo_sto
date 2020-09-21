import React, {Component} from 'react';
import TokenState from "../TokenState";
import DetailContents from "../Detail/DetailContents";
import DetailHeader from "../Detail/DetailHeader";
import DetailFooter from "../Detail/DetailFooter";
import {computed} from "mobx";
import StoVM from "@common/model/StoVM";

interface Props {
    onPress?: Function;
    tokenState: TokenState;
    item: StoVM;
}

export default class BaseListItem extends Component<Props> {

    @computed
    get selected() {
        const {item, tokenState} = this.props;
        if (tokenState && tokenState.selectedItem) {
            return item.symbol === tokenState.selectedItem.symbol;
        }

        return false;
    }

    onPressed = () => {
        const {onPress, item} = this.props;
        if (onPress) {
            onPress(item);
        }
    };

    onBack = () => {
        const {onPress} = this.props;
        if (onPress) {
            onPress(null);
        }
    };

    renderModal = () => {
        return (
            <DetailContents selectedItem={this.props.item}/>
        )
    }

    renderModalHeader = () => {
        return (
            <DetailHeader item={this.props.item}
                          onBackPress={this.onBack}/>
        )
    }

    renderModalFooter = () => {
        return (
            <DetailFooter selectedItem={this.props.item}
                          tokenState={this.props.tokenState}
                          onBackPress={this.onBack}
                          hardwareBackPress/>
        )
    }
}
