import React from 'react';
import {observer} from "mobx-react";
import CardWithModal from "@common/components/CardWithModal/CardWithModal";
import ListItemContent from "../ListItemContent";
import HorizontalListItemContent from "./ListItemContent";
import BaseListItem from "../BaseListItem";

@observer
export default class HorizontalListItem extends BaseListItem {

    renderCardBody = (modal) => {
        const {item} = this.props;
        if (modal) {
            return <ListItemContent item={item}/>
        } else {
            return <HorizontalListItemContent item={item}/>
        }
    }

    render() {
        const {item} = this.props;
        return (
            <CardWithModal
                image={item.imageSource}
                modal={this.selected}
                onPressed={this.onPressed}
                renderModalHeader={this.renderModalHeader}
                renderModal={this.renderModal}
                renderModalFooter={this.renderModalFooter}
                renderCardBody={this.renderCardBody}
                imageHeight={130}
                bodyHeightLarge={148}
            />
        );
    }
}


