import React, {PureComponent} from 'react';
import {Easing, ScrollView, StyleSheet, Text, View} from 'react-native'
import {SharedElement, TranslateYAndOpacity} from '../animations/index';
import Toolbar from './Toolbar';
import BottomBar from './BottomBar';
import {ListItem} from "../ListItem"
import Colors from "../../../../constants/Colors";

class Detail extends PureComponent<any, any> {

    private sharedElementRef: any;
    private listItemRef: any;

    constructor(props) {
        super(props);

        this.state = {
            opacityOfDestinationItem: 0,

        };

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.phase === 'phase-2' && this.props.phase === 'phase-3') {
            this.sharedElementRef.moveToSource();
        }
    }

    onMoveToDestinationDidFinish = () => {
        this.setState({opacityOfDestinationItem: 1});
        this.props.onSharedElementMovedToDestination();
    };
    onMoveToSourceWillStart = () => {
        this.setState({opacityOfDestinationItem: 0});
    };
    renderItem = ({item}) => {
        const {phase} = this.props;

        let delay = 1;
        return (
            <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={32 * delay}>
                <Text style={styles.descriptionDetail}>{item.descriptionDetail}</Text>
                <Text style={styles.descriptionDetail}>{item.descriptionDetail}</Text>
            </TranslateYAndOpacity>
        );
    };

    onScroll(e: any) {
        const scrollY = e.nativeEvent.contentOffset.y;
        if (this.listItemRef)
            this.listItemRef.onParentScroll(scrollY)
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
                <Toolbar isHidden={phase === 'phase-3'} onBackPress={onBackPress}/>
                <ScrollView onScroll={this.onScroll}>
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
                                isHidden={false}
                                isDetail={true}
                            />
                        </View>
                    </SharedElement>
                    <View style={{padding: 12}}>
                        {this.renderItem({item: selectedItem})}
                    </View>
                    <View style={{paddingBottom: 56}}/>
                </ScrollView>
                <BottomBar isHidden={phase === 'phase-3'}/>
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

export default Detail;
