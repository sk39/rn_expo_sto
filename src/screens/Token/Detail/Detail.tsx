import React, {PureComponent} from 'react';
import {Animated, BackHandler, Easing, StyleSheet, Text, View} from 'react-native'
import {SharedElement, TranslateYAndOpacity} from '../animations';
import Toolbar from './Toolbar';
import ShowInvestButton from './ShowInvestButton';
import {ListItem} from "../ListItem"
import Colors from "@constants/Colors";
import {observable} from "mobx";
import {observer} from "mobx-react";
import Invest from "../Invest";

@observer
export default class Detail extends PureComponent<any, any> {

    private sharedElementRef: any;
    private listItemRef: any;
    @observable scrollY = new Animated.Value(0);
    @observable isInvestMode = false;

    constructor(props) {
        super(props);

        this.state = {
            opacityOfDestinationItem: 0,

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.startInvest = this.startInvest.bind(this);
        this.endInvest = this.endInvest.bind(this);
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
        if (this.isInvestMode) {
            this.endInvest();
        } else {
            this.props.onBackPress();
        }
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
        this.isInvestMode = true;
    }

    endInvest() {
        this.isInvestMode = false;
    }

    renderItem = ({item}) => {
        const {phase} = this.props;
        return (
            <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={32}>
                <Text style={styles.descriptionDetail}>{item.descriptionDetail}</Text>
                <Text style={styles.descriptionDetail}>{item.descriptionDetail}</Text>
            </TranslateYAndOpacity>
        );
    };

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
                <Toolbar isHidden={phase === 'phase-3' || this.isInvestMode} onBackPress={onBackPress}/>
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
                                onPress={() => {
                                }}
                                animateOnDidMount={false}
                                detailMode={true}
                                phase={phase}
                                scrollY={this.scrollY}
                                isHidden={false}
                                isDetail={true}
                            />
                        </View>
                    </SharedElement>
                    <View style={{padding: 12}}>
                        {this.renderItem({item: selectedItem})}
                    </View>
                    <View style={{paddingBottom: 56}}/>
                </Animated.ScrollView>
                <ShowInvestButton isHidden={phase === 'phase-3'}
                                  isInvestMode={this.isInvestMode}
                                  onStart={this.startInvest}
                                  onClose={this.endInvest}

                >
                    <Invest
                        onClose={this.endInvest}
                        item={selectedItem}
                        isInvestMode={this.isInvestMode}/>
                </ShowInvestButton>
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
    }
});
