import React, {PureComponent} from 'react';
import {Animated, StyleSheet, View} from 'react-native'
import {Toolbar} from '../Detail/Toolbar';
import {ListItem} from "../ListItem"
import Colors from "@constants/Colors";
import {computed, observable} from "mobx";
import {inject, observer} from "mobx-react";
import Invest from "../Invest";
import PageBottomBtn from "@common/components/PageSupport/PageBottomBtn";
import TokenState from "../TokenState";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import DetailContents from "../Detail/DetailContents";
import {RootStoreProps} from "@store/RootStoreProvider";

@inject('rootStore')
@observer
export default class DirectDetail extends PureComponent<NavigationProps & RootStoreProps> {

    symbol: string;
    tokenState: TokenState;

    @observable scrollY = new Animated.Value(0);
    @observable isWaitSignIn = false;

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.startInvest = this.startInvest.bind(this);
        this.tokenState = new TokenState(props.navigation, props.rootStore);
        this.symbol = this.props.navigation.state.params.symbol;
        this.loadData().then();
    }

    @computed
    get loggedIn() {
        const {tokenState} = this;
        return tokenState.loggedIn;
    }

    async loadData() {
        const item = await this.tokenState.get(this.symbol);
        this.tokenState.selectItem(item);
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                if (this.loggedIn && this.isWaitSignIn) {
                    this.startInvest();
                }
                this.isWaitSignIn = false;
            }
        );
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
    }

    startInvest() {
        if (!this.loggedIn) {
            this.isWaitSignIn = true;
            this.props.navigation.navigate("Login");
            return;
        }

        const {selectedItem} = this.tokenState;
        this.props.navigation.navigate("InvestToken", {symbol: selectedItem.symbol})
    }

    render() {
        const {selectedItem} = this.tokenState;
        if (!selectedItem) {
            return (
                <View style={styles.container}>
                    <BlockLoading loading/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Toolbar isHidden={false}
                         item={selectedItem}
                         onBackPress={this.handleBackButtonClick}/>
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={
                        Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: this.scrollY,
                                        },
                                    },
                                },
                            ],
                            {useNativeDriver: true})
                    }
                >
                    <View>
                        <ListItem
                            item={selectedItem}
                            animateOnDidMount={false}
                            detailMode={true}
                            phase={"phase-x"}
                            scrollY={this.scrollY}
                            isHidden={false}
                            isDetail={true}
                        />
                    </View>
                    <DetailContents selectedItem={selectedItem}/>
                </Animated.ScrollView>
                <PageBottomBtn
                    onPress={this.startInvest}
                    text={this.loggedIn ? "Invest" : "Sign In & Invest"}
                    loading={false}
                    animation
                    animationDelay={500}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        flex: 1,
    },
    itemContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    rowContainer: {
        alignItems: 'center',
        flexDirection: "row"
    },
    titleText: {
        color: '#f1f1f1',
    },
    amountText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#f1f1f1',
    },
    vatText: {
        fontSize: 10,
        color: 'gray',
    },
    descriptionDetail: {
        fontSize: 14,
        lineHeight: 22
    },
    areaCard: {
        padding: 12,
        paddingTop: 6,
    },
    headerText: {
        fontSize: 20,
        color: Colors.primaryColorDark,
        opacity: 0.5,
        fontWeight: "700",
        letterSpacing: 2,
    }
});
