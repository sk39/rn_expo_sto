import React, {Component} from 'react';
import {Platform, RefreshControl, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {Container, View} from 'native-base';
import {TabBarIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import AssetImage from "./AssetImage";
import BalanceList from "./BalanceList";
import CashflowList from "./CashflowList";
import HomeHeaderContents from "./HomeHeaderContents";
import HomeHeader from "./HomeHeader";
import {RootStoreProps} from "@store/RootStoreProvider";
import {observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";

@observer
export default class Home extends Component<NavigationProps & RootStoreProps> {

    private headerRef = React.createRef<HomeHeader>();

    @observable refreshing = false;

    refreshListeners = [];

    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.setRefreshListener = this.setRefreshListener.bind(this);
    }

    static navigationOptions = {
        tabBarLabel: "Home",
        tabBarIcon: ({focused}) => (
            <TabBarIcon screenName="Home" focused={focused}/>
        )
    };

    onScroll(e) {
        if (Platform.OS === 'android') {
            const scrollY = e.nativeEvent.contentOffset.y;
            if (this.headerRef.current)
                this.headerRef.current.onScroll(scrollY);
        }
    }

    setRefreshListener(listener: () => void) {
        this.refreshListeners.push(listener)
    }

    async onRefresh() {
        this.refreshing = true;
        this.refreshListeners.forEach(listener => listener())
        await ViewUtils.sleep(1000);
        this.refreshing = false;
    }

    render() {
        const {navigation} = this.props;

        return (
            <Container style={styles.back}>
                <StatusBar barStyle="light-content" translucent backgroundColor={"rgba(0,0,0,0)"}/>
                <HomeHeader ref={this.headerRef}>
                    <HomeHeaderContents navigation={navigation}/>
                    <AssetImage/>
                </HomeHeader>
                <View style={styles.body}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.refreshing} onRefresh={this.onRefresh}/>
                        }
                        onScroll={this.onScroll}>
                        <View style={styles.areaCard}>
                            <BalanceList navigation={navigation}
                                         setRefreshListener={this.setRefreshListener}/>
                        </View>

                        <View style={styles.splitterWrapper}>
                            <View style={styles.splitter}/>
                        </View>

                        <View style={styles.areaCard}>
                            <CashflowList navigation={navigation}
                                          setRefreshListener={this.setRefreshListener}/>
                        </View>
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.toolBarInverse,
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
    splitterWrapper: {
        paddingVertical: 8,
    },
    splitter: {
        width: "100%",
        height: 6,
        borderRadius: 12,
        backgroundColor: "#c9c9d2",
        opacity: 0.16
    }
});
