import React, {PureComponent, RefObject} from 'react';
import {StyleSheet, View} from 'react-native';
import ListItem from "./ListItem";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import {observer} from "mobx-react";
import {observable} from "mobx";
import ListPageSupport from "@common/components/PageSupport/ListPageSupport";
import TokenState from "../TokenState";
import Colors from "@constants/Colors";
import MyScrollView from "@common/components/PageSupport/MyScrollView";
import SimpleList from "@common/components/List/SimpleList";

interface Props {
    navigation: any;
    rootStore: any;
    showStatus: string;
}

@observer
export default class List extends PureComponent<Props> {

    @observable refreshing = false;
    tokenState: TokenState;
    scrollRef: RefObject<MyScrollView>;
    showStatus = false;

    constructor(props) {
        super(props);
        this.scrollRef = React.createRef();
        const filter = []
        if (props.showStatus && props.showStatus !== "all") {
            filter.push(props.showStatus)
        } else {
            this.showStatus = true;
        }

        this.tokenState = new TokenState(props.navigation, props.rootStore, filter)
    }

    resetScroll(animated = true) {
        this.scrollRef.current.resetScroll(animated);
    }

    onListItemPressed = item => {
        const {tokenState} = this
        tokenState.navigation.navigate("TokenDetail", {symbol: item.symbol})
        // tokenState.navigation.setParams({tabBarVisible: item == null})
        // tokenState.selectItem(item);
    };

    renderItem = ({item, index}) => {
        const {tokenState} = this;
        return (
            <View key={item.name}
                  style={[styles.cardWrapper, {paddingTop: index === 0 ? 12 : 0}]}>
                <AnimatedRow delay={(index + 1) * 200}>
                    <View style={styles.itemWrapper}>
                        <ListItem
                            item={item}
                            tokenState={tokenState}
                            showStatus={this.showStatus}
                            onPress={this.onListItemPressed}
                        />
                    </View>
                </AnimatedRow>
            </View>
        );
    };

    onRefresh = async () => {
        const {tokenState} = this;
        this.refreshing = true;
        await tokenState.loadData();
        this.refreshing = false;
    }

    render() {
        const {tokenState} = this;
        const {processing} = tokenState;
        const list = tokenState.filteredList
        return (
            <View style={styles.container}>
                <MyScrollView ref={this.scrollRef}
                              onRefresh={this.onRefresh}>
                    <SimpleList data={list}
                                renderItem={this.renderItem}/>
                </MyScrollView>
                <ListPageSupport
                    processing={processing}
                    list={list}
                    errorMessage={tokenState.stoStore.errorMessage}
                    onRefresh={this.onRefresh}
                />
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
    itemWrapper: {
        borderWidth: 1,
        borderColor: Colors.listBorder
    }
});
