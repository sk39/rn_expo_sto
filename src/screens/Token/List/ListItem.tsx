import React from 'react';
import ListItemContent from './ListItemContent';
import {observer} from "mobx-react";
import BaseListItem from "./BaseListItem";
import CardImage from "@common/components/CardImage";
import {StyleSheet, View} from "react-native";
import STOStatusLabel from "@common/components/Label/STOStatusLabel";

@observer
export default class ListItem extends BaseListItem {

    renderStatus() {
        const {item, showStatus} = this.props;
        if (!showStatus) {
            return;
        }

        return (
            <View style={styles.statusArea}>
                <STOStatusLabel item={item}/>
            </View>
        )
    }

    render() {
        const {item} = this.props;
        return (
            <View style={{position: "relative"}}>
                <CardImage
                    image={item.imageSource}
                    imageHeight={200}
                    onPress={this.onPressed}
                    activeAnimation
                >
                    <ListItemContent item={item}/>
                    {this.renderStatus()}
                </CardImage>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusArea: {
        position: "absolute",
        right: 0,
        left: 0,
        top: -23,
        marginHorizontal: "auto"

    }
});
