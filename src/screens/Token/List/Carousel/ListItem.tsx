import React from 'react';
import {observer} from "mobx-react";
import CardWithModal from "@common/components/CardWithModal/CardWithModal";
import ListItemContent from "../ListItemContent";
import CarouselListItemContent from "./ListItemContent";
import BaseListItem from "../BaseListItem";
import Layout from "@constants/Layout";

@observer
export default class CarouselListItem extends BaseListItem {

    renderCardBody = (modal) => {
        const {item} = this.props;
        if (modal) {
            return <ListItemContent item={item}/>
        } else {
            return <CarouselListItemContent item={item}/>
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
                imageHeight={230}
                imageHeightLarge={Layout.card.imageHeightLarge}
                bodyHeight={0}
                bodyHeightLarge={154}
                activeAnimation={false}
            />
        );
    }
}


