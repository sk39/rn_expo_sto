import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import BackButton from "@common/components/Button/BackButton";

interface Props {
    title: string;
    navigation?: Navigation
    noShadow?: boolean;
    dense?: boolean;
    onBackPress?: () => void
}

export default class PageHeader extends PureComponent<Props> {

    renderBackButton() {
        const {onBackPress} = this.props;
        if (!onBackPress) {
            return null;
        }
        return (
            <View style={{marginLeft: -12}}>
                <BackButton onPress={onBackPress}
                            shadowColor="transparent"
                            color={Colors.font}
                />
            </View>
        )
    }

    render() {
        const {noShadow, dense} = this.props;
        const styles = dense ? stylesDense : stylesNormal
        return (
            <React.Fragment>
                <MyStatusBar dark={false}
                             transparent
                             navigation={this.props.navigation}/>
                <View style={[styles.container, (noShadow ? {} : {...getPlatformElevation(4)})]}>
                    {this.renderBackButton()}
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

const stylesNormal = StyleSheet.create({
    container: {
        height: ViewUtils.isIphoneX() ? 84 : 70,
        paddingTop: ViewUtils.isIphoneX() ? 38 : 24,
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 16,
        flexDirection: "row",
        backgroundColor: Colors.toolBar,
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

const stylesDense = StyleSheet.create({
    container: {
        height: ViewUtils.isIphoneX() ? 78 : 62,
        paddingBottom: 10,
        alignItems: 'flex-end',
        justifyContent: "space-between",
        paddingHorizontal: 16,
        flexDirection: "row",
        backgroundColor: Colors.toolBar,
    },
    titleContainer: {
        flex: 1,
    },
    titleText: {
        fontSize: 14,
        letterSpacing: 1,
        fontWeight: '700',
        color: Colors.tabDefault,
    }
});
