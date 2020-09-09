import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Colors from "@constants/Colors";
import * as Progress from 'react-native-progress';

interface Props {
    loading?: boolean,
    indicatorColor?: string,
    indicatorUnfilledColor?: string,
    disablesLayerColor?: string,
}

export default class BlockLoading extends Component<Props> {

    static defaultProps = {
        loading: false,
        indicatorColor: Colors.primary,
        indicatorUnfilledColor: Colors.primaryLight,
        disablesLayerColor: "rgba(255,255,255,0)"
    };

    render() {
        const {loading, indicatorColor, indicatorUnfilledColor, disablesLayerColor} = this.props;
        if (!loading) {
            return null
        }

        return (
            <View style={[styles.disablesLayer, {backgroundColor: disablesLayerColor}]}>
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
        flex: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});
