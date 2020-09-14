import React, {Component} from 'react'
import {PieChart} from 'react-native-svg-charts'
import BalanceState from "./BalanceState";
import {observer} from "mobx-react";

interface Props {
    balanceState: BalanceState
}

@observer
export default class BalancePieChart extends Component<Props> {

    render() {
        const {chartData} = this.props.balanceState
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
