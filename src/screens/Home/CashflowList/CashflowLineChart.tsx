import React, {Component} from 'react'
import {Defs, LinearGradient, Stop} from 'react-native-svg'
import {LineChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape';
import CashflowCollection from "./CashflowCollection";

interface Props {
    collection: CashflowCollection
}

export default class CashflowLineChart extends Component<Props, any> {

    render() {
        const {chartData} = this.props.collection
        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(66,116,244)'}/>
                    <Stop offset={'100%'} stopColor={'rgb(203,38,178)'}/>
                </LinearGradient>
            </Defs>
        );

        return (
            <LineChart
                style={{height: 66}}
                data={chartData}
                animate
                curve={shape.curveNatural}
                contentInset={{top: 6, bottom: 6}}
                svg={{
                    strokeWidth: 3,
                    stroke: 'url(#gradient)',
                }}
            >
                <Gradient/>
            </LineChart>
        )
    }

}
