import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ListItem} from "../ListItem";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import {observer} from "mobx-react";
import {observable} from "mobx";
import ListPageSupport from "@common/components/PageSupport/ListPageSupport";
import TokenState from "../TokenState";
import Colors from "@constants/Colors";
import PageHeader from "@common/components/PageSupport/PageHeader";

interface Props {
    tokenState: TokenState;
}

@observer
export default class List extends PureComponent<Props> {

    @observable refreshing = false;

    componentDidMount() {
        this.props.tokenState.navigation.addListener(
            'didFocus',
            () => {
                this.props.tokenState.loadData(true);
            }
        );
    }

    onListItemPressed = item => {
        const {tokenState} = this.props
        tokenState.navigation.setParams({tabBarVisible: item == null})
        tokenState.selectItem(item);
    };

    renderItem = ({item, index}) => {
        const {tokenState} = this.props;
        return (
            <View key={item.name}
                  style={[styles.cardWrapper, {paddingTop: index === 0 ? 12 : 0}]}>
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

    onRefresh = async () => {
        const {tokenState} = this.props;
        this.refreshing = true;
        await tokenState.loadData();
        this.refreshing = false;
    }

    render() {
        const {tokenState} = this.props;
        const {list, processing} = tokenState;
        return (
            <View style={styles.container}>
                <PageHeader title="Browse Security Tokens"
                            navigation={tokenState.navigation}>
                    {/*<View style={styles.menuIconContainer}>*/}
                    {/*    <Icon name='search' type="feather" color={Colors.tabDefault} size={24}/>*/}
                    {/*</View>*/}
                </PageHeader>
                <FlatList
                    data={list}
                    keyExtractor={item => item.name}
                    refreshing={this.refreshing}
                    onRefresh={this.onRefresh}
                    renderItem={this.renderItem}
                />
                <ListPageSupport processing={processing && list.length === 0}
                                 list={list}
                                 errorMessage={tokenState.stoStore.errorMessage}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.back
    },
    cardWrapper: {
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
