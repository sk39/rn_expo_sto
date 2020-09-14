import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import {inject, observer} from "mobx-react";
import ListItem from "./ListItem";
import TokenState from "../../Token/TokenState";
import HomeChild from "../HomeChild";
import HomeChildTitle from "../HomeChildTitle";
import HomeListSupport from "../HomeListSupport";

@inject("rootStore")
@observer
export default class PickupTokens extends HomeChild {

    tokenState: TokenState;

    constructor(props) {
        super(props);
        this.tokenState = new TokenState(props.navigation, props.rootStore)
        this.tokenState.loadData(true)
    }

    componentDidMount() {
        this.tokenState.navigation.addListener(
            'didFocus',
            () => this.loadData()
        );
    }

    loadData() {
        this.tokenState.loadData(true)
    }

    onListItemPressed = item => {
        const {tokenState} = this
        tokenState.navigation.setParams({tabBarVisible: item == null})
        tokenState.selectItem(item);
    };

    onLinkPress = () => {
        this.props.navigation.navigate("Tokens")
    }

    renderItem = ({item, index}) => {
        const {tokenState} = this;
        const {list} = tokenState;
        const style = {
            paddingRight: index === (list.length - 1) ? 12 : 8,
            paddingLeft: index === 0 ? 12 : 0,
            paddingVertical: 12,
        }

        return (
            <View key={item.name}
                  style={style}>
                <AnimatedRow delay={(index + 1) * 200}>
                    <ListItem
                        item={item}
                        tokenState={tokenState}
                        onPress={this.onListItemPressed}
                    />
                </AnimatedRow>
            </View>
        );
    };

    render() {
        const {tokenState} = this;
        const {pickupList, processing} = tokenState;
        return (
            <View style={styles.container}>
                <HomeChildTitle title="Pickup Tokens"
                                linkTitle="More"
                                onLinkPress={this.onLinkPress}
                />
                <FlatList
                    data={pickupList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.name}
                    renderItem={this.renderItem}
                />
                <HomeListSupport processing={processing && pickupList.length === 0}
                                 list={pickupList}
                                 paddingTop={30}
                                 errorMessage={tokenState.stoStore.errorMessage}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: 180
    },
});
