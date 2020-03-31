import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import TranslateAndOpacity from '../animations/TranslateAndOpacity';
import ViewUtils from "@common/utils/ViewUtils";

class Toolbar extends PureComponent<any> {
    render() {
        const {onBackPress} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.statusBar}/>
                <View>
                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity style={styles.backContainer} onPress={onBackPress}>
                            <Ionicons name="ios-arrow-back" size={24} color="white"/>
                            <Text style={styles.titleBackText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuIconContainer} onPress={() => alert("TODO:")}>
                            <Feather name="share" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    toolbarContainer: {
        // height: 22,
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: "row"
    },
    statusBar: {
        height: ViewUtils.isIphoneX() ? 48 : 24, //TODO:
    },
    titleBackText: {
        color: 'white',
        marginLeft: 8,
    },
    backContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 8,
        paddingRight: 44
    },
    menuIconContainer: {
        marginLeft: "auto",
        width: 40,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TranslateAndOpacity(Toolbar);
