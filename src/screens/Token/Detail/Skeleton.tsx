import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native'
import Colors from "@constants/Colors";

interface Props {
    line: number,
}

export default class Skeleton extends PureComponent<Props> {

    render() {
        let borders = [];
        for (let i = 0; i < this.props.line - 1; i++) {
            borders.push(<View key={i} style={styles.border}/>)
        }
        borders.push(<View key="last" style={[styles.border, {width: "62%"}]}/>)
        return (
            <View style={styles.container}>
                {borders}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        padding: 8,
    },
    border: {
        height: 12,
        marginVertical: 5,
        borderRadius: 12,
        backgroundColor: Colors.labelFontThin,
        opacity: 0.2
    }
});
