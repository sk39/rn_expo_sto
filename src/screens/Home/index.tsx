import React, {Component} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {Button, Container, Icon, Text, View} from 'native-base';
import {TabBarIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import AssetImage from "./AssetImage";
import BalanceList from "./BalanceList";
import DividendList from "./DividendList";
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
                <StatusBar barStyle="light-content"/>
                <HomeHeader ref={this.headerRef}>
                    <TotalBalance/>
                    <AssetImage/>
                </HomeHeader>
                <View style={styles.body}>
                    <ScrollView style={styles.innerBody} onScroll={this.onScroll}>
                        <View style={{padding: 12, paddingTop: 0}}>
                            <Button block bordered iconLeft style={styles.btn}
                                    onPress={() => navigation.navigate("Tokens")}>
                                <Icon name='search' type="Feather" style={{fontSize: 18}}/>
                                <Text style={styles.btnText}>
                                    Explorer Security Tokens
                                </Text>
                            </Button>
                        </View>

                        <View style={{height: 16}}/>

                        <View style={styles.areaCard}>
                            <View style={{alignSelf: "center"}}>
                                <Text style={styles.headerText}>Balances</Text>
                            </View>
                            <View style={styles.listWrapper}>
                                <BalanceList navigation={navigation}/>
                            </View>
                        </View>

                        <View style={{height: 12}}/>

                        <View style={styles.areaCard2}>
                            <View style={{alignSelf: "center"}}>
                                <Text style={styles.headerText}>Dividends</Text>
                            </View>
                            <View style={[styles.listWrapper]}>
                                <DividendList navigation={navigation}/>
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
        borderTopStartRadius: 14,
        borderTopEndRadius: 14,
        ...getPlatformElevation(14)
    },
    innerBody: {
        // flex: 1,
        padding: 24,
        // paddingHorizontal: 16,
        paddingBottom: 56,
    },
    headerText: {
        fontSize: 18,
        color: Colors.primaryColorDark,
        opacity: 0.5,
        fontWeight: "700",
        letterSpacing: 1,
    },
    listWrapper: {
        paddingVertical: 12
    },
    btn: {
        borderRadius: 20
    },
    btnText: {
        fontSize: 14,
    },
    areaCard: {
        // backgroundColor: "rgb(216,224,244)",
        // padding: 12,
        // paddingBottom: 4,
        // borderRadius: 14,
        // ...Platform.select({
        //     ios: {
        //         ...getPlatformElevation(4, "rgb(43,73,255)")
        //     }
        // })
    },
    areaCard2: {
        // backgroundColor: "rgb(224,217,251)",
        padding: 12,
        paddingTop: 6,
        // paddingBottom: 4,
        // borderRadius: 14,
        // ...Platform.select({
        //     ios: {
        //         ...getPlatformElevation(4, "rgb(155,28,255)")
        //     }
        // })
    }
});
