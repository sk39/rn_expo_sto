import React, {PureComponent} from 'react';
import {Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {observer} from "mobx-react";
import {STO} from "@common/model/domainModel";
import {Feather, Ionicons} from "@expo/vector-icons";
import Layout from "@constants/Layout";

interface Props {
    item: STO,
    onBackPress: () => void;
}

@observer
export default class DetailHeader extends PureComponent<Props> {

    share = async () => {
        try {
            const {name, symbol, description, raise} = this.props.item;
            const result = await Share.share({
                message: JSON.stringify({name, symbol, description, raise},),
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    onBackPress = () => {
        const {onBackPress} = this.props;
        onBackPress();
    }

    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.backContainer} onPress={this.onBackPress}>
                    <Ionicons name="ios-arrow-back" size={22} color="white"/>
                    <Text style={styles.titleBackText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuIconContainer} onPress={this.share}>
                    <Feather name="share-2" size={22} color="white"/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: Layout.window.width,
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: "row"
    },
    titleBackText: {
        color: 'white',
        marginLeft: 8,
    },
    backContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 8,
        paddingRight: 44,
    },
    menuIconContainer: {
        marginLeft: "auto",
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
