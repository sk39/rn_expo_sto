import React, {PureComponent} from 'react';
import {Share, StyleSheet, TouchableOpacity, View} from 'react-native'
import {observer} from "mobx-react";
import {STO} from "@common/model/domainModel";
import {Feather} from "@expo/vector-icons";
import Layout from "@constants/Layout";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import BackButton from "@common/components/Button/BackButton";

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
                <MyStatusBar dark={true} transparent/>
                <BackButton onPress={this.onBackPress}/>
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
        paddingTop: ViewUtils.getPagePaddingTop(),
        flexDirection: "row"
    },
    menuIconContainer: {
        marginLeft: "auto",
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
