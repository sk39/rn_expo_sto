import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import Logo from "@common/components/Image/Logo";
import LoginUserAvatar from "@common/components/Image/LoginUserAvatar";
import RootStore from "@store/RootStore";
import {observer} from "mobx-react";

interface Props {
    navigation: Navigation;
    rootStore: RootStore;
}

@observer
export default class HomePageHeader extends PureComponent<Props> {

    renderContentsAuth() {
        return (
            <View style={styles.auth}>
                <LoginUserAvatar size={36}/>
            </View>
        )
    }

    renderContentsNoAuth() {
        return (
            <View style={styles.noAuth}>
                {/*<Button title={t("btn.sign-in")}*/}
                {/*        raised*/}
                {/*        buttonStyle={styles.authButton}*/}
                {/*        onPress={() => this.props.navigation.navigate("Login")}*/}
                {/*/>*/}
            </View>
        )
    }

    render() {
        const {auth} = this.props.rootStore;
        return (
            <React.Fragment>
                <MyStatusBar dark={false}
                             transparent
                             navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <View style={{paddingRight: 4, marginTop: 4}}>
                            <Logo size={38}/>
                        </View>
                        <Text style={styles.titleText}>Digital Security</Text>
                    </View>
                    {auth.loggedIn ? this.renderContentsAuth() : this.renderContentsNoAuth()}
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: ViewUtils.isIphoneX() ? 84 : 70,
        paddingTop: ViewUtils.isIphoneX() ? 38 : 24,
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 8,
        flexDirection: "row",
        backgroundColor: Colors.toolBar,
        ...getPlatformElevation(4),
        zIndex: 3,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    titleText: {
        color: Colors.primaryDark,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 4,
    },
    authButton: {
        backgroundColor: Colors.btnPrimaryLight,
        height: 34,
        paddingHorizontal: 16,
    },
    auth: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 12,
    },
    noAuth: {
        paddingRight: 6
    }
});

