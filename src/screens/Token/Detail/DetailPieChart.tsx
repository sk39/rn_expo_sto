import React, {Component} from 'react'
import {PieChart} from 'react-native-svg-charts'

export default class DetailPieChart extends Component {

    render() {

        const data = [
            {
                key: 1,
                amount: 20,
                svg: {fill: 'rgb(244,162,0)'},
            },
            {
                key: 2,
                amount: 50,
                svg: {fill: 'rgb(244,112,125)'},
            },
            {
                key: 3,
                amount: 40,
                svg: {fill: 'rgb(182,114,244)'}
            },
            {
                key: 4,
                amount: 95,
                svg: {fill: 'rgba(66, 194, 244)'}
            },
        ];

        return (
            <PieChart style={{height: 88}}
                      valueAccessor={({item}) => item.amount}
                      data={data}
                      spacing={0}
                      outerRadius={'80%'}
                      innerRadius={'67'}
            />
        )
    }

}
