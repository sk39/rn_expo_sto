import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Colors from "@constants/Colors";
import * as Progress from 'react-native-progress';

interface Props {
    loading?: boolean,
    indicatorColor?: string,
    indicatorUnfilledColor?: string,
}

export default class BlockLoading extends Component<Props> {

    static defaultProps = {
        loading: false,
        indicatorColor: Colors.primaryColor,
        indicatorUnfilledColor: Colors.primaryColorLight2,
    };

    render() {
        const {loading, indicatorColor, indicatorUnfilledColor} = this.props;
        if (!loading) {
            return null
        }

        return (
            <View style={styles.disablesLayer}>
                <View style={styles.indicatorWrapper}>
                    <Progress.Bar
                        indeterminate
                        borderColor="transparent"
                        color={indicatorColor}
                        unfilledColor={indicatorUnfilledColor}
                        width={220}
                        height={3}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    disablesLayer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    indicatorWrapper: {
        height: 40,
        width: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});
