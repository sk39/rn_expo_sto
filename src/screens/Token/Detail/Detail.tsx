import React, {PureComponent} from 'react';
import {Animated, BackHandler, Easing, StyleSheet, View} from 'react-native'
import {SharedElement} from '../animations';
import Toolbar from './Toolbar';
import {ListItem} from "../ListItem"
import Colors from "@constants/Colors";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import Invest from "../Invest";
import PageBottomBtn from "@common/components/PageSupport/PageBottomBtn";
import DetailContents from "./DetailContents";

@observer
export default class Detail extends PureComponent<any, any> {

    private sharedElementRef: any;
    private listItemRef: any;
    @observable scrollY = new Animated.Value(0);
    @observable isWaitSignIn = false;

    @computed
    get loggedIn() {
        const {tokenState} = this.props;
        return tokenState.loggedIn;
    }

    constructor(props) {
        super(props);
        this.state = {
            opacityOfDestinationItem: 0,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.startInvest = this.startInvest.bind(this);
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                if (this.loggedIn && this.isWaitSignIn && this.props.phase === 'phase-2') {
                    this.startInvest();
                }
                this.isWaitSignIn = false;
            }
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.phase === 'phase-2' && this.props.phase === 'phase-3') {
            this.sharedElementRef.moveToSource();
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        } else if (this.props.phase === 'phase-2') {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.onBackPress();
        return true;
    }

    onMoveToDestinationDidFinish = () => {
        this.setState({opacityOfDestinationItem: 1});
        this.props.onSharedElementMovedToDestination();
    };

    onMoveToSourceWillStart = () => {
        this.setState({opacityOfDestinationItem: 0});
    };

    startInvest() {
        if (!this.loggedIn) {
            this.isWaitSignIn = true;
            this.props.navigation.navigate("Login");
            return;
        }

        const {selectedItem} = this.props;
        this.props.navigation.navigate("InvestToken", {symbol: selectedItem.symbol})
    }


    render() {
        const {
            selectedItem,
            startPosition,
            phase,
            onBackPress,
            onSharedElementMovedToSource,
        } = this.props;
        const {opacityOfDestinationItem} = this.state;

        const {items = []} = selectedItem || {};

        if (!selectedItem) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Toolbar isHidden={phase === 'phase-3'}
                         item={selectedItem}
                         onBackPress={onBackPress}/>
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
                    <SharedElement
                        ref={node => (this.sharedElementRef = node)}
                        sourceId={selectedItem.name}
                        easing={Easing.in(Easing.back())}
                        onMoveToDestinationDidFinish={this.onMoveToDestinationDidFinish}
                        onMoveToSourceWillStart={this.onMoveToSourceWillStart}
                        onMoveToSourceDidFinish={onSharedElementMovedToSource}
                    >
                        <View
                            style={{
                                opacity: opacityOfDestinationItem,
                            }}
                        >
                            <ListItem
                                ref={node => (this.listItemRef = node)}
                                item={selectedItem}
                                animateOnDidMount={false}
                                detailMode={true}
                                phase={phase}
                                scrollY={this.scrollY}
                                isHidden={false}
                                isDetail={true}
                            />
                        </View>
                    </SharedElement>
                    <DetailContents phase={phase}
                                    selectedItem={selectedItem}/>
                </Animated.ScrollView>
                <PageBottomBtn
                    onPress={this.startInvest}
                    text={this.loggedIn ? "Invest" : "Sign In & Invest"}
                    loading={false}
                    hidden={phase !== 'phase-2'}
                    animation
                    animationDelay={500}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
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
        color: Colors.labelFont,
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
