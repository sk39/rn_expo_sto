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
    dark?: boolean;
    onBackPress?: () => void
}

export default class PageHeader extends PureComponent<Props> {

    renderBackButton() {
        const {onBackPress, dark} = this.props;
        if (!onBackPress) {
            return null;
        }
        return (
            <View style={{marginLeft: -12}}>
                <BackButton onPress={onBackPress}
                            shadowColor="transparent"
                            color={dark ? "white" : Colors.font}
                />
            </View>
        )
    }

    render() {
        const {noShadow, dense, dark} = this.props;
        const styles = dense ? stylesDense : stylesNormal
        const stylesAppend: any = {
            container: {},
            titleText: {}
        }
        if (!noShadow) {
            stylesAppend.container = {
                ...getPlatformElevation(4)
            }
        }
        if (dark) {
            stylesAppend.container.backgroundColor = Colors.toolBarInverse
            stylesAppend.titleText.color = "white"
        }
        return (
            <React.Fragment>
                <MyStatusBar dark={dark}
                             transparent
                             navigation={this.props.navigation}/>
                <View style={[styles.container, stylesAppend.container]}>
                    {this.renderBackButton()}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.titleText, stylesAppend.titleText]}>
                            {this.props.title}
                        </Text>
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
