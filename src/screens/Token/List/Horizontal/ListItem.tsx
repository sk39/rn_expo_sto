import React from 'react';
import {observer} from "mobx-react";
import HorizontalListItemContent from "./ListItemContent";
import BaseListItem from "../BaseListItem";
import CardImage from "@common/components/CardImage";
import Layout from "@constants/Layout";

@observer
export default class HorizontalListItem extends BaseListItem {

    render() {
        const {item} = this.props;
        return (
            <CardImage
                image={item.imageSource}
                imageHeight={Layout.card.horizontalImageHeight}
                onPress={this.onPressed}
                activeAnimation
            >
                <HorizontalListItemContent item={item}/>
            </CardImage>
        );
    }
}


