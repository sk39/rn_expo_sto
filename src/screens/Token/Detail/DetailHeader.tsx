import React, {PureComponent} from 'react';
import {Share, StyleSheet, View} from 'react-native'
import {observer} from "mobx-react";
import {STO} from "@common/model/domainModel";
import Layout from "@constants/Layout";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import BackButton from "@common/components/Button/BackButton";
import IconButton from "@common/components/Button/IconButton";

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
                <IconButton name="share-2"
                            type="feather"
                            containerStyle={styles.shareContainer}
                            onPress={this.share}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: Layout.window.width,
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingTop: ViewUtils.getPagePaddingTop(),
        flexDirection: "row",
    },
    shareContainer: {
        marginLeft: "auto",
    }
});
