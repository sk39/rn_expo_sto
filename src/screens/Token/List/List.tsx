import React, {PureComponent} from 'react';
import {Easing, FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {SharedElement} from '../animations';
import Toolbar from './Toolbar';
import {ListItem} from "../ListItem";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import {observer} from "mobx-react";
import {observable} from "mobx";
import BlockLoading from "@common/components/BlockLoading";

@observer
export default class List extends PureComponent<any, any> {

    sharedElementRefs: any;

    @observable refreshing = false;

    constructor(props) {
        super(props);

        this.onRefresh = this.onRefresh.bind(this);
        this.state = {opacityOfSelectedItem: 1, selectedItem: null};
        this.sharedElementRefs = {};
    }

    componentDidMount() {
        this.props.tokenState.navigation.addListener(
            'didFocus',
            () => {
                this.props.tokenState.loadData(true);
            }
        );
    }

    onListItemPressed = item => {
        const {onItemPress} = this.props;
        this.setState({selectedItem: item});
        onItemPress(item);
        this.sharedElementRefs[item.name].moveToDestination();
    };
    onMoveToDestinationWillStart = () => {
        this.setState({opacityOfSelectedItem: 0});
    };
    onMoveToSourceDidFinish = () => {
        this.setState({opacityOfSelectedItem: 1});
    };
    getSharedNode = props => {
        const {item} = props;

        return (
            <View style={{backgroundColor: 'transparent'}}>
                <ListItem item={item} animateOnDidMount={false} isHidden={false}/>
            </View>
        );
    };
    renderItem = ({item, index}) => {
        const {opacityOfSelectedItem} = this.state;
        const {selectedItem} = this.props;
        const isHidden = selectedItem && selectedItem.name !== item.name;
        const id = item.name;

        return (
            <SharedElement
                // @ts-ignore
                easing={Easing.in(Easing.back())}
                ref={node => (this.sharedElementRefs[id] = node)}
                id={id}
                onMoveToDestinationWillStart={this.onMoveToDestinationWillStart}
                onMoveToSourceDidFinish={this.onMoveToSourceDidFinish}
                getNode={this.getSharedNode}
                item={item}
            >
                <View
                    style={{
                        opacity: opacityOfSelectedItem,
                        backgroundColor: 'transparent',
                    }}
                >
                    <AnimatedRow delay={(index + 1) * 200}>
                        <ListItem
                            item={item}
                            onPress={this.onListItemPressed}
                            isHidden={isHidden}
                        />
                    </AnimatedRow>
                </View>
            </SharedElement>
        );
    };

    async onRefresh() {
        const {tokenState} = this.props;
        this.refreshing = true;
        await tokenState.loadData();
        this.refreshing = false;
    }

    render() {
        const {opacityOfSelectedItem} = this.state;
        const {phase, tokenState} = this.props;
        const {list, processing} = tokenState;
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" translucent backgroundColor={"rgba(0,0,0,0)"}/>
                <Toolbar
                    isHidden={phase !== 'phase-0'}
                />
                <BlockLoading loading={processing}/>
                <FlatList
                    data={list}
                    extraData={{phase, opacityOfSelectedItem}}
                    keyExtractor={item => item.name}
                    refreshing={this.refreshing}
                    onRefresh={this.onRefresh}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});
