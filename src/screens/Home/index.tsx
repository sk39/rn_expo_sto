import React, {Component} from 'react';
import {Animated, RefreshControl, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {Container, View} from 'native-base';
import {TabBarIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import Balance from "./Balance";
import Cashflow from "./Cashflow";
import HomeHeader from "./HomeHeader";
import {observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";

@observer
export default class Home extends Component<NavigationProps> {

    static navigationOptions = {
        tabBarLabel: t("navigation.tab.Home"),
        tabBarIcon: ({focused}) => (
            <TabBarIcon screenName="Home" focused={focused}/>
        )
    };

    @observable scroll = new Animated.Value(0);
    @observable refreshing = false;
    refreshListeners = [];

    setRefreshListener = (listener: () => void) => {
        this.refreshListeners.push(listener)
    }

    onRefresh = async () => {
        this.refreshing = true;
        this.refreshListeners.forEach(listener => listener())
        await ViewUtils.sleep(800);
        this.refreshing = false;
    }

    render() {
        const {navigation} = this.props;

        return (
            <Container style={styles.back}>
                <MyStatusBar dark={false} transparent navigation={navigation}/>
                <HomeHeader scroll={this.scroll} navigation={navigation}/>
                <View style={styles.body}>
                    <Animated.ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.refreshing}
                                            onRefresh={this.onRefresh}/>
                        }
                        scrollEventThrottle={16}
                        onScroll={
                            Animated.event([
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.scroll,
                                            },
                                        },
                                    },
                                ],
                                {useNativeDriver: true})
                        }>
                        <View style={styles.areaCard}>
                            <Balance navigation={navigation}
                                     setRefreshListener={this.setRefreshListener}/>
                        </View>

                        <View style={styles.splitter}/>

                        <View style={styles.areaCard}>
                            <Cashflow navigation={navigation}
                                      setRefreshListener={this.setRefreshListener}/>
                        </View>
                    </Animated.ScrollView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.backColor2,
        flexDirection: "column",
    },
    body: {
        backgroundColor: Colors.backColor,
        flex: 1,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        ...getPlatformElevation(14)
    },
    areaCard: {
        padding: 26,
        paddingVertical: 20
    },
    splitter: {
        width: "100%",
        height: 8,
    }
});
