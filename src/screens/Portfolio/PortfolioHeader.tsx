import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import ViewUtils from "@common/utils/ViewUtils";
import PortfolioHeaderContents from "./PortfolioHeaderContents";

interface Props {
    scroll: Animated.Value
    navigation: Navigation
}

export default class PortfolioHeader extends Component<Props> {

    render() {
        const {scroll, navigation} = this.props;
        return (
            <View style={styles.header}>
                <PortfolioHeaderContents navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: ViewUtils.getStatusBarHeight(),
        height: 92 + ViewUtils.getPagePaddingTop(),
    }
});
