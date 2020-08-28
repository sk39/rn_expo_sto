import React, {Component} from 'react'
import {PieChart} from 'react-native-svg-charts'
import BalanceCollection from "./BalanceCollection";
import {observer} from "mobx-react";

interface Props {
    collection: BalanceCollection
}

@observer
export default class BalancePieChart extends Component<Props> {

    render() {
        const {chartData} = this.props.collection
        return (
            <PieChart style={{height: 120}}
                      valueAccessor={({item}) => item.amount}
                      animate
                      data={chartData}
                      spacing={0}
                      outerRadius={'80'}
                      innerRadius={'67'}
            />
        )
    }

}
