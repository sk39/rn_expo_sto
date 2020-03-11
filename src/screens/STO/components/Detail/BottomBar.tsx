import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Button';
import Colors from "../../../../constants/Colors";

interface Props {
    isHidden: boolean;
}

export default class BottomButtons extends PureComponent<Props> {
    render() {
        const {isHidden} = this.props;

        return (
            <View style={styles.container}>
                <Button
                    isHidden={isHidden}
                    title="Invest"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        marginHorizontal: 0,
        flex: 1
    },
    flexContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

