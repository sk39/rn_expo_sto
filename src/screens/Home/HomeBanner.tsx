import React, {PureComponent} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import Colors from "@constants/Colors";
import ViewUtils from "@common/utils/ViewUtils";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";
import RootStore from "@store/RootStore";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";

interface Props {
    scroll: Animated.Value;
    navigation: Navigation;
    rootStore: RootStore;
}

const height = 38;
@observer
export default class HomeBanner extends PureComponent<Props> {

    static HEIGHT = height;
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
            if (ev.value < 1) {
                this._translateY = 0;
                this.translateY.setValue(this._translateY)
            } else if (scrollToBottom) {
                const diff = ev.value - this.beforeScroll;
                this._translateY = Math.max(this._translateY - diff, -height * 2);
                this.translateY.setValue(this._translateY)
            } else {
                const diff = this.beforeScroll - ev.value;
                this._translateY = Math.min(this._translateY + diff, 0);
                this.translateY.setValue(this._translateY)
            }
            this.beforeScroll = ev.value;
        })
    }

    renderContents() {
        return (
            <View style={styles.auth}>
                <Text style={styles.text}>Welcome Back!</Text>
            </View>
        )
    }

    render() {
        const ani = {
            header: {
                transform: [{
                    translateY: this.translateY.interpolate({
                        inputRange: [-height * 2, 0, height * 2],
                        outputRange: [-40, 0, 40],
                    })
                }],
                opacity: this.props.scroll.interpolate({
                    inputRange: [-81, -80, 0],
                    outputRange: [0.3, 0.3, 1],
                })
            }
        };

        return (
            <React.Fragment>
                <Animated.View style={[styles.container, ani.header]}>
                    {this.renderContents()}
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
        top: ViewUtils.isIphoneX() ? 84 : 70,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingHorizontal: 16,
        flexDirection: "row",
        backgroundColor: Colors.primaryDark,
        ...getPlatformElevation(4),
    },
    text: {
        color: Colors.primaryLight,
        fontSize: 14,
        letterSpacing: 1,
    },
    auth: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    noAuth: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    authButton: {
        height: height,
        paddingHorizontal: 16,
    },
    authButtonText: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: "white",
        fontWeight: "400"
    },
});

