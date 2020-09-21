import React from 'react';
import {Animated, Platform, StyleSheet, Text,} from 'react-native';
import Colors from "@constants/Colors";
import ViewUtils from "@common/utils/ViewUtils";
import {Tabs, View} from "native-base";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";

interface Props {
    title: string;
    scroll?: Animated.Value;
    navigation?: Navigation
}

const height = ViewUtils.getFloatPageHeaderTabHeight();

@observer
export default class FloatPageHeaderTab extends Tabs {

    @observable translateY = new Animated.Value(0);
    _translateY = 0;
    beforeScroll = 0;
    listenerId;

    componentDidMount() {
        // @ts-ignore
        const {scroll} = this.props;
        if (scroll && Platform.OS === "android") {
            this.listenerId = scroll.addListener(this.onScroll)
        }
    }

    componentWillUnmount() {
        if (this.listenerId) {
            // @ts-ignore
            const {scroll} = this.props;
            scroll.removeListener(this.listenerId)
        }
    }

    onScroll = (ev) => {
        const offset = ev.value - this.beforeScroll;
        if (offset === 0) {
            return;
        }

        runInAction(() => {
            const scrollToBottom = offset > 0;
            if (scrollToBottom) {
                const diff = ev.value - this.beforeScroll;
                this._translateY = Math.max(this._translateY - diff, -height);
                this.translateY.setValue(this._translateY)
            } else {
                const diff = this.beforeScroll - ev.value;
                this._translateY = Math.min(this._translateY + diff, 0);
                this.translateY.setValue(this._translateY)
            }
            this.beforeScroll = ev.value;
        })
    }

    render() {
        const ani = {
            header: {
                transform: [{translateY: this.translateY}],
            }
        };

        const _tabsThis: any = this;
        const tabBarProps: any = {
            goToPage: _tabsThis.goToPage,
            tabs: _tabsThis._children().map(child => child.props.heading),
            tabStyle: _tabsThis._children().map(child => child.props.tabStyle),
            activeTabStyle: _tabsThis._children().map(child => child.props.activeTabStyle),
            textStyle: _tabsThis._children().map(child => child.props.textStyle),
            activeTextStyle: _tabsThis._children().map(
                child => child.props.activeTextStyle
            ),
            tabHeaderStyle: {
                borderBottomWidth: 0,
                borderTopWidth: 0
            },
            disabled: _tabsThis._children().map(child => child.props.disabled),
            accessible: _tabsThis._children().map(child => child.props.accessible == false ? false : true || true),
            accessibilityLabel: _tabsThis._children().map(child => child.props.accessibilityLabel),
            activeTab: this.state.currentPage,
            scrollValue: this.state.scrollValue,
            containerWidth: this.state.containerWidth
        };

        if (this.props.tabBarBackgroundColor) {
            tabBarProps.backgroundColor = this.props.tabBarBackgroundColor;
        }
        if (this.props.tabBarActiveTextColor) {
            tabBarProps.activeTextColor = this.props.tabBarActiveTextColor;
        }
        if (this.props.tabBarInactiveTextColor) {
            tabBarProps.inactiveTextColor = this.props.tabBarInactiveTextColor;
        }
        if (this.props.tabBarTextStyle) {
            tabBarProps.textStyle = this.props.tabBarTextStyle;
        }
        if (this.props.tabBarUnderlineStyle) {
            tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle;
        }
        if (this.props.tabContainerStyle) {
            tabBarProps.tabContainerStyle = this.props.tabContainerStyle;
        }

        return (
            <View
                style={[styles.containerBase, this.props.style]}
                onLayout={_tabsThis._handleLayout}
            >
                <View style={styles.statusBar}/>
                <Animated.View style={[styles.container, ani.header]}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{_tabsThis.props.title}</Text>
                    </View>
                    {_tabsThis.renderTabBar(tabBarProps)}
                </Animated.View>
                {_tabsThis.renderScrollableContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerBase: {
        flex: 1,
        backgroundColor: Colors.toolBar
    },
    statusBar: {
        height: ViewUtils.getStatusBarHeight(),
    },
    container: {
        height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        justifyContent: "flex-end",
        backgroundColor: Colors.toolBar,
        paddingTop: ViewUtils.isIphoneX() ? 38 : 30,
        zIndex: 1,
    },
    titleContainer: {
        paddingLeft: 14,
        paddingBottom: 8,
    },
    titleText: {
        fontSize: 16,
        color: Colors.tabDefault,
    }
});

