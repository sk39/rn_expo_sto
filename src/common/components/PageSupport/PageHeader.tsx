import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";

interface Props {
    title: string;
    navigation?: Navigation
}

export default class PageHeader extends PureComponent<Props> {

    render() {
        return (
            <React.Fragment>
                <MyStatusBar dark={false}
                             transparent
                             navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                    </View>
                    <View>
                        {this.props.children}
                    </View>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: ViewUtils.isIphoneX() ? 84 : 70,
        paddingTop: ViewUtils.isIphoneX() ? 38 : 24,
        alignItems: 'center',
        justifyContent: "space-between",
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
    }
});

