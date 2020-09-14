import React, {Component} from 'react';
import {observer} from "mobx-react";
import CardWithModal from "@common/components/CardWithModal/CardWithModal";
import {STO} from "@common/model/domainModel";
import TokenState from "../../../Token/TokenState";
import DetailContents from "../../../Token/Detail/DetailContents";
import DetailHeader from "../../../Token/Detail/DetailHeader";
import DetailFooter from "../../../Token/Detail/DetailFooter";
import ListItemContent from "../../../Token/ListItem/ListItemContent";


interface Props {
    onPress?: Function;
    tokenState: TokenState;
    item: STO;
}

@observer
export default class ListItem extends Component<Props> {

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

    render() {
        const {item, tokenState} = this.props;
        const {image, localImage} = item;
        let imageSource;
        if (image) {
            imageSource = {uri: image}
        } else {
            imageSource = localImage
        }

        let selected = false;
        if (tokenState && tokenState.selectedItem) {
            selected = item.symbol === tokenState.selectedItem.symbol;
        }

        return (
            <CardWithModal
                image={imageSource}
                modal={selected}
                onPressed={this.onPressed}
                renderModalHeader={this.renderModalHeader}
                renderModal={this.renderModal}
                renderModalFooter={this.renderModalFooter}
                cardHeight={270}
                imageHeight={130}
            >
                <ListItemContent item={item} small={!selected}/>
            </CardWithModal>
        );
    }
}
