import React, {PureComponent} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import Colors from "@constants/Colors";

interface Props {
    line: number,
    barStyle?: StyleProp<ViewStyle>
}

export default class Skeleton extends PureComponent<Props> {

    render() {
        const {line, barStyle} = this.props;
        let borders = [];
        for (let i = 0; i < line - 1; i++) {
            borders.push(<View key={i} style={[styles.bar, barStyle]}/>)
        }
        borders.push(<View key="last" style={[styles.bar, barStyle, {width: "62%"}]}/>)
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
        padding: 8,
    },
    bar: {
        height: 12,
        marginVertical: 5,
        borderRadius: 12,
        backgroundColor: Colors.labelFontThin,
        opacity: 0.2
    }
});
