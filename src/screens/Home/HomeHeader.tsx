import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import ViewUtils from "@common/utils/ViewUtils";
import HomeHeaderContents from "./HomeHeaderContents";
import HomeHeaderImage from "./HomeHeaderImage";

interface Props {
    scroll: Animated.Value
    navigation: Navigation
}

export default class HomeHeader extends Component<Props> {

    render() {
        const {scroll, navigation} = this.props;
        return (
            <View style={styles.header}>
                <HomeHeaderContents navigation={navigation}/>
                <HomeHeaderImage scroll={scroll}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: ViewUtils.getStatusBarHeight(),
        height: 136 + ViewUtils.getPagePaddingTop()
    }
});
