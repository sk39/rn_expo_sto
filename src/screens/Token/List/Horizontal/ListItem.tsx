import React from 'react';
import {observer} from "mobx-react";
import HorizontalListItemContent from "./ListItemContent";
import BaseListItem from "../BaseListItem";
import CardImage from "@common/components/CardImage";

@observer
export default class HorizontalListItem extends BaseListItem {

    render() {
        const {item} = this.props;
        return (
            <CardImage
                image={item.imageSource}
                imageHeight={130}
                onPress={this.onPressed}
                activeAnimation
            >
                <HorizontalListItemContent item={item}/>
            </CardImage>
        );
    }
}


