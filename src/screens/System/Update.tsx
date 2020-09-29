import React, {Component} from 'react';
import UpdateManager from "@common/plugins/UpdateManager";
import {StyleSheet, Text, View} from "react-native";
import Colors from "@constants/Colors";
import Layout from "@constants/Layout";
import * as Progress from 'react-native-progress';

export default class Update extends Component {

    async componentDidMount() {
        await UpdateManager.fetchUpdate();
        UpdateManager.reload();
    }

    render() {
        return (
            <View style={styles.back}>
                <View>
                    <Text style={styles.msg}>Downloading...</Text>
                </View>
                <View style={styles.indicatorWrapper}>
                    <Progress.Bar
                        indeterminate
                        borderColor="transparent"
                        color={Colors.primary}
                        unfilledColor={Colors.primaryLight}
                        width={220}
                        height={3}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: Colors.back,
        width: Layout.window.width,
        height: Layout.window.height,
        alignItems: "center",
        justifyContent: "center"
    },
    indicatorWrapper: {
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    msg: {
        marginBottom: 16,
        fontSize: 18,
        color: Colors.labelFont,
    },
});
