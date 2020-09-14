import React, {Component} from 'react';
import {Animated, Platform, RefreshControl, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {Container, View} from 'native-base';
import {TabBarIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import Balance from "./Balance";
import HomeHeader from "./HomeHeader";
import {observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import PickupTokens from "./PickupTokens";
import Performance from "./Performance";
import {Host} from "react-native-portalize";

@observer
export default class Home extends Component<NavigationProps> {

    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            tabBarVisible: state.params ? state.params.tabBarVisible : true,
            tabBarLabel: t("navigation.tab.Home"),
            tabBarIcon: ({focused}) => (
                <TabBarIcon screenName="Home" focused={focused}/>
            )
        }
    }


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
            <Host>
                <Container style={styles.back}>
                    <MyStatusBar dark={false} transparent navigation={navigation}/>
                    <HomeHeader scroll={this.scroll} navigation={navigation}/>
                    <View style={styles.bodyWrapper}>
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

                                <View style={{height: 14}}/>
                                <View style={styles.areaCard}>
                                    <Balance navigation={navigation}
                                             setRefreshListener={this.setRefreshListener}/>
                                </View>

                                <View style={{height: 28}}/>
                                <View style={styles.areaCard}>
                                    <PickupTokens navigation={navigation}
                                                  setRefreshListener={this.setRefreshListener}/>
                                </View>

                                <View style={{height: 18}}/>
                                <View style={styles.areaCard}>
                                    <Performance navigation={navigation}
                                                 setRefreshListener={this.setRefreshListener}/>
                                </View>
                            </Animated.ScrollView>
                        </View>
                    </View>
                </Container>
            </Host>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.back2,
        flexDirection: "column",
    },
    bodyWrapper: {
        flex: 1,
        ...Platform.select({
            ios: {
                ...getPlatformElevation(4)
            }
        })
    },
    body: {
        backgroundColor: Colors.back,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        overflow: "hidden",
        ...Platform.select({
            android: {
                ...getPlatformElevation(14)
            }
        })
    },
    areaCard: {
        // padding: 26,
        // paddingVertical: 12,
        // paddingTop: 16,
    }
});
