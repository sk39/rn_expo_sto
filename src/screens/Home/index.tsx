import React, {Component, RefObject} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, View} from 'native-base';
import {TabBarIcon} from "@common/components/ScreenIcon";
import Colors from "@constants/Colors";
import Balance from "./Balance";
import {observable} from "mobx";
import Performance from "./Performance";
import {Host} from "react-native-portalize";
import MyScrollView from "@common/components/PageSupport/MyScrollView";
import {RootStoreProps} from "@store/RootStoreProvider";
import NewestTokens from "./HorizontalTokens/NewestTokens";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import PickupTokens from "./HorizontalTokens/PickupTokens";
import HomePageHeader from "./HomePageHeader";
import HomeBanner from "./HomeBanner";
import TokensCarousel from "./TokensCarousel";
import MobxHelper from "@common/utils/MobxHelper";

@inject("rootStore")
@observer
export default class Home extends Component<NavigationProps & RootStoreProps> {

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

    carouselRef: RefObject<TokensCarousel>;
    balanceRef: RefObject<Balance>;
    performanceRef: RefObject<Performance>;
    mobxHelper = new MobxHelper()
    firstFocus: boolean = true;

    constructor(props) {
        super(props);
        this.carouselRef = React.createRef();
        this.balanceRef = React.createRef();
        this.performanceRef = React.createRef();
    }

    componentDidMount() {
        const {auth} = this.props.rootStore;
        this.mobxHelper.reaction(
            () => auth.loggedIn,
            (loggedIn) => this.loadData(loggedIn)
        )
        this.props.navigation.addListener(
            'didFocus',
            () => {
                if (this.firstFocus) {
                    this.firstFocus = false;
                    return;
                }
                if (this.carouselRef.current)
                    this.carouselRef.current.reset()
                this.loadSto()
            }
        );
        this.props.navigation.addListener(
            'didBlur',
            () => {
                if (this.carouselRef.current)
                    this.carouselRef.current.resetAndStop()
            }
        );

        this.loadData(auth.loggedIn);
    }

    componentWillUnmount() {
        this.mobxHelper.onUnmount()
    }

    loadSto = async (force?) => {
        await this.props.rootStore.sto.loadData(!force);
    }

    loadData = async (loggedIn) => {
        await this.balanceRef.current.loadData(loggedIn);
        await this.performanceRef.current.loadData(loggedIn);
    }

    onRefresh = async () => {
        const {auth} = this.props.rootStore;
        await this.loadSto(true);
        await this.loadData(auth.loggedIn);
    }

    render() {
        const {navigation, rootStore} = this.props;
        return (
            <Host>
                <Container style={styles.back}>
                    <HomePageHeader navigation={navigation} rootStore={rootStore}/>
                    <HomeBanner scroll={this.scroll}
                                navigation={navigation}
                                rootStore={rootStore}
                    />
                    <View style={styles.body}>
                        <MyScrollView
                            onRefresh={this.onRefresh}
                            scroll={this.scroll}
                        >
                            <View style={{height: HomeBanner.HEIGHT - 1}}/>
                            <TokensCarousel
                                ref={this.carouselRef}
                                navigation={navigation}
                                rootStore={rootStore}/>
                            <View style={styles.areaCard}>
                                <PickupTokens
                                    navigation={navigation}
                                    rootStore={rootStore}/>
                                <View style={{height: 12}}/>
                                <NewestTokens
                                    navigation={navigation}
                                    rootStore={rootStore}/>
                            </View>
                            <View style={styles.areaCard}>
                                <Balance
                                    ref={this.balanceRef}
                                    navigation={navigation}
                                    rootStore={rootStore}/>
                                <View style={{height: 12}}/>
                            </View>
                            <View style={styles.areaCard}>
                                <Performance
                                    ref={this.performanceRef}
                                    navigation={navigation}
                                    rootStore={rootStore}/>
                            </View>
                            <View style={{height: 72}}/>
                        </MyScrollView>
                    </View>
                </Container>
            </Host>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.back,
    },
    body: {
        backgroundColor: Colors.back,
    },
    areaCard: {
        paddingTop: 6,
        paddingBottom: 16,
        marginBottom: 8,
        backgroundColor: Colors.back,
        ...getPlatformElevation(2)
    }
});
