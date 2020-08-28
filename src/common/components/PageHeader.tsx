import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";

interface Props {
    title: string;
}

export default class PageHeader extends PureComponent<Props> {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 46,
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: "row",
        backgroundColor: Colors.toolBar,
        ...getPlatformElevation(4)
    },
    titleContainer: {
        flex: 1,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.tabDefault,
    },
});

