import React, {PureComponent} from 'react';
import {Animated, StyleSheet, Text, View,} from 'react-native';
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";

interface Props {
    title: string;
    scroll?: Animated.Value;
    navigation?: Navigation
}

const height = ViewUtils.getFloatPageHeaderHeight();
@observer
export default class FloatPageHeader extends PureComponent<Props> {

    @observable translateY = new Animated.Value(0);
    _translateY = 0;
    beforeScroll = 0;
    listenerId;

    componentDidMount() {
        const {scroll} = this.props;
        if (scroll) {
            this.listenerId = scroll.addListener(this.onScroll)
        }
    }

    componentWillUnmount() {
        if (this.listenerId) {
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
            if (ev.value === 0) {
                this._translateY = 0;
                this.translateY.setValue(this._translateY)
            } else if (scrollToBottom) {
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

        return (
            <React.Fragment>
                <MyStatusBar dark={false}
                             transparent
                             navigation={this.props.navigation}/>
                <View style={styles.statusBar}/>

                <Animated.View style={[styles.container, ani.header]}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                    </View>
                    <View>
                        {this.props.children}
                    </View>
                </Animated.View>

            </React.Fragment>
        );
    }
}


const styles = StyleSheet.create({
    statusBar: {
        height: ViewUtils.getStatusBarHeight(),
    },
    container: {
        height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: ViewUtils.isIphoneX() ? 38 : 24,
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 16,
        flexDirection: "row",
        backgroundColor: Colors.toolBar,
        ...getPlatformElevation(4),
        zIndex: 1,
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

