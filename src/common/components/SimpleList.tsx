import React, {Component} from "react";
import {View} from "react-native";
import _ from "lodash";

interface Props {
    data?: any[],
    renderItem: (arg: { item: any, index?: number }) => React.ReactElement | null;
}

export default class SimpleList extends Component<Props> {

    render() {
        const {data, renderItem} = this.props;
        return (
            <View>
                {_.map(data, (item, index) => renderItem({item, index}))}
            </View>
        )
    }
}

