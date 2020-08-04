import React, {Component} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {Container, Text, View} from 'native-base';
import {TabBarIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import AssetImage from "./AssetImage";
import BalanceList from "./BalanceList";
import CashflowList from "./CashflowList";
import TotalBalance from "./TotalBalance";
import HomeHeader from "./HomeHeader";

@observer
export default class Index extends Component<NavigationProps> {

    private headerRef = React.createRef<HomeHeader>();

    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this)
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

    render() {
        const {navigation} = this.props;
        return (
            <Container style={styles.back}>
                <StatusBar barStyle="light-content" translucent backgroundColor={"rgba(0,0,0,0)"}/>
                <HomeHeader ref={this.headerRef}>
                    <TotalBalance/>
                    <AssetImage/>
                </HomeHeader>
                <View style={styles.body}>
                    <ScrollView style={styles.innerBody} onScroll={this.onScroll}>
                        <View style={styles.areaCard}>
                            <View style={{alignSelf: "center"}}>
                                <Text style={styles.headerText}>Balances</Text>
                            </View>
                            <View style={styles.listWrapper}>
                                <BalanceList navigation={navigation}/>
                            </View>
                        </View>

                        <View style={{height: 12}}/>

                        <View style={styles.areaCard}>
                            <View style={{alignSelf: "center"}}>
                                <Text style={styles.headerText}>History</Text>
                            </View>
                            <View style={[styles.listWrapper]}>
                                <CashflowList navigation={navigation}/>
                            </View>
                        </View>

                        <View style={{height: 24}}/>
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
    innerBody: {
        // flex: 1,
        padding: 24,
        // paddingHorizontal: 16,
        paddingBottom: 56,
    },
    headerText: {
        fontSize: 20,
        color: Colors.primaryColorDark,
        opacity: 0.5,
        fontWeight: "700",
        letterSpacing: 2,
    },
    listWrapper: {
        paddingVertical: 10
    },
    btn: {
        borderRadius: 30,
        borderColor: Colors.primaryColor
    },
    btnText: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primaryColor
    },
    areaCard: {
        padding: 12,
        paddingTop: 6,
    }
});
