import React from 'react';
import ListItemContent from './ListItemContent';
import {observer} from "mobx-react";
import {CardWithModal} from "@common/components/CardWithModal";
import BaseListItem from "./BaseListItem";

@observer
export default class ListItem extends BaseListItem {

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
            >
                <ListItemContent item={item}/>
            </CardWithModal>
        );
    }
}
