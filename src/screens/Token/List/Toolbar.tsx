import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import translateAndOpacity from '../animations/translateAndOpacity';
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import ViewUtils from "@common/utils/ViewUtils";

class Toolbar extends PureComponent<any, any> {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statusBar}/>
                <View>
                    <View style={styles.toolbarContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Browse Security Tokens</Text>
                        </View>
                        {/*<View style={styles.menuIconContainer}>*/}
                        {/*    <Icon name='search' type="feather" color={Colors.tabDefault} size={24}/>*/}
                        {/*</View>*/}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    toolbarContainer: {
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
    toolbarBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 150,
    },
    statusBar: {
        height: 24,
        backgroundColor: ViewUtils.isIphoneX() ? Colors.toolBar : Colors.toolBarInverse,
    },
    titleBackText: {
        color: 'white',
        marginLeft: 8,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.tabDefault,
    },
    backContainer: {
        flex: 1,
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default translateAndOpacity(Toolbar);
