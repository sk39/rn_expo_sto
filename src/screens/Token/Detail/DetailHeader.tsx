import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native'
import {observer} from "mobx-react";
import Layout from "@constants/Layout";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import BackButton from "@common/components/Button/BackButton";
import IconButton from "@common/components/Button/IconButton";
import StoVM from "@common/model/StoVM";
import ShareHelper from "@common/plugins/ShareHelper";

interface Props {
    item: StoVM,
    onBackPress: () => void;
}

@observer
export default class DetailHeader extends PureComponent<Props> {

    share = () => {
        const {name, symbol, summary} = this.props.item;
        ShareHelper.share("Token", {name, symbol, summary})
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
